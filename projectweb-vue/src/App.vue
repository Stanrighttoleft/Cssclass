<script setup>
import { RouterLink, RouterView } from 'vue-router'

import ImageCard from './components/image-card.vue'
import Navbar from './components/navbar.vue'
import nextTick from './components/nextTick.vue';

const images = [
  { src: '/assets/1.jpg', name: 'Image 1' },
  { src: '/assets/2.jpg', name: 'Image 2' },
  { src: '/assets/3.jpg', name: 'Image 3' },
  { src: '/assets/4.jpg', name: 'Image 4' },
  { src: '/assets/5.jpg', name: 'Image 5' },
];
</script>

<template>
       <nav>
        <Navbar/>
        <RouterLink to="/" class="text-danger">Home</RouterLink>
        <RouterLink to="/about" class="text-danger">About</RouterLink>
      </nav>
    
    <ImageCard :imageList="images" :visibleNumber="5" />
    <nextTick/>
  

  <RouterView />
</template>

<style>
</style>