<!--suppress ALL -->
<template>
    <div class="superMap">
        <div class="left">
            <div class="box">
                <div white xs mb-sm>地点查找</div>
                <el-input v-model="address" size="small" style="margin-bottom: 10px" @change="flyToSearchPoint"></el-input>
                <div><el-button type="primary" @click="flyToSearchPoint">查找</el-button></div>
                <div white xs mb-sm mt-lg>事件列表</div>
                <ul flex wrap>
                    <li v-for="item in addons"><i @click="clickTask(item)">{{ item.name }}</i></li>
                </ul>
                <div white xs mb-sm mt-lg>事件详情</div>
                <div class="taskDetails">
                    <div>name: {{ details.name }}</div>
                    <div>lng: {{ details.lng }}</div>
                    <div>lat: {{ details.lat }}</div>
                    <div>type: {{ details.type }}</div>
                    <div>text: {{ details.text }}</div>
                </div>
                <div flex ac xs white ba ac-9 pa-sm mt-md>
                    <span mr-sm white>添加点</span>
                    <el-switch size="small"
                        v-model="addPoint"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </div>
            </div>
        </div>
        <baiduMap class="right" @located="located" @click="click" :addons="addons">
            <div class="locateBtn" @click="locateMyself">
                <svg viewBox="0 0 1024 1024" width="24" height="24">
                    <path d="M960 480h-65.6C879.2 293.6 730.4 144.8 544 129.6V64h-64v65.6C293.6 144.8 144.8 293.6 129.6 480H64v64h65.6c15.2 186.4 164 335.2 350.4 350.4v65.6h64v-65.6c186.4-15.2 335.2-164 350.4-350.4h65.6v-64z m-448 352c-176.8 0-320-143.2-320-320s143.2-320 320-320 320 143.2 320 320-143.2 320-320 320z m128-320c0 70.4-57.6 128-128 128s-128-57.6-128-128 57.6-128 128-128 128 57.6 128 128z"></path>
                </svg>
            </div>
        </baiduMap>
    </div>
</template>

<script>
import load from '@/utils/load'
import baiduMap from "./baiduMap";
export default {
    name: "superMap",
    data(){
        return {
            address:'',
            details:'',
            lng: 120.499043,
            lat: 36.186915,
            point:{lng:'', lat:''},
            addPoint: false,
            addons:[
                {lng: 120.36927364561119, lat: 36.11104742692717,type:'green',text:'回访【1】 升级【1】',name:'四方利群',click:this.clickLabel},
                {lng: 120.36063769592896, lat: 36.097598446170586,type:'blue',text:'升级【10】',name:'盛华园小区',click:this.clickLabel},
                {lng: 120.46065550425129, lat: 36.107910350233446,type:'blue',text:'升级【8】 维修【1】',name:'青医附院',click:this.clickLabel},
                {lng: 120.38570494650612, lat: 36.09427193115956,type:'red',text:'咨询【1】 升级【1】',name:'市北万达',click:this.clickLabel},
                {lng: 120.37768050346217, lat: 36.10672967163668,type:'blue',text:'升级【15】 维修【5】',name:'理工大学',click:this.clickLabel},
                {lng: 120.36293880187239, lat: 36.12294965083776,type:'green',text:'回访【2】 咨询【2】',name:'杭州花园',click:this.clickLabel},
                {lng: 120.38015284657085, lat: 36.08776354707135,type:'blue',text:'升级【5】 咨询【1】',name:'未知地点12',click:this.clickLabel},
                {lng: 120.356961693395, lat: 36.06372019321372,type:'blue',text:'升级【2】',name:'天泰体育馆',click:this.clickLabel},
                {lng: 120.40838082400371, lat: 36.10259891853307,type:'red',text:'维修【1】 咨询【1】',name:'妇女儿童医院',click:this.clickLabel},
                {lng: 120.36333615218773, lat: 36.09235358843262,type:'blue',text:'升级【22】 咨询【1】',name:'深港广场',click:this.clickLabel},
            ],
        }
    },
    components:{
        baiduMap
    },
    mounted() {
        // console.log(this.$map.id)
    },
    watch:{

    },
    methods:{
        async flyToSearchPoint(){
            let point = await this.$map.getPointFromAddress(this.address)
            if(point)
                this.$map.flyTo(point)
        },
        // 这种定位方式受制于网络和浏览器，成功率较低，建议使用 @located 事件获取用户坐标
        async locateMyself(){
            this.$map.flyTo(this.point)
        },
        clickLabel(val){
            console.log(val)
            this.details = val
            this.$map.flyTo({lng:val.lng, lat:val.lat}, 16)
        },
        clickTask(item){
            this.details = item
            this.$map.flyTo({ lng:item.lng, lat:item.lat }, 16)
        },
        test(){
            this.$http.post('/sentry/region').then(result =>{
                console.log(result.data)
            })
        },
        moveend(lng, lat){ // 平移结束事件，平移结束后传入视口中心点的 精度，纬度
        },
        click(lng, lat){ // 地图空白处点击事件，传入点击所在处的 精度，纬度
            console.log({ lng, lat })
            if(this.addPoint)
                this.$map.addIcon({ lng, lat })
        },
        loaded(lng, lat){ // 地图加载完成,初始化完成，并平移至当前城市后触发的事件，传入当前城市经纬度
        },
        // 当获取到当前用户坐标时触发的事件，传入当前用户所在经纬度
        // 可通过 $map.getCurrentPosition 触发
        located(lng, lat){
            this.point = { lng, lat }
            console.log({ lng, lat })
        }
    }
}
</script>
<style scoped lang="scss">
div.mew-baiduMap{
    div.locateBtn{
        position: absolute;bottom: 110px;left: 45px;
        width: 28px;height: 28px;border-radius: 3px;
        background-color: white;
        box-shadow: 0 1px 2px rgba(0,0,0,.4);
        cursor: pointer;
        display: flex;justify-content: center;align-items: center;
        &:hover{
            svg{
                fill: #0077e0;
            }
        }
    }
}
//::v-deep span.el-switch__core::after{
//    transform: translateY(-1px)!important;
//}
div.superMap{
    width: 100%;height: 100%;
    display: flex;
    div.left{
        width: 300px;height: 100%;
        background-color: rgba(0,0,0,.55);
        div.box{
            padding: 10px;
            height: 100%;
            ul{
                justify-content: space-between;
                user-select: none;
                li{
                    list-style: none;
                    text-align: center;
                    padding: 3px 0;
                    width: calc(50% - 3px);
                    i{
                        cursor: pointer;
                        padding: 4px 0;
                        border: .5px solid white;
                        display: block;width: 100%;
                        color: white;
                        border-radius: 3px;
                        font-style: normal;
                        &:active{
                            border-color: rgba(255,255,255,.7);
                        }
                        &:hover{
                            background-color: rgba(255,255,255,.04);
                        }
                    }
                }
            }
            div.taskDetails{
                padding: 10px;color: white;font-size: 12px;
                border: .5px solid rgba(255,255,255,.2);
                min-height: 300px;
                div{
                    margin: 5px;
                    height: 24px;line-height: 24px;
                }
            }
        }
    }
    div.right{
        width: calc(100% - 200px);height: 100%;

    }
}
</style>