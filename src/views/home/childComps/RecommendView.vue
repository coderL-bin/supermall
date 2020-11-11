<template>
<div class="recommend">
  <div v-for="item in recommends" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image" :alt="item.title">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
  export default {
    name: "",
    props: {
      recommends: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.recommend{
  display: flex;
  font-size: 12px;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee
 /* justify-content: space-between;*/
}
.recommend-item{
  flex: 1;
}
  .recommend-item img {
    width: 70px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
