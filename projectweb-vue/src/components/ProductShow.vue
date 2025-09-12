<template>
     
      <div class="container-fluid shows  m-3 p-2 productShow overflow-hidden position-relative scroll-wrapper  "  >
        <div ref="productDiv" class="d-flex flex-row flex-nowrap overflow-hidden product-row position-relative">
          <motion.div
            v-for="product in filteredAndSortedProducts"
            :key="product.id"
            class="mx-2 position-relative bg-light rounded-3"
            style="min-height:280px; width:200px;"
            :initial="{opacity:1}"
            :while-hover="{opacity:0.6, transition:{duration:1}}"
          >
            <RouterLink :to="`/products/${product.id}`">
              <div 
              class="text-center bg-light rounded-3 "
              
              >
                <img
                  :src="product.image"
                  alt="product.title"
                  class=""
                  style="height: 150px; width: 160px"
                />
                <img
                  v-if="isHot(product)"
                  class="position-absolute top-0 start-0"
                  :src="hot"
                  alt=""
                />
              </div>
              <div class="bg-light rounded-3">
                <div class="d-flex text-wrap"
                style="width: 200px;"
                >
                  <p class="bg-light rounded-3 m-1 info">{{ product.title }}</p>
                </div>
                <div class="bg-light rounded-3 m-1 ">
                  <p class="">TWD: {{ product.price }}</p>
                </div>
              </div>
            </RouterLink>
          </motion.div>
        </div>
        <!-- Navigation -->
        <div class="navigation position-absolute d-flex start-0 end-0 justify-content-between px-1 " >
            <div class="navPrev col-2">
              <img 
              class="productBun"  @mousedown="startScroll('prev')"
              @mouseup="stopScroll"
              @mouseleave="stopScroll" :src="prevBun" alt="">
            </div>
            <div class="navNext d-flex justify-content-end  col-10">
              <img 
              class="productBun"
              @mousedown="startScroll('next')"
              @mouseup="stopScroll"
              @mouseleave="stopScroll" :src="nextBun" alt="">

            </div>

          </div>
        
      </div>

   
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import { RouterLink, useRoute } from 'vue-router';
import { motion } from 'motion-v';


const hot=ref('/assets/hot.png');
const prevBun=ref('/assets/left.png');
const nextBun=ref('/assets/right.png');
const productDiv=ref(null);
const scrollInterval=ref(null);
const scrollAmount=4000;
const route=useRoute();
const productStore=useProductStore();
const {products}=storeToRefs(productStore);
const {fetchProducts}=productStore;

const filteredAndSortedProducts = computed(() => {
  if (!products.value) return [];
  
  return products.value
    .filter(product => product ) //  filter && product.bestsell==='1'
    .sort((a, b) => b.id - a.id); // Example sort (latest first)
});

const isHot = (product) =>
  product.bestsell === true ||
  product.bestsell === 1 ||
  product.bestsell === "1";


const startScroll=(direction)=>{
  if(!productDiv.value) return;


  scrollInterval.value=setInterval(()=>{
    productDiv.value.scrollBy({
      left:direction==='next' ? scrollAmount /1 : -scrollAmount /1, behavior:'smooth'
  })
},50);
};

const stopScroll=()=>{
  clearInterval(scrollInterval.value);
  scrollInterval.value=null;
}

onMounted(() => {
  const width = productDiv.value.offsetWidth;
  console.log('Width:', width);


  const rect = productDiv.value.getBoundingClientRect();
  console.log('Width from getBoundingClientRect:', rect.width);
});

onMounted(async () => {
  await fetchProducts();
  console.log("products in component:", products.value);
});
watch(products, (newVal) => {
  console.log("products updated:", newVal);
});

const props=defineProps({
  productsList:
  {
    type:Array,
    default:'',
  },

})



</script>

<style scoped>

.productcard{
  width:330px;
  height: 300px;
}
.productimage{
  width:300px;
  height: 200px;
}
.productBun{
  height: 40px;
  cursor: pointer;
}

.shows{
  max-width: 99%;
  height: 300px;
  /* background-color: rgba(116, 124, 8, 0.548); */
}
.list{
  max-width: 100%;
}
.navigation{
  bottom: 50%;
}
.scroll-wrapper{
  white-space: nowrap;
  scroll-behavior: smooth;
}
.info{
  font-family: '標楷體';
  font-size: large;
}

</style>