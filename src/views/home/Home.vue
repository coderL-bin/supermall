<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物一条街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import {getHomeMultidata} from "../../network/home"

  export default {
    name: "Home",
    data(){
      return {
       banners: [],
        recommends: []
      }
    },
    created(){
      //1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }).catch( err => {
        console.log(err);
      })
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    }
  }
</script>

<style scoped>
.home-nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
