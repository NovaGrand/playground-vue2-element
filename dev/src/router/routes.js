import HomeView from "@/views/HomeView";

export default [
    {
        path: '/big_file_upload',
        name: '大文件上传',
        component: ()=>import('@/views/bigFileUpload')
    },
    {
        path: '/super_map',
        name: '百度地图',
        component: ()=>import('@/views/superMap')
    },
    {
        path: '/big_screen',
        name: '数据大屏',
        component: ()=>import('@/views/bigScreen')
    },
    {
        path: '/upwork',
        name: 'UPWORK',
        component: ()=>import('@/views/upwork')
    },
    {
        path: '/websocket',
        name: 'WebSocket',
        component: ()=>import('@/views/websocket')
    },
    {
        path: '/express',
        name: 'Express 测试',
        component: ()=>import('@/views/express')
    },
    {
        path: '/Echarts',
        name: 'Echarts',
        component: ()=>import('@/views/Echarts')
    },
    // {
    //     path: '/haohai',
    //     name: 'haohai',
    //     component: ()=>import('@/views/haohai/layout.vue'),
    //     children:[
    //         {
    //             path: 'controlBoard',
    //             name: 'dklawa',
    //             component: ()=>import('@/views/haohai/command&conduct/controlBoard'),
    //         },
    //         {
    //             path: 'oneKeyOperation',
    //             name: '一键调度',
    //             component: ()=>import('@/views/haohai/command&conduct/oneKeyOperation'),
    //         },
    //         {
    //             path: 'taskManagement',
    //             name: '任务管理',
    //             component: ()=>import('@/views/haohai/command&conduct/taskManagement'),
    //         },
    //     ]
    // },
]