<template>
  <div class="container-fluid productview">
    <div class="row">
      <NewProductPage/>
      <!-- <div class="col-md-3 d-none d-md-flex sidebar"><Sidecollapse /></div>
      <div class="col-12 col-md-9 productpage"><productPage /></div> -->
      <!-- <ProductShow :productsList="list" /> -->
    </div>
  </div>
</template>

<script setup>
import ProductShow from "@/components/ProductShow.vue";
import Sidecollapse from "@/components/Sidecollapse.vue";
import productPage from "@/components/productPage.vue";
import { ref } from "vue";
import Footer from "@/components/Footer.vue";
import NewProductPage from "@/components/NewProductPage.vue";

const list = ref([
  {
    id: 1,
    category: "雜貨",
    name: "澳洲的土",
    image: "./assets/1.jpg",
    price: 1200,
    topsale: true,
    latest: true,
  },
  {
    id: 2,
    category: "雜貨",
    name: "澳洲的水",
    image: "./assets/2.jpg",
    price: 1200,
    topsale: false,
    latest: true,
  },
  {
    id: 3,
    category: "雜貨",
    name: "澳洲的空氣",
    image: "./assets/3.jpg",
    price: 1200,
    topsale: true,
    latest: true,
  },
  {
    id: 4,
    category: "雜貨",
    name: "澳洲的空氣",
    image: "./assets/4.jpg",
    price: 1200,
    topsale: true,
    latest: true,
  },
  {
    id: 5,
    category: "雜貨",
    name: "澳洲的空氣",
    image: "./assets/5.jpg",
    price: 1200,
    topsale: true,
    latest: true,
  },
  {
    id: 6,
    category: "雜貨",
    name: "澳洲的空氣",
    image: "./assets/6.jpg",
    price: 1200,
    topsale: true,
    latest: true,
  },
]);
</script>

<style scoped>
.productview {
  overflow-x: hidden;
  margin-top: 150px;
}

</style>    