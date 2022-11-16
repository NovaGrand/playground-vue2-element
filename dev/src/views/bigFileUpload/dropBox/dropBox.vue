<template>
    <div class="mew-dropBox" @dragover.prevent @drop="drop">
        <slot>
            <svg viewBox="0 0 24 24" height="24" width="24">
                <path d="M0 0h24v24H0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
            </svg>
            <div class="text">
                将文件拖放于此<i v-if="select">，或 <a @click="$refs.input.click()">点击上传</a></i>
            </div>
        </slot>
        <form ref="form">
            <input v-if="select" ref="input" type="file" :multiple="!single" :accept="accept" @change="change">
        </form>
    </div>
</template>

<script>
function preventDefault(e){
    e.preventDefault()
}
export default {
    name: "mew-dropBox",
    mounted(){
        // 一般一个页面内只有一个上传组件，因此简单处理事件监听即可
        window.addEventListener("drop", preventDefault,false)
    },
    beforeDestroy(){
        window.removeEventListener("drop", preventDefault,false)
    },
    methods:{
        drop(e){
            let files = this.model
            this.concat(files, this.handle(e.dataTransfer.files))
            this.$emit('model', files)
            this.$emit('drop', files)
            this.$emit('change', files)
        },
        change(){
            let files = this.model
            this.concat(files, this.handle(this.$refs.input.files))
            this.$refs.form.reset()
            this.$emit('model', files)
            this.$emit('select', files)
            this.$emit('change', files)
        },
        handle(files){
            let arr = []
            let tps = [...this.types]
            // 将JS集合转为更易于使用的数组
            if(tps.length === 0)
                for(let file of files)
                    arr.push(file)
            // 根据文件类型过滤
            else if(tps.includes('rar')){
                tps.pop()
                for(let i=0;i<files.length;i++)
                    if(files[i].name.includes('rar','zip','7z'))
                        arr.push(files[i])
            }
            tps.forEach(type => {
                for(let i=0;i<files.length;i++)
                    if(files[i].type.includes(type))
                        arr.push(files[i])
            })
            if(arr.length < files.length) this.$emit('error',files)
            arr = this.single && arr.length > 0 ? [arr[0]] : arr
            arr.forEach( item => item.progress = 0)
            return arr
        },
        concat(arr1,arr2){
            // 去重，只将原数组中不存在的文件添加到原数组
            arr2.forEach(file => {
                let flag = false
                for(let i=0;i<arr1.length;i++)
                    if(arr1[i].name === file.name){
                        flag = true
                        break
                    }
                if(!flag) arr1.push(file)
            })
        },
    },
    computed:{
        types(){
            return ['image','video','audio','text','application','rar'].filter(prop => this[prop])
        }
    },
    model:{
        prop :'model',
        event:'model',
    },
    props:{
        model:{
            type:Array, default(){
                return []
            }
        },
        // 默认支持 'image','video','audio','text','application','rar'
        // 一旦开启其中一种格式，其他格式将不受支持
        // 但可以开启多个以支持多个，例如 video rar 表示同时支持 video和rar上传，但不支持其他格式
        // 这是有意设计的，为了更方便使用
        image:{ // 是否只允许获取常见的图片格式文件
            type: Boolean,
            default: false
        },
        video:{ // 是否只允许获取常见的视频格式文件
            type: Boolean,
            default: false
        },
        audio:{ // 是否只允许获取常见的音频格式文件
            type: Boolean,
            default: false
        },
        text:{ // 是否只允许获取常见的文本格式文件
            type: Boolean,
            default: false
        },
        application:{ // 是否只允许获取常见的可执行文件
            type: Boolean,
            default: false
        },
        rar:{ // 是否只允许获取 .rar 文件
            type: Boolean,
            default: false
        },
        single:{ // 只允获取许单个文件
            type: Boolean,
            default: false
        },
        select:{ // 允许点击组件打开文件获取弹窗
            type: Boolean,
            default: true
        },
        // 调用 input 的原生接口，更精确地控制准许上传的文件类型，例如 .xls .cvs .pdf 等
        // 该接口直接控制选择时可显示的文件，比 handle 方法更高级更精确
        accept:{
            type: String,
            default: ''
        }
    },
}
</script>

<style scoped lang="scss">
div.mew-dropBox{
    position: relative;
    display: flex;align-items: center;justify-content: center;
    flex-direction: column;
    svg{
        width: 50%;
        height: 50%;fill:rgba(0,100,255,.3);
    }
    div.text{
        letter-spacing: .5px;font-size: 14px;
        color: rgba(0,0,0,.5);
        font-weight: bold;
        i{
            font-style: normal;
        }
        a{
            position: relative;z-index: 9999;
            cursor: pointer;
            color: #409EFF;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    input{
        position: absolute;left: 0;top: 0;display: block;width:100%;height: 100%;
        opacity: 0;z-index: 9998;
    }
}
</style>