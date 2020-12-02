<template>
  <div class="check-button" :class="{check: isChange}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      isChange: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 2px solid #aaa;
}
  .check{
    border-color: red;
    background-color: red;
  }
</style>
