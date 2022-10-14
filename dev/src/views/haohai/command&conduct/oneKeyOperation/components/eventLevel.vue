<template>
  <div class="cell-eventLevel" :class="{ danger: danger }">
    {{ a + b }}
  </div>
</template>

<script>
export default {
  name: "dateTime",
  computed:{
    a(){
      return this.row[this.prop].split('(')[0]
    },
    b(){
      return  '(' + this.row[this.prop].split('(')[1]
    },
    danger(){
      return this.row[this.prop].includes('II')
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
div.cell-eventLevel{
  font-family: courier;
  border-radius: 20px;
  color: #00c177;
  border: 1px solid rgba(0,255,160,.8);
  background-color: rgba(0,255,160,.04);
  height: 24px;
  line-height: 23px;
  font-size: 12px;
  letter-spacing: -1px;
  &.danger{
    color: #f76200;
    border: 1px solid rgba(255,114,0,.8);
    background-color: rgba(255,114,0,.04);
  }
}
</style>
