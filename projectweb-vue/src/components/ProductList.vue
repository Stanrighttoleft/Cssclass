<template>
  <div>
    <h2>Products</h2>
    <ul>
        <li v-for="product in products" :key="product.id">
            {{ product.title }} - ${{ product.price }}
        </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

const {products, fetchProducts} =useProductStore();

onMounted(()=>{
    fetchProducts()
})
</script>

<style>

</style>