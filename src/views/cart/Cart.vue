<template>
  <div class="cart-nav">
    <nav-bar-cart class="nav-bar-cart"><div slot="center">购物车({{length}})</div></nav-bar-cart>
  </div>
</template>

<script>
  import NavBarCart from "components/common/navbartoo/NavBarCart";
  import {mapGetters} from "vuex";

  export default {
    name: "",
    components: {
      NavBarCart
    },
    computed: {
      //两种语法
     //...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
.nav-bar-cart{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
