<template>
    <div class="nav">
        <div class="logo">
            <img :src="logo" alt="" width="40">
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
            logo:'/favicon.ico',
            link:['Home', 'About', 'Products', 'Contact Us'],

        };
    }
    
}

</script>
<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
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
  height: 40px;
}
</style>