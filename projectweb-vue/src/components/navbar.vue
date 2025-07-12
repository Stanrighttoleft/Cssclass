<template>
    <div class="navbar bg-warning">
        <div class="logo">
            <img :src="logo" alt="" class="w-100">
        </div>
        <div class="navlist">
            <ul>
                <li 
                v-for="(item,index) in link"
                :key="index"
                >{{ item }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default{
    name:'Navbar',
    data(){
        return{
            logo:'./assets/logov2.png',
            link:['Home', 'About', 'Products', 'Contact Us'],

        };
    }
    
}

</script>
<style >
body, html {
  margin: 0;
  padding: 0;
}
.navbar {
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
li {
  cursor: pointer;
}
.logo img {
  height: 100px;
  width: auto;
}
</style>