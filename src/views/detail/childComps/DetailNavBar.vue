<template>
  <div>
    <nav-bar> <div slot="center" class="title">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div v-for="(item, index) in titles"
                              class="title-item"
                              @click="itemClick(index)"
                               :class="{change: currentIndex ===index}"
                                >{{item}}</div>
    </div></nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "",
    data(){
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
   /* props: {
      currentIndex: {
        type: Number,
        default: 0
      }
    },*/
    components: {
      NavBar
    },
    methods: {
      itemClick(index){
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick(){
        this.$router.back();
        //this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
.title{
  display: flex;
  font-size: 14px;
}
  .title-item{
    flex: 1;
  }
  .back img{
    margin-top: 10px;
    margin-left: -50px;
  }
  .change{
    color: var(--color-high-text);
  }
</style>
