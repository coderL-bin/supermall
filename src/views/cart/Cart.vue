<template>
  <div class="cart-nav">
    <NavBarCart class="nav-bar-cart"><div slot="center">购物车</div></NavBarCart>
  </div>
</template>

<script>
  import NavBarCart from "../../components/common/navbartoo/NavBarCart";
  export default {
    name: "",
    components: {
      NavBarCart
    }
  }
</script>

<style scoped>
.nav-bar-cart{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
