<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物一条街</div></nav-bar>
    <tab-control @tabClick="tabClick"
                 :titles="['流行', '新款','精选']"
                 ref="tabControlCopy"
                  class="tab-control"
                  v-show="isTabFixed"/>
                  <!--:class="{fixed: isTabFixed}-->

    <scroll class="content"
                  ref="scroll"
                  :probe-typy="3"
                  @scroll="contentScroll"
                  :pull-up-load="true"
                  :isClick="true"
                   @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control @tabClick="tabClick"
                                :titles="['流行', '新款','精选']"
                                 ref="tabControl"/>
      <goods-list :goods="goodsList" />
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
  import {debounce, delayTime} from "common/utils";


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
        isShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
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
    destroyed(){
      console.log('Home组件被销毁');
    },
    activated(){
      this.$refs.scroll.refresh();
      this.$refs.scroll.backScroll(0, this.saveY);
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
      console.log(this.saveY);
    },
    created(){
      //1.请求多个数据
      this.getMultidata()

      //2. 请求商品数据
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')
    },
    mounted(){
      //1.监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 300);
      this.$bus.$on('imageLoad', () => {
        refresh();
      });

      /*//2.获取tabControl的offsetTop
      //所有组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      console.log(this.tabOffsetTop);*/

      this.$bus.$on('swiperImageLoad', ()=> {
       // console.log('请忽略：图片加载完成:-练习事件总线，最终还是用子传父之间的通信');
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      })
    },
    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        switch (index) {
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
        this.$refs.tabControl.currentIndex = index;
          this.$refs.tabControlCopy.currentIndex = index;
          //this.$refs.scroll.scroll.scrollTo(0, -this.tabOffsetTop);
          this.$refs.scroll.backScroll(0, -this.tabOffsetTop);
      },
      loadMore() {
        this.getGoods(this.currentType);
      },
      /*
      * 网络请求相关的方法
      * */
      getMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }).catch(err => {
          console.log(err);
        })
      },
      getGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      },
      //监听tabControl的offsetTop值
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },
      //回到顶部按钮点击事件
      backTop() {
        //this.isClick = !this.isClick;
        this.$refs.scroll.backScroll(0, 0, 2000);
      },
      //监听事件滚动相关判断
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShow = -position.y > 1000;

        //2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = -position.y > this.tabOffsetTop;
      }
    }
  }
</script>

<style scoped>
  #home{
 /* padding-top: 44px;*/
    height: 100vh;
   /* overflow: hidden;*/
    position: relative;
  }
.home-nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
/*  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;*/
}
 /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
  }*/
  /*第二次方案*/
  .content {
   overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }*/
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
