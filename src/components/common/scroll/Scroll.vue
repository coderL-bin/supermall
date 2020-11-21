<template>
  <!--children
  ref: 如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象
         如果是绑定在普通的元素中，那么通过this,$refs.refname获取到的是一个元素对象
  -->
  <div  ref="wrapper">
    <div class="bscroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      isClick: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null,
        cont : 1
      }
    },
    mounted() {
      //1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.isClick,
        pullUpLoad: this.pullUpLoad
      });

      //2.监听滚动的位置
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        });

      //3. 监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        });
      };
    },
    methods: {
      backScroll(...args) {
        if (this.isClick) {
          this.scroll.scrollTo(...args);
        }
      },
      refresh(){
        this.scroll && this.scroll.refresh();
        //console.log('刷新'+ this.cont++ +'次');
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      getScrollY(){
        return this.scroll ? this.scroll.y: 0;
      }
  }
  }
</script>

<style scoped>

</style>
