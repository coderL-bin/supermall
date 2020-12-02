export default {
  cartLength(state){
    return state.cartList.length;
  },
  cartList(state){
    return state.cartList;
  },
  totalPrice(state){
    return '￥' + state.cartList.filter(item => item.change).reduce((preValue, item) => {
      return preValue + item.price * item.count;
    },0).toFixed(2);
  },
  checkLength(state){
    return state.cartList.filter(item => item.change).reduce((preValue, item) =>{
      return preValue + item.count;
    }, 0);
    //return this.$store.state.cartList.filter(item => item.change).length;
  }
}
