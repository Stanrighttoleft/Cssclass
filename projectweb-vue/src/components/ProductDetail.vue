<template>
    <div>test</div>
  
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed, watch } from 'vue';

const productStore=useProductStore()


const route=useRoute();
const productId=route.params.id;


</script>

<style>

</style>