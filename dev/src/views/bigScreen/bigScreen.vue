<template>
    <div class="bigScreen">
        <ratioBox class="reference">
            111
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

        }
    },
    methods:{
        scale(p){

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
}


</style>