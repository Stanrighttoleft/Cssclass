<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/navbar.vue'
import nextTick from './components/nextTick.vue';

</script>

<template>
  <main>
     
    <Navbar/>
    <RouterView />
    <nextTick/>

  </main>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>