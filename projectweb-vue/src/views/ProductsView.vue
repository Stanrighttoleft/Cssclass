<template>
    <div class="container-fluid">
        <div class="row">
            <ProductShow :productsList="list"/>
            <div class="col-md-5"><Sidecollapse /></div>
            <div class="col-md-7"><productPage /></div>
            
        </div>
    </div>
    


   
  
</template>

<script setup>
import product from '@/components/product.vue';
import ProductShow from '@/components/ProductShow.vue';
import Sidecollapse from '@/components/Sidecollapse.vue';
import productPage from '@/components/productPage.vue';
import { ref } from 'vue';

const list=ref([{
    id:1,
    category:'雜貨',
    name:'澳洲的土',
    image:'./assets/1.jpg',
    price:1200,
    topsale:true,
    latest:true,


},{
    id:2,
    category:'雜貨',
    name:'澳洲的水',
    image:'./assets/2.jpg',
    price:1200,
    topsale:false,
    latest:true,

},{
    id:3,
    category:'雜貨',
    name:'澳洲的空氣',
    image:'./assets/3.jpg',
    price:1200,
    topsale:true,
    latest:true,


},{
    id:4,
    category:'雜貨',
    name:'澳洲的空氣',
    image:'./assets/4.jpg',
    price:1200,
    topsale:true,
    latest:true,


},{
    id:5,
    category:'雜貨',
    name:'澳洲的空氣',
    image:'./assets/5.jpg',
    price:1200,
    topsale:true,
    latest:true,


},{
    id:6,
    category:'雜貨',
    name:'澳洲的空氣',
    image:'./assets/6.jpg',
    price:1200,
    topsale:true,
    latest:true,

}
])


</script>


<style>

</style>
