<template>
  <div class="back-top" @click="backClick">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "",
    methods: {
      backClick(){
        this.$emit('backTop')
      }
    }
  }
</script>

<style scoped>
.back-top{
  position: fixed;
  right: 5px;
  bottom: 48px;
}
  .back-top img{
    width: 43px;
  }
</style>
