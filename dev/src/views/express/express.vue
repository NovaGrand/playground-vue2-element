<template>
    <div class="express">
        <el-input v-model="cookie"/>
        <div>
            <el-button @click="addCookie">添加Cookie</el-button>
            <el-button @click="submit">提交测试</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "express",
    data(){
        return {
            cookie:''
        }
    },
    methods:{
        addCookie(){
            document.cookie = "AAA=" + this.cookie
        },
        submit(){
            this.$http.post('http://localhost:3001/user',{test:'AAAA'}).then(result => {
                console.log(result.data)
            })

        }
    }
}
</script>

<style scoped lang="scss">

</style>