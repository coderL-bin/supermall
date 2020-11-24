<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommend"/>
    </scroll>
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

import {getDetail, Goods, Shop,GoodsParam, getRecommend} from "network/detail";
import {itemListenerMixin} from "common/mixin";

import Scroll from "components/common/scroll/Scroll";

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
      GoodsList
    },
  mixins: [itemListenerMixin],
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
       paramInfo: {},
        commentInfo: {},
        recommend: []
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
        this.commentInfo = data.rate.cRate !==0 ? data.rate.list[0] : '';
      }),

        //3.请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommend = res.data.list;
      })
    },
  mounted(){
    //1.监听item中图片加载完成
      //if(this.$refs.scroll) this.$refs.scroll.refresh();
  },
  destroyed(){
    //.组件销毁显示底部的nav-bar
    this.$bus.$emit('isShow', true);

    //取消全局事件监听
    this.$bus.$off('detailImageLoad', this.itemImgListener);
  },
  methods: {
      imageLoad(){
        this.$refs.scroll.refresh();
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
      height: calc(100% - 44px);
    overflow: hidden;
    }
</style>
