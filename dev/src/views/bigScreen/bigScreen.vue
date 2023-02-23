<template>
    <div class="bigScreen">
        <div class="fullscreen" @click="fullScreened = !fullScreened">
            {{ fullScreened ? '返回' : '全屏' }}
        </div>
        <ratioBox ref="ratioBox" class="reference">
        </ratioBox>
    </div>
</template>

<script>
import ratioBox from './ratioBox'
export default {
    name: "BigScreen",
    components:{
        ratioBox
    },
    mounted() {

    },
    data(){
        return {
            fullScreened: false
        }
    },
    watch:{
        fullScreened(val){
            if (val && !document.fullscreenElement)
                this.$el.requestFullscreen().catch(err => {
                    console.log(err)
                })
            else{
                document.exitFullscreen()
            }
        }
    },
    methods:{
        fullscreen(p){
            if (!document.fullscreenElement)
                this.$el.requestFullscreen().catch(err => {
                    console.log(err)
                })
        }
    },

    props:{

    }
}
</script>

<style scoped lang="scss">
div.bigScreen {
    width: 100%;
    height: 100%;
    background-color: black;
    .reference{
        color: white;
        font-size: 30px;
        background: url("./2560.jpg");
    }
    .fullscreen{
        position: absolute;z-index: 10;
        right: 0;top: 0;
        width: 50px;
        height: 50px;line-height: 50px;
        text-align: center;
        border: 2px solid red;
        color: red;
        cursor: pointer;
    }
}


</style>