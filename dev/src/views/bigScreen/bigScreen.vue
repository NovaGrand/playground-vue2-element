<template>
    <div class="bigScreen" fill>
        <header black bg></header>
        <aside foo></aside>
        <main class="container">
            <div ref="scaleBox" class="scaleBox" foo>

            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "BigScreen",
    mounted() {
        let scaleBox = this.$refs.scaleBox
        let container = scaleBox.parentElement

        this.ob = new ResizeObserver(entries => {
            let w = container.offsetWidth
            let h = container.offsetHeight
            console.log({ w, h })
        })
        this.ob.observe(container)
        // console.log(scaleBox.parentElement.offsetWidth)
    },
    beforeUnmount(){
        this.ob.disconnect()
    },
    data(){
        return {

        }
    }
}
</script>

<style scoped lang="scss">
div.scaleBox{
    //display: none;
    width: 2560px;
    height: 1080px;
    background-size: cover;
    background: url("./u2716.png");
}
div.bigScreen{
    position: relative;
    header{
        height: 70px;
    }
    aside{
        height: calc(100vh - 70px);
        width: 250px;
    }
    main.container{
        position: absolute;
        left: 250px;top: 70px;
        width: calc(100vw - 250px);
        height: calc(100vh - 70px);
        background-color: #030E25;
        overflow: hidden;
    }
}
</style>