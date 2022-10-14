<template>
  <div class="cell-href" @click="click">
    <a href="javascript:void(0);">{{ row[prop] }}</a>
  </div>
</template>

<script>
export default {
  name: "cell-href",
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
    click(){
      this.$message({
        message:'你点击了一个预案',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="scss">
div.cell-href{
  a{
    color: #00a1ff;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>
