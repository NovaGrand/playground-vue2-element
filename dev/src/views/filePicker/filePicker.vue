<template>
    <div class="mew-filePicker" @dragover.prevent="" @drop="drop">
        <slot>点击或拽入文件</slot>
        <input ref="input" type="file" multiple="true" @change="change">
    </div>
</template>

<script>
function preventDefault(e){
    e.preventDefault()
}
export default {
    name: "mew-filePicker",
    mounted(){
        // 一般一个页面内只有一个上传组件，因此不必过度处理
        window.addEventListener("drop", preventDefault,false)
    },
    beforeDestroy(){
        window.removeEventListener("drop", preventDefault,false)
    },
    methods:{
        // 屏蔽文件的默认打开行为
        preventDefault(e){
            e.preventDefault()
        },
        drop(e){
            this.$emit('drop', e.dataTransfer.files)
        },
        change(e){
            this.$emit('select', this.$refs.input.files)
        },
    }
}
</script>

<style scoped lang="scss">
div.mew-filePicker{
    display: flex;align-items: center;justify-content: center;
    position: relative;
    input{
        opacity: 0;
        position: absolute;left: 0;top: 0;display: block;width:100%;height: 100%;

    }
}
</style>