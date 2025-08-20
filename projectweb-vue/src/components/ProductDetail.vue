<template>
  <div>
    <h1>{{ product.id }}</h1>
    <p>{{ product.price }}</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";

const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const { fetchProduct } = productStore;

const route = useRoute();
const productId = route.params.id;

onMounted(async () => {
  await fetchProduct(productId);
  console.log("product in component:", product.value);
});
watch(product, (newVal) => {
  console.log("products updated:", newVal);
});
</script>

<style></style>
