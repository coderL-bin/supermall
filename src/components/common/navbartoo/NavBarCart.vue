<template>
  <div class="nav-bar-cart">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped>
.nav-bar-cart{
  display: flex;
  height: 44px;
  line-height: 44px;
  justify-content: space-between;
  box-shadow: 0 1px 1px rgba(100,100,100,.1);
}
  .left, .right{
    width: 60px;
  }
</style>
