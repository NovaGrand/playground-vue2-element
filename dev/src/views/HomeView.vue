<template>
  <div class="home" fill jc ac>
      <files wd-md ht-md ba dashed ac-10 bv image single @drop="drop" @select="select">

      </files>
<!--      <div wd-lg ht-lg>-->
<!--          <input ref="input" type="file" :value="val" multiple="true" @change="change">-->
<!--      </div>-->
  </div>
</template>

<script>
import files from "./files";
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
        success(response, file, fileList){
            console.log(response)
            console.log(file)
        }
    }
}
</script>
