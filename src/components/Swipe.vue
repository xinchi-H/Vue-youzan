<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists" :key="list.id">
        <a class="js-no-follow" v-bind:href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img" />
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
// swiper对dom节点进行操作，dom节点在生命周期（mounted）生成
import Swiper from "swiper";
import "swiper/css/swiper.css";

export default {
  name: "swipe",
  //选项 props: ['lists'],
  props: {
    lists: {
      type: Array,
      required: true
    },
    name: {}
  },
  created() {
    console.log(this.lists);
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        disableOnInteraction: false
      },
      pagination: { el: ".swiper-pagination" }
    });
  }
};
</script>

<style>
.swiper-slide img {
  height: 100%;
  width: 100%;
}
</style>