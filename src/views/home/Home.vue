<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BScoll from "better-scroll";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata} from "@/network/home";
import {getHomeGoods} from "@/network/home";



export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BScoll,
    Scroll,
    BackTop
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType:'pop',
      isShowBackTop:true
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1:请求多个数据
    this.getHomeMultidata();

    //2:请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    loadMore(){
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },

    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000

    },

    backClick(){
      this.$refs.scroll.scrollTo(0,0,600);
    },

    //事件监听相关的方法
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
}

.home-nav{
  background-color: #ff8198;
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  /*height: calc(100% - 98px);*/
  /*margin-top: 44px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;


}

</style>
