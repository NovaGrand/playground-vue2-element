<template>
    <div v-if="inited" :style="style"><slot/></div>
</template>

<script>
function throttle(fn, delay) {
    let flag = true
    return function (...args) {
        if (!flag)
            return
        flag = false
        let t = setTimeout(() => {
            fn(...args)
            flag = true
            clearTimeout(t)
        }, delay)
    }
}
export default {
    name: "ratioBox",
    mounted() {
        let p = this.$el.parentElement
        p.style='display:flex!important;align-items:center!important;justify-content:center!important'
        this.ob = new ResizeObserver(throttle(entries => {
            let w = p.offsetWidth
            let h = p.offsetHeight
            this.scale({ w, h })
        },100))
        this.ob.observe(p)
    },
    beforeDestroy(){
        this.ob.disconnect()
    },
    data(){
        return {
            index:1,
            inited: false
        }
    },
    methods:{
        scale({ w, h }){
            if(w / h > this.w / this.h)
                this.index = h / this.h  // 如果容器比大屏宽，则按高度缩放
            else
                this.index = w / this.w // 如果容器比大屏高，则按宽度缩放
            if(!this.inited) this.inited = true
        },
    },
    computed:{
        w(){ return parseInt(this.width) },
        h(){ return parseInt(this.height) },
        style(){
            return`width:${this.w}px;height:${this.h}px;transform:scale(${this.index});background-size: cover;flex-shrink: 0;`
        }
    },
    props:{
        width:{
            type: String | Number,
            default: '2560'
        },
        height:{
            type: String | Number,
            default: '1080'
        },
    },
}
</script>
