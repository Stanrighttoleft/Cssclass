<template>
    <div class="bg-warning test container-fluid p-2 " >
        <div class="row row-cols-1 row-cols-md-2 g-2">
            <div class="col">
                <div class="card">
                    <img src="" alt="" class="card-img-top">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">supporttext</p>
                </div>
                
            </div>

        </div>
    </div>
  
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/productStore';

</script>

<style>
.test{
    background-size: contain;
    width: 100%;
    height: 100%;
}

</style>