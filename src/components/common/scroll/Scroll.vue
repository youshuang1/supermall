<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>

</template>

<script>
import BScroll from "better-scroll"

export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  components:{
    BScroll
  },
  data(){
      return{
          scroll:null,
        message:'hahahahah'
      }
  },
  mounted(){
    //1：创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType
    });

    //2:监听滚动位置
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    });


  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    }
  }

}
</script>

<style>

</style>
