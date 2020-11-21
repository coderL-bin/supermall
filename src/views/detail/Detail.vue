<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="BScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
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

import {getDetail, Goods, Shop,GoodsParam} from "network/detail";

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
      DetailParamInfo
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
       paramInfo: {}
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
      })
    },
  methods: {
      imageLoad(){
        this.$refs.BScroll.refresh();
      }
  },
  destroyed(){
    //.组件销毁显示底部的nav-bar
    this.$bus.$emit('isShow', true);
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
