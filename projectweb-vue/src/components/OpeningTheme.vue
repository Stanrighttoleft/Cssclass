<template>
  <div v-if="isVisible" class="opening-theme">
    <!-- Animation content -->
     
      
     <div class="spinner"></div>
    
    
    <img :src=openRabbit class="rabbit" alt="">

  </div>
</template>

<script setup>
import {ref,onMounted} from "vue";
import { useUIStore } from "@/stores/uiStore";
// use the Uistore
const uiStore=useUIStore();

const openRabbit="/assets/smilerabbit.png";
const isVisible=ref(true);

onMounted(()=>{
  setTimeout(()=>{
    uiStore.openingFinished=true;
    uiStore.showNavbar=true;
  },2000)
});
</script>

<style scoped>
.opening-theme{
  position: fixed;
  inset:0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadeOut 1s ease forwards;
  animation-delay:1.8s;
}
/* Spinner like FontAwesome */
.spinner {
  position: absolute;
  width: 400px;
  height: 400px;
  border: 8px solid rgba(255, 255, 255, 0.1); /* faded border */
  border-top-color: #fff; /* only top is visible */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Rabbit on top */
.rabbit {
  position: relative;
  width: 200px;
  height: 200px;
  z-index: 1;
}


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes fadeOut{
  to{
    opacity: 0;
    visibility: hidden;
  }
}

</style>