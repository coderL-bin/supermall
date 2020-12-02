<template>
  <div class="cart-nav">
    <!--导航-->
    <nav-bar-cart class="nav-bar-cart"><div slot="center">购物车({{length}})</div></nav-bar-cart>

    <!--商品列表-->
    <cart-list/>

    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBarCart from "components/common/navbartoo/NavBarCart";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from "vuex";

  export default {
    name: "",
    components: {
      NavBarCart,
      CartList,
      CartBottomBar
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
  .cart-nav{
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
.nav-bar-cart{
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
}
</style>
