<template>
  <div class="home" fill jc ac>
      <files wd-md ht-md ba dashed ac-10 bv select
             @drop="drop"
      >
            <div fill ac jc column>
                <div>1.文件切块 OK</div>
                <div>2.将块封装成 requestList</div>
                <div>3.使用 promise.all 提交或轮询提交</div>
            </div>
      </files>
  </div>
</template>

<script>
import files from "./files";
function sliceFile(file, chunkSize) {
    let amount = file.size % chunkSize === 0 ? file.size / chunkSize : Math.ceil(file.size / chunkSize)
    let byteStart = 0;
    let arr = [];

    for (let i = 0;i < amount;i++) {
        let byteEnd = byteStart + chunkSize
        arr.push(file.slice(byteStart, byteEnd));
        byteStart += (byteEnd - byteStart);
    }

    return arr;
}

export default {
    name: 'HomeView',
    data(){
        return {
            val:''
        }
    },
    components: {
        files
    },
    mounted() {

    },
    methods:{
        drop(files){
            console.log('------drop------')
            let chunks = sliceFile(files[0],1024*1024*5)
            let data = new FormData()

            console.log(chunks)
        },
        chunk(file, size=1000){

        },
        change(files){
            console.log('------change------')
            console.log(files)
        },
        // 生成文件切片
        createFileChunk(file, size = SIZE) {
            const fileChunkList = []
            let cur = 0
            while (cur < file.size) {
                fileChunkList.push({
                    file: file.slice(cur, cur + size),
                })
                cur += size
            }
            return fileChunkList
        },
        select(files){
            console.log('------select------')
            console.log(files)
            // const reader = new FileReader()
            // reader.readAsArrayBuffer(this.$refs.input.files[0],'utf8')
            // reader.onload = ()=>{
            //     console.log(reader.result)
            //     this.$http.post('/test',{ file:reader.result }).then(result =>{
            //         console.log(reader.result)
            //         console.log(result.data)
            //     })
            // }
        },
        error(files){
            console.log('------error------')
            console.log(files)
        },
        success(response, file, fileList){
            console.log(response)
            console.log(file)
        }
    }
}
</script>
