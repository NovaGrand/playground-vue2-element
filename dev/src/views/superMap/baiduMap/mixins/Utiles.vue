<script>
import locate_blue from '../assets/locate_blue.png'
export default {
    name: "mew-baiduMap-Utiles",
    methods:{
        load(src){
            if(!document.getElementById('BMapGL')){
                let script = document.createElement("script")
                script.id = 'BMapGL'
                script.type = "text/javascript"
                script.src = src + '&callback=loadedCallBack'
                document.body.appendChild(script)
                return new Promise(resolve => {
                    window.loadedCallBack = () => {
                        resolve()
                    }
                })
            }
            else
                return new Promise(resolve => {
                    let t = setInterval(()=>{
                        if(BMapGL){
                            clearInterval(t)
                            resolve()
                        }
                    },200)
                })
        },
        addEventListeners(){
            let map = this.map
            // 地图加载完成事件
            map.addEventListener('tilesloaded',()=>{

            })
            map.addEventListener('click',e => {
                // 获取鼠标点击处的当前坐标
                this.$emit('click', e.latlng.lng, e.latlng.lat)
            })
            // 地图平移结束事件
            map.addEventListener('moveend',e => {
                // 获取视口中心点坐标
                let p = map.getCenter()
                this.$emit('moveend', p.lng, p.lat)
                // map.removeOverlay() // 移除一个指定的覆盖物
                // map.clearOverlays() // 移除所有覆盖物
            })
        },
        panToCityLevel(){
            new BMapGL.LocalCity().get(e => {
                this.map.centerAndZoom(new BMapGL.Point(e.center.lng, e.center.lat), 14)
                this.$emit('loaded', e.center.lng, e.center.lat)
            })
        },
        getCurrentPosition(){
            // 获取用户当前真实坐标，该功能不稳定，会受到 VPN 干扰
            let geolocation = new BMapGL.Geolocation()
            geolocation.enableSDKLocation() // 只会在移动端生效
            // navigator.geolocation.getCurrentPosition((position) => {
            //     console.log('Chrome：', position)
            // })
            return new Promise(resolve => {
                geolocation.getCurrentPosition(r => {
                    // 因为基于浏览器定位，不同浏览器内核导致坐标系不同，因此会有偏差
                    // 这里需要根据浏览器的地理坐标系转为百度坐标系，这里以 chrome 为例
                    if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
                        this.$emit('located', r.point.lng, r.point.lat)
                        resolve(r.point.lng, r.point.lat)
                    }
                    else{
                        this.$emit('error','can not locate current position')
                        resolve(null)
                    }

                })
            })

        },
        addControlTool(){
            let map = this.map
            map.enableScrollWheelZoom(true)
            map.enableResizeOnCenter(true)
            // offset 即控件位置偏移量，值是 Size 类，即 Size 的宽高就是控件的偏移量，与控件的尺寸无关
            // 控件可选位置有 BMAP_ANCHOR_TOP_LEFT BMAP_ANCHOR_TOP_RIGHT BMAP_ANCHOR_BOTTOM_LEFT BMAP_ANCHOR_BOTTOM_RIGHT
            // 指北针控件
            map.addControl(new BMapGL.NavigationControl3D({ anchor: BMAP_ANCHOR_TOP_LEFT, offset:{ width:30, height:25 } }))
            // 缩放控件，滚轮失效时使用
            map.addControl(new BMapGL.ZoomControl({ anchor: BMAP_ANCHOR_TOP_LEFT, offset:{ width:43, height:110 } }))
            // 将视点中心移动至用户当前物理位置，浏览器需要 https 支持，否则无效，建议自己实现
            // map.addControl(new BMapGL.LocationControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset:{ width:46, height:100 } }))
            // 比例尺控件，很实用
            map.addControl(new BMapGL.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset:{ width:45, height:60 } }))

            // map.setHeading(40);   //设置地图旋转
            // map.setTilt(60);       //设置地图仰角
            map.setMapType(BMAP_NORMAL_MAP) // 设置地图模式，可用选常量为 BMAP_NORMAL_MAP BMAP_EARTH_MAP BMAP_SATELLITE_MAP
        },
    }
}
</script>

<style scoped>

</style>