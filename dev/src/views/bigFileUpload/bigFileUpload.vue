<template>
    <div class="bigFileUpload">
        <dropBox class="dropBox" v-model="files" accept="video/*"></dropBox>
        <ul class="fileList">
            <li v-for="(file, index) in files" :key="file.name + index">
                <i :title="file.name">{{ file.name }}</i>
                <i>{{ format(file.size) }}</i>
                <i>
                    <progress :value="file.progress" max="1"></progress>
                </i>
                <i>{{ file.state ? '已上传' : '未上传' }}</i>
                <i class="remove" @click="remove(index)">×</i>
            </li>
        </ul>
        <div class="btnBox">
            <el-button @click="progress">进度测试</el-button>
            <el-button @click="files = []">清空文件</el-button>
            <el-button type="primary" @click="submit">上传文件</el-button>
        </div>
        <div je>
            <download blue bg py-sm px-md bv
                      src="http://localhost:3001/download"
                      name="测试" ext="mp4"
            >
                文件下载
            </download>
        </div>
    </div>
</template>

<script>
import dropBox from "./dropBox";
import download from "./download";
import './Blob.chunk'

export default {
    name: 'bigFileUpload',
    data(){
        return {
            // 传入的文件即是原始的 File 类型
            files:[
                // {
                //     name:'111.txt',
                //     size:1000, // File 类原生属性，只有 getter，无法修改
                //     type:'',  //  File 类原生属性，例如image/png 等
                //     state:'', // 自定义属性
                //     progress:0.5, // 自定义属性
                // },
            ],
        }
    },
    components: {
        dropBox, download
    },
    mounted() {

    },
    methods:{
        progress(){
            let n = 0
            let t = setInterval(()=>{
                if(n<1){
                    n += 0.1
                    this.files[0].progress = n
                    this.$forceUpdate()
                    console.log(n)
                }
                else clearInterval(t)
            },1000)
        },
        submit(){
            this.upload(this.files).then(res => {
                console.log(res)
            })
        },
        async upload(files){
            let restrict = 1024*1024*10 // 设置文件大小，10M 以上就切片
            let requests = files.map( (file, index) => {
                let api = `/upload?name=${file.name}&size=${file.size}&type=${file.type}` // 文件信息
                let data = { 'blobs[]': file.size > restrict ? file.chunk(restrict) : file } // 如果使用 AXIOS，则不能使用 new FormData()
                let headers = {'content-type': 'multipart/form-data'} // 如果是应用 AXIOS，则不能使用 new Headers()
                return this.$http.post(api, data, {
                    headers,
                    // Chrome 默认超时时间只有5分钟，设置再多也没用；超长时间上传需要使用断点续传
                    timeout: 5*60*1000,
                    // AXIOS 自带的上传进度功能
                    onUploadProgress: progressEvent => {
                        file.progress = ( progressEvent.loaded / progressEvent.total ).toFixed(2)
                        this.$forceUpdate() // 数组替换后，属性变化不会更新到视图，需要使用 $forceUpdate 更新视图
                    }
                })
            })
            try{
                return await Promise.all(requests) // 返回值是所有结果组成的数组
            }catch(err){ console.log('上传失败') }
        },
        drop(files){

        },
        change(files){
            this.files = files
            // let requestList = []
            // for(let i=0; i<files.length; i++)
            //     requestList.push(files[i].chunk(this.chunkSize))
            // console.log(requestList)
        },
        select(files){

        },
        error(files){
            console.log('------error------')
            console.log(files)
        },
        success(response, file, fileList){
            console.log(response)
            console.log(file)
        },
        remove(index){
            this.files.splice(index, 1)
        },
        format(val){
            if(val < 1024)
                return val + ' byte'
            if(val >=1024 && val < 1024*1024 )
                return (val / 1024).toFixed(2) + ' kb'
            else
                return (val / (1024*1024)).toFixed(2) + ' mb'
        },

    }
}
</script>

<style lang="scss" scoped>
div.bigFileUpload{
    width: 400px;
    margin: 100px auto 0 auto;
    div.dropBox{
        width: 400px;height: 250px;
        border: 2px dashed rgba(50,150,255,.3);
        margin: 100px auto 50px auto;
        border-radius: 5px;
    }
    ul.fileList{
        position: relative;
        width: 400px;min-height: 100px;margin: 0 auto;
        border: .5px solid rgba(0,0,0,.2);
        border-radius: 1px;
        &::before{
            position: absolute;content: '已选择的文件列表';display: block;
            top: -24px;left: 0;font-size: 15px;letter-spacing: 1px;
            height: 20px;line-height: 20px;
            transform: scale(.8);transform-origin: 0 100%;
        }
        li{
            padding: 2px 0;
            list-style: none;
            display: flex;align-items: center;
            background-color: rgba(0,0,0,.01);
            &:hover{
                background-color: rgba(0,0,0,.02);
            }
            i{
                font-size: 13px;
                font-style: normal;
                height: 20px;line-height: 21px;
                &:first-child{
                    border-right: .5px solid rgba(0,0,0,.08);
                    padding-left: 10px;
                    width: 110px;
                    overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                }
                &:nth-child(2){
                    width: 70px;
                    padding-left: 10px;
                }
                &:nth-child(3){
                    // 进度条
                    display: flex;align-items: center;justify-content: center;
                    progress{
                        &[value="0"],[value="1"]{
                            opacity: .5;
                        }
                        &::-webkit-progress-value{
                            background-color: deepskyblue;
                        }
                        &::-webkit-progress-bar{
                            background-color: rgba(0,0,0,.08);
                        }
                        width: 74%;height: 4px;border-radius: 10px;overflow: hidden;
                    }
                    width: calc(100% - 250px);
                }
                &:nth-child(4){
                    width: 50px;
                }
                &:last-child{
                    user-select: none;
                    opacity: .3;
                    cursor: pointer;
                    font-size: 18px;
                    width: 20px;
                    text-align: center;
                    &:hover{
                        opacity: .7;
                    }
                }
            }
        }
    }
    div.btnBox{
        display: flex;justify-content: end;
        padding: 20px 0;
    }
}

</style>
