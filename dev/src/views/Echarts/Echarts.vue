<template>
    <div class="Echarts">
        <echart class="testChart" sample="radar" @click="aaa"></echart>
<!--        <echart class="testChart" sample="line"></echart>-->
<!--        <echart class="testChart" sample="polar"></echart>-->
<!--        <echart class="testChart" sample="radar"></echart>-->
<!--        <echart class="testChart" sample="gauge"></echart>-->
<!--        <echart class="testChart" sample="clock"></echart>-->
    </div>
</template>

<script>
import echart from '@/components/echart'
export default {
    name: "Echarts",
    components:{ echart },
    mounted() {

    },
    data(){
        return {
            option:  {
                tooltip: {
                    trigger: 'item'
                },
                legend: { // 图例选项，至少得是一个空对象，否则不显示图例
                    bottom: 0, // 还可以使用 right left 等，距离对应边界的距离
                },
                series: [
                    {
                        name: 'AAABBB',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 335, name: '张三' },
                            { value: 310, name: '李四' },
                            { value: 274, name: '王五' },
                            { value: 235, name: '赵六' },
                            { value: 400, name: '孙七' }
                        ].sort(function (a, b) {
                            return a.value - b.value;
                        }),
                        roseType: 'radius',
                        label: {
                            fontSize:20,
                            color: 'rgba(0, 0, 0, 0.6)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.1)',
                                width: 2
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20,
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            }
        }
    },
    methods:{
        aaa(param){
            console.log(param)
        }
    }
}
</script>

<style scoped lang="scss">
div.Echarts{
    display: flex;flex-wrap:wrap;
    height: 100%;
    overflow-y: scroll;
    .testChart{
        width: 600px;
        height: 500px;
        border: .5px solid rgba(0,0,0,.2);
    }
}
</style>