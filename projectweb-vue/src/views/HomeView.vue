<script setup>
import openBanner from '../components/openBanner.vue'; 
import ImageCard from '../components/image-card.vue';
import { ref } from 'vue';

const getImages= ref([
        { src: './assets/1.jpg', name: 'Image 1' },
        { src: '/assets/2.jpg', name: 'Image 2' },
        { src: '/assets/3.jpg', name: 'Image 3' },
        { src: '/assets/4.jpg', name: 'Image 4' },
        { src: '/assets/5.jpg', name: 'Image 5' },
        { src: '/assets/6.jpg', name: 'Image 6' },
      ]);

</script>



<template>
  
  <main>
    <openBanner/>
         
    <ImageCard :visibleNumber="6" :getImages="getImages"/>

   
    
  </main>
</template>
