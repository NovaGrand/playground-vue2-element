<template>
    <div class="mew-echart"></div>
</template>

<script>
import options from "./options"
export default {
    name: "mew-echart",
    created() {
        this.$root.$on('mew-echart-loaded',()=>{
            if(!window.echarts) return // 如果 echarts 脚本未加载完前，其他组件也可能触发 init，需要在此拦截
            this.init() // 创建表实例
            this.samp() // 使用演示模板，如果传入了 option，则使用真实数据
        })
    },
    mounted() {
        if(!document.getElementById('mew-echart'))  // 引入资源
            this.load().then(()=>{
                this.$root.$emit('mew-echart-loaded') // 资源加载完成后触发 init() 和 samp()
            })
        else this.$root.$emit('mew-echart-loaded')  // 如果已经引入资源了，直接触发 init() 和 samp()
    },
    props:{
        sample:{
            type: String | Object | Boolean,
            default: false
        },
        option:{
            type: Object,
            default(){
                return null
            }
        }
    },
    data(){
        return {
            chart: null,
        }
    },
    watch:{
        option(cfg){
            this.chart.setOption(cfg)
        }
    },
    methods:{
        init(){
            // 先初始化，再处理配置
            this.chart = echarts.init(this.$el)
            this.chart.on('click',param => {
                this.$emit('click', param)
            })
            // 实例生成后应该关闭根组件的监听
            this.$root.$off('mew-echart-loaded')
        },
        load(){
            let script = document.createElement("script")
            script.type = "text/javascript"
            script.id = "mew-echart"
            script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js'
            document.body.appendChild(script)
            return new Promise(resovle => {
                script.onload = () => {
                    resovle()
                }
            })
        },
        samp(){
            // 如果既没传入配置，又没使用模板，则不渲染任何东西
            if(!this.option && !this.sample) return
            this.chart.setOption(this.option ? this.option : typeof this.sample === 'object' ? this.sample : options[this.sample])
        }
    }
}
</script>

<style scoped lang="scss">
div.mew-echart{
    min-width: 100px;
    min-height: 100px;
}
</style>