<template>
    <div class="mew-baiduMap" :class="{ cloak }">
        <div class="mew-baiduMap-widgets">
            <slot/>
        </div>
        <div :id="id"/>
    </div>
</template>

<script>
import ContextMenu from "./mixins/ContextMenu"
import Geocoder from "./mixins/Geocoder"
import Utiles from "./mixins/Utiles"
import Addons from "./mixins/Addons"
export default {
    name: "mew-baiduMap",
    mixins:[ ContextMenu, Geocoder, Utiles, Addons ],
    created() {
        this.id += Math.random().toString(36).substr(2) // 一个应用内可能使用多个地图组件
        if(!this.$map) // 全局 $map 插件只挂载一个就可以了
            this.$root.__proto__.$map = this
    },
    mounted(){
        this.load(this.src + '&ak=' + this.AK).then(()=>{ // load 方法需要能避脚本重复加载
            this.map = new BMapGL.Map(this.id)
        })
    },
    data(){
        return {
            id:'baiduMap_',
            map: null,
        }
    },
    computed:{
        point(){
            return { lng: Number(this.lng), lat: Number(this.lat) }
        },
        raw(){
            return this.map
        }
    },
    watch:{
        point:{
            deep: true,
            handler(val){ // 将视口移到新坐标
                this.flyTo(val)
            }
        },
        map(){
            this.Geocoder = new BMapGL.Geocoder() // 创建地址查询、坐标查询工具
            this.map.setMapStyleV2({ styleId: '9a5f9f11116101e893f751e44a56df18' }) // 设置地图风格样式
            this.panToCityLevel() // 将视口移至当前城市
            this.addControlTool() // 向地图添加控件,添加比例尺、定位按钮等等
            this.addContextMenu() // 添加鼠标右键菜单
            this.addEventListeners() // 初始化点击、平移等事件
            this.getCurrentPosition() // 获取用户当前真实坐标，浏览器端不稳定
            this.renderAddons()
        },
    },
    props:{
        AK:{ // 百度开发者平台 AccessKey
            type: String,
            default: 'TQ9ivD4oUEgPiaxF6yE1LDvZUV25duDL'
        },
        src:{ // 百度地图资源及版本
            type: String,
            default: 'https://api.map.baidu.com/api?v=1.0&&type=webgl'
        },
        addons:{ // 自定义标签列表
            type: Array | Object,
            default(){
                return [
                    {
                        lng: 120.4639990616576,
                        lat: 36.169705901418155,
                        text:'测试标签',
                        type:'', // red blue 等预设样式，按需修改组件源码吧
                        click:self => console.log(self),
                    }
                ]
            }
        },
        city:{ // 地图初始化时使用的城市
            type: String,
            default: '青岛市'
        },
        lng:{ // 经度
            type: Number,
            default: 120.416168
        },
        lat:{ // 纬度
            type: Number,
            default: 36.116212
        },
        cloak:{ // true 则不显示模板; 适合只使用地图数据和方法，但不需要显示地图的场景
            type: Boolean,
            default: false
        }
    },
    methods:{
        flyTo(point, level=17){ // 平移至指定坐标处
            if(point.lng && point.lat){
                // this.map.addOverlay(new BMapGL.Marker({lng:point.lng, lat:point.lat}))
                this.map.flyTo(point, level)
            }
            else console.log('无效坐标')
        },
    }
}
</script>
<style lang="scss">
.BMap_cpyCtrl { display: none }
.anchorBL img{ display: none }
div.BMap_contextMenu{
    div[id^="mew-map-menu"]{
        padding: 4px 10px!important;
    }
}
label.BMapLabel{
    position: relative;
    &::before{
        position: absolute;display: block;content: "";width: 0;height: 0;left:6px;top: calc(100% - 2px);
        border-width: 10px;
        border-style: solid;
        border-color: inherit;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
    }
}
</style>
<style lang="scss">
div.mew-baiduMap{
    user-select: none;
    position: relative;
    width: 100%;height: 100%;
    &.cloak{
        width: 0!important;height: 0!important;
        position: absolute;
    }
    div.mew-baiduMap-widgets{
        position: absolute;left: 0;top: 0;z-index: 9999;
        height: 100%;width:100%;overflow: visible;
        user-select: none!important;
        pointer-events: none;
        *{
            pointer-events: auto;
        }
    }
    div[id^="baiduMap_"]{
        width: 100%;height: 100%;
    }
}
</style>