<template>
    <div class="nav bg-warning">
        <div class="logo">
            <RouterLink to="/" class="text-danger"><img :src="logo" alt="" class="w-100"></RouterLink>
        </div>
        <div class="navlist">
            <ul>
                <li 
                v-for="(item,index) in link"
                :key="index"
                ><RouterLink :to=item.goTo class="navlink">{{ item.name }}</RouterLink></li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const name=ref('Navbar');
const logo=ref('./assets/logov12.png');
const link=ref([{
        name:'Home',
        goTo:'/',

    },
    {
        name:'About',
        goTo:'/about',
    },
    {
        name:'Products',
        goTo:'/products',

    },{
        name:'Contact Us',
        goTo:'/contact',
    }])
      
    
</script>
<style >
body, html {
  margin: 0;
  padding: 0;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width:100%;
  box-sizing: border-box;
}
.navlist ul{
    display: flex;
    list-style: none;
    justify-content: space-evenly;
    gap: 1rem;
   
}
.navlist li{
    margin-right: 2rm;
}
.navlink {
   
    cursor: pointer;
    color: white;
    text-decoration: none;
    font-size: 1.3rem;
    font-family: "Alata", sans-serif;
    font-weight: 400;
    font-style: normal;
 
}
.logo img {
  height: 120px;
  width: 120px;
}

</style>