<template>
  <!--<div>
    <nav-bar-too class="category-nav"><div slot="center">商品分类</div></nav-bar-too>
  </div>-->
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <button @click="click">按钮</button>
      <li>分类的列表1</li>
      <li>分类的列表2</li>
      <li>分类的列表3</li>
      <li>分类的列表4</li>
      <li>分类的列表5</li>
      <li>分类的列表6</li>
      <li>分类的列表7</li>
      <li>分类的列表8</li>
      <li>分类的列表9</li>
      <li>分类的列表10</li>
      <li>分类的列表11</li>
      <li>分类的列表12</li>
      <li>分类的列表13</li>
      <li>分类的列表14</li>
      <li>分类的列表15</li>
      <li>分类的列表16</li>
      <li>分类的列表17</li>
      <li>分类的列表18</li>
      <li>分类的列表19</li>
      <li>分类的列表20</li>
      <li>分类的列表21</li>
      <li>分类的列表22</li>
      <li>分类的列表23</li>
      <li>分类的列表24</li>
      <li>分类的列表25</li>
      <li>分类的列表26</li>
      <li>分类的列表27</li>
      <li>分类的列表28</li>
      <li>分类的列表29</li>
      <li>分类的列表30</li>
      <li>分类的列表31</li>
      <li>分类的列表32</li>
      <li>分类的列表33</li>
      <li>分类的列表34</li>
      <li>分类的列表35</li>
      <li>分类的列表36</li>
      <li>分类的列表37</li>
      <li>分类的列表38</li>
      <li>分类的列表39</li>
      <li>分类的列表40</li>
      <li>分类的列表41</li>
      <li>分类的列表42</li>
      <li>分类的列表43</li>
      <li>分类的列表44</li>
      <li>分类的列表45</li>
      <li>分类的列表46</li>
      <li>分类的列表47</li>
      <li>分类的列表48</li>
      <li>分类的列表49</li>
      <li>分类的列表50</li>
      <li>分类的列表51</li>
      <li>分类的列表52</li>
      <li>分类的列表53</li>
      <li>分类的列表54</li>
      <li>分类的列表55</li>
      <li>分类的列表56</li>
      <li>分类的列表57</li>
      <li>分类的列表58</li>
      <li>分类的列表59</li>
      <li>分类的列表60</li>
      <li>分类的列表61</li>
      <li>分类的列表62</li>
      <li>分类的列表63</li>
      <li>分类的列表64</li>
      <li>分类的列表65</li>
      <li>分类的列表66</li>
      <li>分类的列表67</li>
      <li>分类的列表68</li>
      <li>分类的列表69</li>
      <li>分类的列表70</li>
      <li>分类的列表71</li>
      <li>分类的列表72</li>
      <li>分类的列表73</li>
      <li>分类的列表74</li>
      <li>分类的列表75</li>
      <li>分类的列表76</li>
      <li>分类的列表77</li>
      <li>分类的列表78</li>
      <li>分类的列表79</li>
      <li>分类的列表80</li>
      <li>分类的列表81</li>
      <li>分类的列表82</li>
      <li>分类的列表83</li>
      <li>分类的列表84</li>
      <li>分类的列表85</li>
      <li>分类的列表86</li>
      <li>分类的列表87</li>
      <li>分类的列表88</li>
      <li>分类的列表89</li>
      <li>分类的列表90</li>
      <li>分类的列表91</li>
      <li>分类的列表92</li>
      <li>分类的列表93</li>
      <li>分类的列表94</li>
      <li>分类的列表95</li>
      <li>分类的列表96</li>
      <li>分类的列表97</li>
      <li>分类的列表98</li>
      <li>分类的列表99</li>
      <li>分类的列表100</li>
    </ul>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBarToo from "../../components/common/navbartoo/NavBarToo";
  import BScroll from 'better-scroll'
  import {backTopMixin} from "common/mixin";

  export default {
    name: "Category",
    data(){
      return {
      scroll: null
      }
    },
    mixins: [backTopMixin],
    components: {
      NavBarToo
    },
    created(){
      //new BScroll(document.querySelector('.content'))
      /*this.scroll = new BScroll(this.$refs.aaa,{
      })*/
    },
    mounted(){
      /*this.scroll = new BScroll(this.$refs.aaa,{
      })*/
     /* new BScroll(document.querySelector('.wrapper'),{
      })*/
     //默认情况下BScroll是不可以实时监听滚动位置
      /*
      * probeType: 可选值：0 ，1， 2，3
      *       0：表示不侦测
      *       1: 表示非实时侦测，既屏幕滑动超过一定时间后，再派发scroll事件。
      *       2: 在屏幕滑动的过程中实时派发scroll事件, 既在手指滚动的过程中侦测，
      *            手指离开后的惯性动画滚动过程中不侦测.
      *       3: 不仅在屏幕滑动的过程中，而且在滚动动画运行过程中实时派发scroll 事件.
      * */
     this.scroll = new BScroll('.wrapper',{
       probeType: 3,
       pullUpLoad: true
     });
      this.scroll.on('scroll', (position) => {
        //console.log(position);
      });
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
        // 发送网络请求，请求更多页数据；
        // 等数据请求完成，并且将新的数据展示出来后,必须再调用下面函数
        setTimeout(() => {
          this.scroll.finishPullUp();
        },2000)
      });
    },
    methods: {
      click(){
        console.log('heoll');
      }
    }
  }
</script>

<style scoped>
.category-nav{
  background-color: var(--color-tint);
  color: #fff;
}
.wrapper{
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>
