<script>
import tool from "../assets/tool.png";
import 应急管理 from "../assets/应急管理.png";
import 赞 from "../assets/赞.png";
export default {
    name: "mew-baiduMap-Addons",
    data(){
        return {
            removableAddons:[],
            // 预设的标签样式，按需设置即可
            type:{
                blue:{
                    color: '#1296DB',
                    borderRadius: '2px',
                    padding:'.5px 4px 2px 5px',

                    offset:[39,24], // 图标偏移
                    size:[22, 22],  // 图标大小
                    icon:tool // 图标使用的图片
                },
                red:{
                    color: '#bf0000',
                    borderRadius: '20px',
                    padding:'.5px 4px 2px 8px',
                    offset:[39,24],
                    size:[24, 24],
                    icon:应急管理
                },
                green:{
                    color: '#00ac10',
                    borderRadius: '2px',
                    padding:'.5px 4px 2px 5px',
                    offset:[39,22],
                    size:[22, 22],
                    icon:赞
                },
            }
        }
    },
    methods:{
        renderAddons(){
            this.addons.forEach(addon => {
                let ops = {
                    ...this.type[addon.type],
                    ...addon,
                    removable: false
                }
                // 为标签添加图标
                this.addIcon(ops, false)
                // 为标签添加文本
                this.addText(ops, false)
            })
        },
        addIcon(ops, removable=true){
            let icon = null
            if( ops.icon)
                icon = new BMapGL.Icon(ops.icon, new BMapGL.Size(...ops.size), {
                anchor: new BMapGL.Size(...ops.offset),
            })
            let marker = new BMapGL.Marker(new BMapGL.Point(ops.lng, ops.lat), {icon})
            this.bindEvent(ops, marker)
            // 将标注添加到地图
            this.map.addOverlay(marker)
            if(removable)
                this.removableAddons.push(marker)
            return marker
        },
        addText(ops, removable=true){
            if(!ops.text)
                return
            let cfg = {
                position: new BMapGL.Point(ops.lng, ops.lat), // 指定文本标注所在的地理位置
                offset: new BMapGL.Size(-14, -22) // 设置文本偏移量
            };
            // 创建文本标注对象
            let text = new BMapGL.Label(ops.text, cfg);
            // 自定义文本标注样式
            text.setStyle({
                color: 'white',
                borderRadius: ops.borderRadius,
                letterSpacing:'0.5px',
                background:ops.color,
                borderColor: ops.color,
                padding: ops.padding,
                fontSize: '13px',
                fontFamily: '微软雅黑',
                cursor:'pointer'
            });
            this.bindEvent(ops, text)
            this.map.addOverlay(text)
            if(removable)
                this.removableAddons.push(text)
            return text
        },
        bindEvent(ops, obj){
            obj.addEventListener('click', ()=>{
                event.stopPropagation()
                if(ops.click)
                    ops.click(ops)
            })
            obj.addEventListener('contextmenu', ()=>{
                event.stopPropagation()
                event.preventDefault()
                if(ops.contextmenu)
                    ops.contextmenu(ops)
            })
        },
        remove(item){
            this.map.removeOverlay(item)
        }
    }
}
</script>
