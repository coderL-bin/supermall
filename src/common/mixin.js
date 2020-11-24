import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener : null
    }
  },
  mounted(){
    //1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 300);

    //对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    }
    //取消对应方法的监听事件
    this.$bus.$on('imageLoad', this.itemImgListener);
  }
}
