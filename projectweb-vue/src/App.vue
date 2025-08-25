<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/navbar.vue'
import NewNavbar from '@/components/NewNavbar.vue';
import Footer from './components/Footer.vue';
import { ref } from 'vue';
import { useCartStore } from './stores/cartStore';

const cartStore=useCartStore();

const carticon=ref('/assets/carticon.png')


</script>

<template>
  <main class="position-relative" >
    <RouterLink to="/cart"> <button class="position-fixed rounded-circle bg-light" id="cartbutton"><img :src="carticon" alt="" class="" id="carticon"><span class="cart-badge" v-if="cartStore.totalQuantity > 0">{{ cartStore.totalQuantity }}</span>
    </button></RouterLink>
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
#carticon{
  width: 60px;
  height: 60px;
  

}
#cartbutton{
  border: 0;
  width: 90px;
  height: 90px;
  left: 10%;
  top: 80%;
  z-index: 5;
}
.cart-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  z-index: 6;
  display: inline-block;
}


</style>