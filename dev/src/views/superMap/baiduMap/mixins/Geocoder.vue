<script>
export default {
    name: "mew-baiduMap-Geocoder",
    data(){
        return {
            Geocoder: null,
        }
    },
    methods:{
        getAddressFromPoint(lng, lat){
            return new Promise(resolve => {
                // 根据坐标获取对应的城市地区和街道地址
                this.Geocoder.getLocation(new BMapGL.Point(lng, lat), result => {
                    if (result)
                        return result.address
                    else alert('没有找到您的地址！')
                })
            })
        },
        getPointFromAddress(str){
            return new Promise(resolve => {
                this.Geocoder.getPoint(str, point => {
                    if(point)
                        resolve(point)
                    else
                        alert('没有找到您的地址！');
                }, this.city)
            })
        }
    }
}
</script>

<style scoped lang="scss">

</style>