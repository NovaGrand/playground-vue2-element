<template>
    <a class="mew-download" :download="download" :href="href" draggable="false">
        <slot></slot>
    </a>
</template>

<script>
// function isValidURL(string) {
//     let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
//     return (res !== null)
// }
export default {
    name: "mew-download",
    data(){
        return {
            href: ''
        }
    },
    created() {
        if(this.srcType === 'URL')
            fetch(this.src).then(res => res.blob()).then(res => {
                this.href = URL.createObjectURL(res)
            })
        else if(this.srcType === 'Blob')
            this.href = URL.createObjectURL(this.src)
        else
            this.href = URL.createObjectURL(new Blob([this.src], {
                type: "text/plain;charset=utf-8"
            }))
    },
    beforeDestroy() {
        URL.revokeObjectURL(this.href)
    },
    computed: {
        srcType(){
            if(typeof this.src === 'string' && this.src.includes('http'))
                return 'URL'  // 远程资源
            if(this.src instanceof Blob)
                return 'Blob' // 本地文件
            else
                return 'JS'   // JS 数据
        },
        download(){
            let name = this.name ? this.name + '.' : ''
            let hash = this.hash ? Math.random().toString().slice(1,8) : ''
            // 如果未指定扩展名，尝试从资源地址中获取扩展名
            let ext = this.ext ? '.' + this.ext : (this.srcType === 'URL' ? this.src.split(/[#?]/)[0].split('.').pop().trim() : '')
            return name + hash + ext
        },
    },
    props: {
        src:{
            type: String | Number | Object,
            // http://raser.obs.cn-east-3.myhuaweicloud.com/bg-headUp.1a683c97.png
            default: ''
        },
        ext:{ // 指定文件扩展名，如果资源地址中没有扩展名，需要在此指定一个扩展名
            type: String,
            default: ''
        },
        name:{ // 指定要下载的文件名
            type: String,
            default: ''
        },
        hash:{ // 是否在文件命中添加哈希，以避免下载重名问题
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped lang="scss">
a.mew-download{
    cursor: pointer;
    user-select:none;
    text-decoration: none;
    &:active{
        filter: brightness(1.08);
    }
}
</style>