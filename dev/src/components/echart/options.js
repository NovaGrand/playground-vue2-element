export default {
    // 柱状图的常用设置：
    // X 轴字体大小：xAxis.data.item.textStyle.fontSize
    // Y 轴字体大小：yAxis.axisLabel.fontSize
    // 数据字体大小：series.item.label.fontSize
    // 数据字体样式：series.item.label 中的各项设置
    bar: {
        legend: { // 图例选项，至少得是一个空对象，否则不显示图例
            bottom: 0, // 还可以使用 right left 等，距离对应边界的距离
        },
        toolbox: { // 工具箱，用于切换 柱状图 线图等
            show: true,
            feature: {
                magicType: { type: ['line', 'bar', 'stack'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: [
                { value:'2019', textStyle:{ fontSize:12 }},
                { value:'2020', textStyle:{ fontSize:12 }},
                { value:'2021', textStyle:{ fontSize:12 }},
                { value:'2022', textStyle:{ fontSize:12 }},
            ],
        },
        yAxis: {
            type: 'value',
            axisLabel:{
                fontSize:12
            }
        },
        series: [
            { name: '事故', type: 'bar',  data:[5,  12,  36,  10], label:{ show:true, position: 'top', fontSize:12 } },
            { name: '处罚', type: 'bar' , data:[4, 10, 38, 15],
                label:{
                    show:true, position:'insideBottom', rotate:90, offset:[25,7],formatter:param => param.seriesName + '  ' + param.data,
                    fontSize:12
                }
            },
            { name: '投诉', type: 'bar' , data:[2, 15, 15, 12], label:{ show:true, position: 'top'}},
            { name: '举报', type: 'bar' , data:[2,16,22,5], label:{ show:true, position: 'top'}},
            { name: '平均', type: 'line', data:[2.6,10.6,22.2,8.4]},
        ],
    },
    line: {
        tooltip: {
            trigger: 'axis'
        },
        legend: {},
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: 'Highest',
                type: 'line',
                data: [10, 11, 13, 11, 12, 12, 9],
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                }
            },
            {
                name: 'Lowest',
                type: 'line',
                data: [1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'Avg' },
                        [
                            {
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            },
                            {
                                symbol: 'circle',
                                label: {
                                    position: 'start',
                                    formatter: 'Max'
                                },
                                type: 'max',
                                name: '最高点'
                            }
                        ]
                    ]
                }
            }
        ]
    },
    polar:{
        polar: {
            radius: [30, '80%']
        },
        angleAxis: {
            max: 4,
            startAngle: 75
        },
        radiusAxis: {
            type: 'category',
            data: ['a', 'b', 'c', 'd']
        },
        tooltip: {},
        series: {
            type: 'bar',
            data: [2, 1.2, 2.4, 3.6],
            coordinateSystem: 'polar',
            label: {
                show: true,
                position: 'middle',
                formatter: '{b}: {c}'
            }
        }
    },
    radar:{
        legend: {
            bottom: 0,
        },
        radar: {
            indicator: [
                { name: 'Sales', max: 100 },
                { name: 'Administration', max: 100 },
                { name: 'Information Technology', max: 100 },
                { name: 'Customer Support', max: 100 },
                { name: 'Development', max: 100 },
                { name: 'Marketing', max: 100 }
            ]
        },
        series: [
            {
                type: 'radar',

                data: [
                    {
                        value: [80, 85, 75, 60, 60, 80],
                        name: '张三',
                        lineStyle: {
                            type: 'dashed'
                        },
                        label: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
                            }
                        }
                    },
                    {
                        value: [65, 85, 90, 70, 90, 70],
                        name: '李四'
                    }
                ]
            }
        ]
    },
    gauge:{
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 60,
                splitNumber: 12,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 30
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 30
                    }
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 5,
                    lineStyle: {
                        width: 1,
                        color: '#999'
                    }
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: -20,
                    color: '#999',
                    fontSize: 20
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 60,
                    fontWeight: 'bolder',
                    formatter: '{value} °C',
                    color: 'auto'
                },
                data: [
                    {
                        value: 20
                    }
                ]
            },
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 60,
                itemStyle: {
                    color: '#FD7347'
                },
                progress: {
                    show: true,
                    width: 8
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [
                    {
                        value: 20
                    }
                ]
            }
        ]
    },
    pie:{
        tooltip: {
            trigger: 'item'
        },
        legend: { // 图例
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                },
                emphasis: { // 动效设置
                    label: {
                        show: true,
                        fontSize: 15, // 标签文字动效结束后的大小
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    }
}
