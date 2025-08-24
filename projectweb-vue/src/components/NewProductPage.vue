<script setup>
import { onMounted, ref, nextTick, watch, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { motion } from 'motion-v'
import { RouterLink } from 'vue-router'

const productStore=useProductStore();
const {products}=storeToRefs(productStore);
const {fetchProducts}=productStore;

const selectedOption=ref("pricehigh");
const hot=ref("/assets/hot.png")
const sortedProducts=computed(()=>{
    if(!products.value) return [];

    switch (selectedOption.value){
        case "pricehigh":
            return [...products.value].sort((a,b)=>b.price - a.price);
        case "pricelow":
            return [...products.value].sort((a,b)=>a.price - b.price);
        case "hot":
            return [...products.value].sort((a,b)=>{
                return (b.bestsell===true)-(a.bestsell===true)
            });
        default:
            return price.value;
    }
})

const menus = ref([
  {
    title: '品項選擇',
    expanded:false,
    children: [
      '生活五金',
      '保養品',
      '戶外用品',
    ]
  },
  {
    title: '品牌選擇',
    expanded: false,
    children: [
      'Life Space',
      'Unichi Rosa',
      '私密生活',
      '健康零嘴',
      '美妝保養',
      '居家/生活',
      '母嬰兒童',
      '生活/玩具',
      '流行時尚',
      '寵物用品',
      '家電家具',
      '特惠專購'
    ]
  },
  {
    title: '航太超跑',
    expanded:false,
    children: []
  },
  {
    title: '委託代購',
    expanded:false,
    children: []
  },
  {
    title: '代購試算',
    expanded:false,
    children: []
  }
])



function toggleMenu(index) {
  menus.value[index].expanded = !menus.value[index].expanded
}
onMounted(async () => {
  await fetchProducts();
  console.log("products in component:", products.value);
});
watch(products, (newVal) => {
  console.log("products updated:", newVal);
});

</script>

<template>
  <div class=" container-fluid productpage  ">
    <div class="row  ">
      <div class="col-xxl-2 offset-xxl-2 col-sm-3 flex-column align-items-start ">
        <div
          v-for="(menu, index) in menus"
          :key="index"
          class="menu-item "
        >
          <div class="menu-header" @click="toggleMenu(index)">
           <i 
           class="demoicon pi pi-angle-right"
           :class="{rotated:menu.expanded}"
           ></i>  {{ menu.title }}
          </div>
    
          <motion.ul v-if="menu.children && menu.expanded" class="submenu"
          
          :initial="{opacity:0,}"
          :animate="{
            
            y:0,
            opacity:1,
            transition:{
              duration:1,
              
            }
          }"
          >
            <li 
            v-for="(child, i) in menu.children" :key="i"
            
            >
              <input type="checkbox" class="me-2">{{ child }}
            </li>
          </motion.ul>
        </div>
      </div>
      <div class="col-xxl-6 col-sm-9">
            <div>
                <label for="selector" class="form-label" 
                >篩選產品：</label>
                <select id="selector" class="form-select"
                v-model="selectedOption">
                <option value="pricehigh">價高優先</option>
                <option value="pricelow">價低優先</option>
                <option value="hot">人氣度</option>
                </select>
            </div>
            <hr />
            <div class="row d-flex g-1">
            
              <div
                  v-for="product in sortedProducts"
                  :key="product.id"
                  class="col-md-3 col-sm-4 col-6 position-relative"
              >
              <RouterLink :to="`/products/${product.id}`">
                  <div>
                    <img
                        :src="product.image"
                        alt="product.title"
                        class=""
                        style="height: 110px; width: 120px"
                    />
                    <img  v-if="product.bestsell" class="position-absolute top-0 start-0" :src="hot" alt="">
                    </div>
                  <div class="m-0 p-0">
                    <p class="">{{ product.title }}</p>
                  </div>
                  <div class="m-0 p-0">
                    <p class="">TWD: {{ product.price }}</p>
                  </div>
                  </RouterLink>
              </div>
  
            
        </div>
    </div>
    
        
    </div>
  </div>
</template>

<style scoped>
.productpage{
  height: 100vh;
}
.sidebar {
  width: 250px;
  margin-left: 5px;
  margin-top: 10px;
  padding-left: 0;
 
  background: #fff;
  font-size: 14px;
}

.menu-header {
  
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  border:1px dotted black
  
}
.submenu {
  list-style: none;
  padding-left: 15px;
  margin: 0;
}
.submenu li {
  padding: 8px 10px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}
.demoicon{
  font-size: 1rem;
  color: black;
}
.demoicon.rotated{
  transform:rotate(90deg);
}
.test {
  background-size: contain;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
</style>