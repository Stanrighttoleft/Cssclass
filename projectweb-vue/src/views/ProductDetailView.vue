<template>
    <div class="productdetail">
        <h1>Product Details</h1>
        <p>Product ID: {{ productId }}</p>
        <ProductDetail/>
    </div>
  
</template>

<script setup>
import { useRoute } from 'vue-router';
import ProductDetail from '@/components/ProductDetail.vue';


const route=useRoute()
const productId=route.params.id

</script>

<style>
.productdetail{
    margin-top: 100px;
    height: 100vh;
}

</style>