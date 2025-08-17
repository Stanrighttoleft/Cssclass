<template>
  <div class="test container-fluid p-2">
    <div class="row">
      <label for="selector" class="form-label">篩選產品：</label>
      <select id="selector" class="form-select">
        <option value="pricehigh">價高優先</option>
        <option value="pricelow">價低優先</option>
        <option value="hot">人氣度</option>
      </select>
    </div>
    <hr />
    <div class="row d-flex">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-md-3 col-12"
      >
        <div class="">
          <img
            :src="product.image"
            alt="product.title"
            class=""
            style="height: 110px; width: 120px"
          />
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
import { onMounted, ref, watch } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const { fetchProducts } = productStore;

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
