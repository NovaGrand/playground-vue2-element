<template>
    <div v-if="inited" :style="style"><slot/></div>
</template>

<script>
export default {
    name: "ratioBox",
    mounted() {
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

        let container = this.$el.parentElement
        container.style.display = 'flex'
        container.style.alignItems = 'center'
        container.style.justifyContent = 'center'

        this.ob = new ResizeObserver(throttle(entries => {
            let w = container.offsetWidth
            let h = container.offsetHeight
            this.scale({ w, h })
        },100))
        this.ob.observe(container)
    },
    beforeUnmount(){
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
                // 如果容器比大屏宽，则按高度缩放
                this.index = h / this.h
            else
                // 如果容器比大屏高，则按宽度缩放
                this.index = w / this.w
            if(!this.inited) this.inited = true
        },
    },
    computed:{
        w(){
            return parseInt(this.width)
        },
        h(){
            return parseInt(this.height)
        },
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
