<template>
  <div class="test container-fluid p-2">
    <div class="row">
      <label for="selector" class="form-label" 
      >篩選產品：</label>
      <select id="selector" class="form-select"
      v-model="selectedOption">
        <option value="pricehigh">價高優先</option>
        <option value="pricelow">價低優先</option>
        <option value="hot">人氣度</option>
      </select>
    </div>
    <hr />
    <div class="row  g-1">
      <div
        v-for="product in sortedProducts"
        :key="product.id"
        class="col-md-3 col-12 position-relative"
      >
        <div>
          <img
            :src="product.image"
            alt="product.title"
            class=""
            style="height: 110px; width: 120px"
          />
          <img  v-if="product.bestsell" class="position-absolute top-0 start-0" :src="hot" alt="">
        </div>
        <div class="m-0 p-0">
          <p class="">{{ product.title }}</p>
        </div>
        <div class="m-0 p-0">
          <p class="">TWD: {{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const { fetchProducts } = productStore;

const selectedOption=ref("pricehigh");
const hot=ref("/assets/hot.png")
const sortedProducts=computed(()=>{
    if(!products.value) return [];

    switch (selectedOption.value){
        case "pricehigh":
            return [...products.value].sort((a,b)=>b.price - a.price);
        case "pricelow":
            return [...products.value].sort((a,b)=>a.price - b.price);
        case "hot":
            return [...products.value].sort((a,b)=>{
                return (b.bestsell===true)-(a.bestsell===true)
            });
        default:
            return price.value;
    }
})

onMounted(async () => {
  await fetchProducts();
  console.log("products in component:", products.value);
});

watch(products, (newVal) => {
  console.log("products updated:", newVal);
});
</script>

<style scoped>
.test {
  background-size: contain;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
</style>