<template>
  <div>
    <nav-bar-too class="category-nav"><div slot="center">商品分类</div></nav-bar-too>
  </div>
</template>

<script>
  import NavBarToo from "../../components/common/navbartoo/NavBarToo";

  export default {
    name: "Category",
    components: {
      NavBarToo
    }
  }
</script>

<style scoped>
.category-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
