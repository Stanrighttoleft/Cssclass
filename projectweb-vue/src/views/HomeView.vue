<script setup>
import openBanner from '../components/openBanner.vue'; 
import ImageCard from '../components/image-card.vue';
import { ref } from 'vue';

const name=ref('');
const list=ref([
  {name:'billy',age:25}
]);
const add=()=>{
  list.value.push({
    name:name.value,
    age:age.value,
  })
}
const remove=()=>{
  list.value.splice(index,1);
}

const images = [
  { src: '/assets/1.jpg', name: 'Image 1' },
  { src: '/assets/2.jpg', name: 'Image 2' },
  { src: '/assets/3.jpg', name: 'Image 3' },
  { src: '/assets/4.jpg', name: 'Image 4' },
  { src: '/assets/5.jpg', name: 'Image 5' },
  { src: '/assets/6.jpg', name: 'Image 6' },
];

</script>



<template>
  
  <main>
    <openBanner/>
         
    <ImageCard :imageList="images" :visibleNumber="6" />

    <div class="text-primary">
      name: <input type="text" v-model="name">
      age: <input type="text" v-model="age">
      <button v-on:click="add">add</button>
      <br><br>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          name:{{ item.name }}
          age:{{ item.age }}
          <button v-on:click="remove(index)">delete</button>

        </li>
      </ul>
    </div>
    
  </main>
</template>
