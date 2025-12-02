<template>
  <div class="productdetail">
    <ProductDetail />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import ProductDetail from "@/components/ProductDetail.vue";

const route = useRoute();
const productId = route.params.id;
</script>

<style scoped>
.productdetail {
  margin-top: 120px;
  height: 120vh;
}
</style>
