<template>
    <div class="layout">
        <header>浩海</header>
        <aside>
            <router-link my-sm to="/haohai/controlBoard">应急指挥一张图</router-link>
            <router-link my-sm to="/haohai/oneKeyOperation">一键调度</router-link>
            <router-link my-sm to="/haohai/taskManagement">任务管理</router-link>
            <router-link my-sm to="/haohai/resourceManagement">资源调度</router-link>
            <router-link my-sm to="/haohai/reportManagement">情况报告</router-link>
        </aside>
        <main class="container">
            <router-view/>
        </main>
    </div>
</template>

<script>
export default {
    name: "layout",
}
</script>

<style scoped lang="scss">
div.layout{
    position: relative;
    height: 100vh;width: 100vw;
    header{
        height: 70px;
        background-color: rgba(0,0,50,.8);
        color: white;
    }
    aside{
        height: calc(100vh - 70px);
        width: 300px;
        border-right: .5px solid rgba(0,0,0,.2);
        box-sizing: border-box;
        padding: 20px;
        a{
            display: block;
        }
    }
    main.container{
        position: absolute;
        left: 300px;top: 70px;
        width: calc(100vw - 300px);
        height: calc(100vh - 70px);
        //background-color: #030E25;
        background-color: #F8F8FA;
        overflow: hidden;
        box-sizing: border-box;
        padding: 15px;
    }
}
</style>
