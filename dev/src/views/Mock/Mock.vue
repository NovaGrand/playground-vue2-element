<template>
    <div class="mock">
        <div class="title">API</div>
        <el-input v-model="api"></el-input>
        <div class="title">Body</div>
        <el-input v-model="body"></el-input>
        <div class="btns">
            <el-button class="btn" type="primary" @click="get">GET</el-button>
            <el-button class="btn" type="primary" @click="post">POST</el-button>
            <el-button class="btn" type="primary" @click="put">PUT</el-button>
            <el-button class="btn" type="primary" @click="del">DELETE</el-button>
        </div>
        <div class="result" contenteditable="true">
            {{ res }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Mock",
    data(){
        return {
            api:'http://localhost:3004/users/3',
            res:'',
            body:`{"name":"赵六", "age": 25}`
        }
    },
    methods:{
        get(){
            this.$http.get(this.api).then(res=>{
                this.res = res.data
            })
        },
        post(){
            this.$http.post(this.api, this.body).then(res=>{
                this.res = res.data
            })
        },
        put(){
            this.$http.put(this.api, this.body).then(res=>{
                this.res = res.data
            })
        },
        del(){
            this.$http.delete(this.api).then(res=>{
                this.res = res.data
            })
        }
    }
}
</script>

<style scoped lang="scss">
div.mock{
    padding: 20px;
    .title{
        margin: 10px 0;
    }
    .btns{
        margin: 10px 0;
        .btn{

        }
    }
    .result{
        border: .5px solid rgba(0,0,0,.4);
        min-height: 300px;
    }
}

</style>