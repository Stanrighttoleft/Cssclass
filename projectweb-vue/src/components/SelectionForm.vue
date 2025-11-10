<template>
<div class="form">
   
  <div>
    <select name="" id="" v-model="selectedCata">
      <option value="" selected hidden disabled >請選擇類別</option>
      <option :value=item.name v-for="item, index in cakeList" :key="index">{{ item.name }}</option>
    </select>
    <hr>
    <select name="" id="" v-model="selectedProdt">
      <option value="" selected hidden disabled >請選擇產品</option>
      <option :value=prodt.name v-for="prodt, index in currentList" :key="index">{{prodt.name}}</option>
    </select>
    <button class="btn btn-warning ms-3" @click="addItem()">加入購物</button>
  </div>
  <hr>
  <ul>
    <li v-for="item, index in cartList" :key="index">{{ item.name }}-{{ item.price }}</li>
  </ul>
  
</div>

</template>

<script setup>
import { ref, watch } from "vue";


const cakeList=ref([
  { name:"麵包",
    sub:[
      {name:'肉鬆麵包', price:10},
      {name:'夾心麵包', price:20},
      {name:'可頌',price:30}
    ]
  },
  { name:"蛋糕",
    sub:[
      {name:'黑森林蛋糕', price:10},
      {name:'乳酪蛋糕', price:20},
      {name:'起司蛋糕', price:30}
    ]
  }
])
const selectedCata=ref("");
const currentList=ref([]);
const selectedProdt=ref("");
const cartList=ref([]);
const product=ref([]);

function addItem(){
   product.value=currentList.value.find(p=>p.name===selectedProdt.value);
  if(product){
    cartList.value.push(product.value);
  }
}


watch(
  selectedCata,
  (newvalue)=>{    
    if(!newvalue){
      currentList.value=[];
    }else{
      const tempList=cakeList.value.find((a)=>a.name==newvalue);
      currentList.value=tempList ?tempList.sub : [];
    }
  }
)

</script>
