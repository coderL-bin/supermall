<template>
  <!--children
  ref: 如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象
         如果是绑定在普通的元素中，那么通过this,$refs.refname获取到的是一个元素对象
  -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
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
      isClick: {
        type: Boolean,
        default: false
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    mounted(){
      //1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      });

      //2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp', ()=>{
        this.$emit('pullingUp')
      })
    },
    methods: {
      backClick() {
        if (this.isClick) {
          this.scroll.scrollTo(0, 0);
        }
      },
      scrollTo(x, y, time=500){
        this.scroll.scrollTo(x, y, time);
      },
      finishPullUp(){
        this.scroll.finishPullUp();
      }
  }
  }
</script>

<style scoped>

</style>
