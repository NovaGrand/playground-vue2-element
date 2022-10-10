<template>
    <div class="mew-files" @dragover.prevent @drop="drop">
        <slot>点击或拽入文件</slot>
        <input ref="input" type="file" :multiple="!single" @change="change">
    </div>
</template>

<script>
function preventDefault(e){
    e.preventDefault()
}
export default {
    name: "mew-files",
    mounted(){
        // 一般一个页面内只有一个上传组件，因此简单处理时间监听即可
        window.addEventListener("drop", preventDefault,false)
    },
    beforeDestroy(){
        window.removeEventListener("drop", preventDefault,false)
    },
    methods:{
        drop(e){
            this.$emit('drop', this.handle(e.dataTransfer.files))
        },
        change(e){
            this.$emit('select', this.handle(this.$refs.input.files))
        },
        handle(files){
            let arr = []
            let tps = [...this.types]
            console.log(tps)
            if(tps.length === 0)
                arr = files
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
            return this.single ? arr[0] : arr
        }
    },
    computed:{
        types(){
            return ['image','video','audio','text','application','rar'].filter(prop => this[prop])
        }
    },
    props:{
        image:{
            type: Boolean,
            default: false
        },
        video:{
            type: Boolean,
            default: false
        },
        audio:{
            type: Boolean,
            default: false
        },
        text:{
            type: Boolean,
            default: false
        },
        application:{
            type: Boolean,
            default: false
        },
        rar:{
            type: Boolean,
            default: false
        },
        single:{
            type: Boolean,
            default: false
        },
    },
}
</script>

<style scoped lang="scss">
div.mew-files{
    position: relative;
    display: flex;align-items: center;justify-content: center;
    input{
        position: absolute;left: 0;top: 0;display: block;width:100%;height: 100%;
        opacity: 0;z-index: 9999;
    }
}
</style>