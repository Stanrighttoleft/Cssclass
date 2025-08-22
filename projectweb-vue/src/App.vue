<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/navbar.vue'
import NewNavbar from '@/components/NewNavbar.vue';
import Footer from './components/Footer.vue';


</script>

<template>
  <main >
    <NewNavbar/>
     
    <!-- <Navbar/> -->
    <RouterView />
    <Footer/>

    
    

  </main>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>