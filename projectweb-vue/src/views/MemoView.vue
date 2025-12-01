<template>
  <div class="about">
    <Carousel
      class="carousel mt-5"
      v-slot="{ currentSlide }"
      :navigation="true"
      :pagination="true"
      :timeout="5000"
      :startAutoPlay="true"
      :slide-count="carouselSlides.length"
    >
      <Slide v-for="(slide, index) in carouselSlides" :key="index">
        <div v-show="currentSlide === index + 1" class="slide-info">
          <h1 class="position-absolute text-white" style="top: 60%; left: 20%">
            {{ slide.line }}
          </h1>
          <img :src="`./assets/${slide.name}.jpg`" alt="" class="img-fluid" />
        </div>
      </Slide>
    </Carousel>
    <FeatherEffect />
  </div>
</template>

<script setup>
import Carousel from "@/components/Carousel.vue";
import Slide from "@/components/Slide.vue";
import FeatherEffect from "@/components/FeatherEffect.vue";
import { ref } from "vue";

const name = "about";
const carouselSlides = ref([
  { name: "p11", line: "依照你的訂單在澳洲最可靠的商家進行採買" },
  { name: "p12", line: "不同的產品用最合適最用心的方式去打包" },
  { name: "p13", line: "配合安全的物流讓您的商品維持最佳品質" },
  { name: "p14", line: "根據當地以及澳洲法規去做調整讓你的商品不卡關" },
  { name: "p15", line: "在地物流直送到您手上" },
]);
</script>

<style>
.carousel {
  position: relative;
  width: 100%;
  height: 100vh;
}
.slide-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  height: 100%;
}
.slide-info img {
  min-width: 100%;
  height: 100%;
  object-fit: cover;
}
.about {
  height: 100vh;
  background-color: black;
}
</style>
