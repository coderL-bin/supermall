<template>
  <div class="bottom-bar">
    <div class="checked">
      <check-button class="check-all"
                                  :is-change="isSelectAll"
                                  @click.native="changeClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate">
      去结算: {{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex';

  export default {
    name: "",
    components: {
      CheckButton
    },
    computed:{
      ...mapGetters(['totalPrice', 'checkLength','cartList']),
      isSelectAll(){
        if(this.cartList.length === 0) return false;

        //1.使用filter
        //return !(this.cartList.filter(item => !item.change).length);

        //2.使用find
        return !this.cartList.find(item => !item.change);

        //3,使用普通遍历
       /* for(let item of this.cartList){
          if(!item.change){
            return false;
          }
        }
        return true;*/
      }
    },
    methods: {
      changeClick() {
        if(this.isSelectAll){ //全部选中
         this.cartList.forEach(item => item.change = false);
       }else{ //部分或全部不选中
         this.cartList.forEach(item => item.change = true);
       }
       //this.cartList.forEach(item => item.change = !this.isSelectAll);
      }
    }
  }
</script>

<style scoped>
.bottom-bar{
  position: relative;
  display: flex;
  height: 40px;
  bottom: 134px;
  line-height: 40px;
  background-color: #eee;
}
.checked{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
  .check-all{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
    text-align: center;
  }
  .calculate{
    width: 90px;
    color: #fff;
    background-color: red;
    text-align: center;
  }
</style>
