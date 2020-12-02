<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"  ref="navBar" @titleClick="titleClick"/>
    <scroll class="content" :isClick="true" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addCart"/>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import {getDetail, Goods, Shop,GoodsParam, getRecommend} from "network/detail";
import {itemListenerMixin} from "common/mixin";

import Scroll from "components/common/scroll/Scroll";
import {debounce} from "common/utils";
import{BACK_POSITION} from "common/const";
import {backTopMixin} from "../../common/mixin";

export default {
    name: "Detail",
    components: {
    DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
  mixins: [itemListenerMixin, backTopMixin],
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
       paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs:[],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid;

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1. 获取顶部的图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        //2.获取商品详情的数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)

        //3.获取商家信息
        this.shop = new Shop(data.shopInfo);

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //5.隐藏底部的nav-bar
        this.$bus.$emit('isShow', false);

        //6. 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //7.取出评论信息
        this.commentInfo = data.rate.cRate !==0 ? data.rate.list[0] : {};

        //8.this.$nextTick函数是等上面所有组件都加载并且DOM渲染完成后，
        //再调用回调函数
       this.$nextTick( () => {
         /*根据最新的数据，对应的DOM是已经被渲染出来，
         但是图片依然是没有加载完成(目前获取到的offsetTop是包含图片的).
         offsetTop值不对的时候，都是因为图片的问题
         * */
         this.themeTopYs.push(0);
         this.themeTopYs.push(this.$refs.params.$el.offsetTop);
         this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
         this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
         //console.log(this.themeTopYs);
       })
      });

        //3.请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommend = res.data.list;
      });

      //4.给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
      this.getThemeTopY = debounce( ()=>{
        this.themeTopYs = [];
        if(this.$refs.params && this.$refs.comment && this.$refs.recommends) {
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
        }
        //console.log(this.themeTopYs);
      },1000)
    },
  mounted(){
    //1.监听item中图片加载完成
      //if(this.$refs.scroll) this.$refs.scroll.refresh();
  },
  updated(){
      //只要组件更新就会回调此函数
  },
  destroyed(){
    //.组件销毁显示底部的nav-bar
    this.$bus.$emit('isShow', true);

    //取消全局事件监听
    this.$bus.$off('detailImageLoad', this.itemImgListener);
  },
  methods: {
      imageLoad(){
        this.refresh();
        this.getThemeTopY();
      },
    titleClick(index){
      this.$refs.scroll.backScroll(0, -this.themeTopYs[index] , 1000);
    },
    contentScroll(position){
      //1.获取Y值
      const positionY = -position.y;

      //2.positionY和主题中的值进行对比
      //[0, 8000, 9000, 9500]
      /*positionY 在 0 和 8000 之间， index =0
      /*positionY 在 8000 和 9000 之间， index =1
      /*positionY 在 9000 和 9500 之间， index =2

      /*positionY 大于等于 9500 , index =3
      * */
      for(let item=0; item<this.themeTopYs.length-1; item++){
        /*if(positionY >this.themeTopYs[item] && positionY < this.themeTopYs[item *1 +1]){
          console.log(item);
        }*/
        /*if(this.currentIndex !== item && ((item*1 <this.themeTopYs.length -1 && positionY >= this.themeTopYs[item] && positionY <this.themeTopYs[item *1 +1])
          || (item*1 === this.themeTopYs.length -1 && positionY >= this.themeTopYs[item]))){
          this.currentIndex = parseInt(item);
        }*/
        if((this.currentIndex != item) && (positionY > this.themeTopYs[item] && positionY < this.themeTopYs[item + 1])){
          this.currentIndex = item;
          this.$refs.navBar.currentIndex = this.currentIndex;
        };

        //3.是否显示回到顶部
        //this.isShowBackTop = -position.y > BACK_POSITION;
        this.listenShowBackTop(position);
      }
    },
    addCart(){
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      //this.$store.commit('addCart', product);
      this.$store.dispatch('addCart', product);
    }
  },
  activated(){
    console.log('activated');
  },
  deactivated(){
    console.log('deactivated');
  }
  }
</script>

<style scoped>
  #detail{
  position: relative;
  z-index: 9;
    height: 100vh;
}
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    /* height: calc(100% - 44px);
   overflow: hidden;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
