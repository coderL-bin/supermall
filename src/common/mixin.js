import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";
import {BACK_POSITION} from "./const";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener : null,
      refresh: null
    }
  },
  mounted(){
    //1.监听item中图片加载完成
     this.refresh = debounce(this.$refs.scroll.refresh, 300);

    //对监听的事件进行保存
    this.itemImgListener = () => {
      this.refresh();
    }
    //取消对应方法的监听事件
    this.$bus.$on('imageLoad', this.itemImgListener);
  }
}

//回调顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop : false
    }
  },
  methods: {
    backTop(){
      this.$refs.scroll.backScroll(0, 0, 500);
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > BACK_POSITION;
    }
  }
}
