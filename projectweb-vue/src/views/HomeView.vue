<script setup>
import openBanner from "@/components/openBanner.vue";
import ImageCard from "@/components/image-card.vue";
import { ref,inject,onMounted, onBeforeUnmount } from "vue";
import { useUIStore } from "@/stores/uiStore";
import ProductShow from "@/components/ProductShow.vue";
import News from "@/components/news.vue";
import AboutUs from "@/components/AboutUs.vue";
import Footer from "@/components/Footer.vue";
import Shipment from "@/components/Shipment.vue";
import OpeningTheme from "@/components/OpeningTheme.vue";


// use the uistore
const uiStore=useUIStore();
</script>
<template>
  
  <div class="homeview">
    <!-- only mount OpeningTheme once -->
    <OpeningTheme v-if="!uiStore.openingFinished" />
    
    <openBanner class="openbanner" />
    <ProductShow :productsList="list" />
    <News />
    <AboutUs />
    <shipment />

    <!-- <ImageCard :visibleNumber="6" :getImages="getImages"/> -->
  </div>

</template>

<style>
.homeview {
  overflow-x: hidden;
}
.openbanner {
  margin-top: 80px;
}
</style>
