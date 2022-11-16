<script>
export default {
    name: "mew-baiduMap-ContextMenu",
    methods:{
        // 使用 ContextMenu 类设置右键菜单
        addContextMenu(){
            // 添加右键菜单 -BEGIN-
            let menus = [
                {
                    name:'清除所有标记',                     // 定义菜单项的显示文本
                    callback: function () {
                        // 定义菜单项点击触发的回调函数
                        // self.map.clearOverlays() // 清空所有自定义图标和文字
                        self.removableAddons.forEach(item => {
                            self.remove(item)
                        })
                        self.removableAddons = []
                    }
                }
            ]
            let self = this
            let menu = new BMapGL.ContextMenu()
            menus.forEach((item, index) => {
                menu.addItem(new BMapGL.MenuItem(         // 定义菜单项实例
                    item.name,                            // 传入菜单项的显示文本
                    item.callback,                        // 传入菜单项的回调函数
                    { width: 100, id:'mew-map-menu' + index } // 指定菜单项dom的id
                ))
            })
            this.map.addContextMenu(menu)
            // 添加右键菜单 -END-
        }
    }
}
</script>

<style scoped>

</style>