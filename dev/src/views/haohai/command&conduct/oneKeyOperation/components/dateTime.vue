<template>
    <div class="cell-dateTime">
        <div>{{ date }}</div>
        <div>{{ time }}</div>
    </div>
</template>

<script>
export default {
name: "dateTime",
    computed:{
        date(){
            let arr = this.row[this.prop]
            return arr ? arr.split(' ')[0] : this.row
        },
        time(){
            let arr = this.row[this.prop]
            return arr ? arr.split(' ')[1] : this.prop
        }
    },
    props:{
        row:{
            type: Object,
            default(){
                return {}
            }
        },
        prop:{
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped lang="scss">
div.cell-dateTime{
  font-size: 12px;
    div{
        margin: 0;
        line-height: 19px;
    }
}
</style>
