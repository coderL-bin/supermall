<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showImage(){
        return this.goodsItem.image ? this.goodsItem.image : this.goodsItem.show.img;
      }
    },
    methods: {
      imageLoad(){
        this.$bus.$emit('imageLoad')
        /*if(this.$route.path.indexOf('/home') === 0) {
          this.$bus.$emit('homeImageLoad');
          console.log('加载中...');
         // console.log(this.$route.path.includes('/home'));
        }else if( this.$route.path.includes('/detail')){
          this.$bus.$emit('detailImageLoad')
        }*/
       //this.$store.state.imageLoad = true;
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid);
        /*this.$router.push({
          path: '/detail',
          query: {
            name: '宝哥',
            age: 18,
            height: 1.8
          }
        })*/
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    width: 100%;
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
