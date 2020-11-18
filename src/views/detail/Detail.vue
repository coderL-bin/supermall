<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";

import {getDetail, GoodsInfo} from "network/detail";

export default {
    name: "Detail",
    components: {
    DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {}
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
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      })
    },
  destroyed(){
    console.log('组件被销毁');
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

</style>
