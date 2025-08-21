<template>
    <div class="container-fluid productdetail">
        <h1>{{ product.title }}</h1>
        <h2>{{ product.id }}</h2>
        <p>{{ product.price }}</p>
    </div>
    
  
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed, watch } from 'vue';

const productStore=useProductStore()
const {product}=storeToRefs(productStore);
// const {fetchProducts}=productStore;
const {fetchProduct}=productStore;


const route=useRoute();
const productId=route.params.id;

onMounted(async()=>{
    await fetchProduct(productId);
    console.log("product in component:", product.value)
})
watch(product,(newVal)=>{
    console.log("products updated", newVal);
})


</script>

<style>
.productdetail{
    height: 100vh;
    width: 100%;
    margin-top: 100px;
}

</style>