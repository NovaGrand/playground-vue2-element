<template>
  <div class="cell-editRow">
    <div class="row">
      <a href="javascript:void(0);" @click="click('一键调度')">一键调度</a>
      <a href="javascript:void(0);" @click="click('上报')">上报</a>
      <a href="javascript:void(0);" @click="click('查看')">查看</a>
    </div>
    <div class="row">
      <a href="javascript:void(0);" @click="click('事件组')">事件组</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "cell-editRow",
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
  },
  methods:{
    click(msg){
      this.$message({
        message: msg,
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="scss">
div.cell-editRow{
  a{
    color: #00a1ff;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
  div.row{
      display: flex;justify-content: space-between;
      max-width: 150px;
      margin: 0 auto;
      &:last-child{
        margin-top: 3px;
        justify-content: center;
      }
  }
}
</style>
