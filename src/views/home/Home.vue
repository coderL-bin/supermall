<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物一条街</div></nav-bar>
    <scroll class="content"
                  ref="scroll"
                  :probe-typy="3"
                  @scroll="contentScroll"
                  :pullUpLoad="true"
                   @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" @tabClick="tabClick" :titles="['流行', '新款','精选']"/>
      <goods-list :goods="goodsList"></goods-list>
    </scroll>
    <!--<back-top @backTop="backTop" />-->
    <!--
      修饰符：.native
          在需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听
    -->
    <back-top @click.native="backTop" v-show="isShow" />
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";


  export default {
    name: "Home",
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        scroll: null,
        isShow: false
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    computed: {
      goodsList(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      //1.请求多个数据
      this.getMultidata()

      //2. 请求商品数据
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')
    },
    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        switch( index){
          case 1 :
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
            default :
              this.currentType = 'pop';
              break;
        }
      },
      /*
      * 网络请求相关的方法
      * */
      getMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }).catch( err => {
          console.log(err);
        })
      },
      getGoods(type){
        const  page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list .push(...res.data.list);
          this.goods[type].page +=  1;

          //上拉多次加载实现
          this.$refs.scroll.finishPullUp();
          //解决better-scrooll图片没加载完就计算content高度导致的BUG问题
          this.$refs.scroll.scroll.refresh();
        })
      },

      //回到顶部按钮点击事件
      backTop(){
        //this.isClick = !this.isClick;
        this.$refs.scroll.scrollTo(0, 0, 2000);
      },
      contentScroll(position){
        setTimeout(() => {
          this.isShow = -position.y > 1000
        },1000)
      },
      loadMore(){
        this.getGoods(this.currentType)
      }
    }
  }
</script>

<style scoped>
  #home{
 /* padding-top: 44px;*/
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
.home-nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    height: calc(100% - 93px);
    margin-top: 44px;
  }
  /*第二次方案*/
  /*.content {
   overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }*/
</style>
