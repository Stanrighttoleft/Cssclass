<template>
  <div class="container-fluid p-0 m-0 fixed-top test">
    <div class="row bg-secondary p-0 m-0">
      <div class="col-xxl-1 offset-xxl-2 col-2">
        <RouterLink to="/" class="text-danger"
          ><img :src="logo" alt="" class="img-fluid logo"
        /></RouterLink>
      </div>
      <div class="right-top col-xxl-7 col-10 flex-column p-0 m-0">
        <div class="row p-0 m-0">
          <div class="col-7 d-none d-lg-flex justify-content-end p-0 m-0">
            <img class="facebook" :src="facebook" alt="" />
            <RouterLink to="/likeus"><span class="text-light d-none d-md-inline">關注我們</span></RouterLink>
            <motion.img
              :src="like"
              :initial="{
                scale: 1,
              }"
              :whileInView="{
                scale: [1, 2, 1],
              }"
              alt=""
              class="like"
            ></motion.img>
          </div>
          <div class="d-none d-lg-flex col-5 justify-content-end pe-3 m-0">
            <RouterLink to="/login">
              <img :src="login" alt="" class="login" /><span
                class="text-light d-none d-lg-inline"
                >會員登入</span
              >
            </RouterLink>
            <RouterLink to="/cart">
              <img :src="cart" alt="" class="cart" /><span
                class="text-light d-none d-lg-inline"
                >購物車</span
              >
            </RouterLink>
            <img :src="searchIcon" alt="" class="search-icon" /><span
              class="text-light d-none d-lg-inline"
              >查找商品</span
            >
          </div>
        </div>
        <div
          class="navbarlist col-sm-12 d-none d-lg-flex justify-content-end align-items-center pe-3 m-0 mt-2"
        >
          <ul class="navbarlistul">
            <li v-for="(item, index) in link" :key="index">
              <RouterLink
                :to="item.goTo"
                :class="[
                  isActiveLink(item.goTo) ? 'active' : '',
                  'navlink',
                  'px-3',
                  'pb-3',
                  'pt-2',
                  'thelink',
                  'border-box',
                ]"
                ><i class="pi pi-spin pi-chevron-circle-left"></i
                >{{ item.name }}</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { motion } from "motion-v";

const name = ref("Navbar");
const logo = ref("./assets/logov12.png");
const facebook = ref("./assets/facebook.png");
const like = ref("./assets/like.png");
const login = ref("./assets/user.png");
const searchIcon = ref("./assets/search.png");
const cart = ref("./assets/cart.png");
const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

const link = ref([
  {
    name: "團購首頁",
    goTo: "/",
  },
  {
    name: "購貨須知",
    goTo: "/memo",
  },
  {
    name: "商品瀏覽",
    goTo: "/products",
  },
  {
    name: "聯絡我們",
    goTo: "/contact",
  },
]);
</script>
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}
.test {
  height: 100px;
}

.nav-top {
  background-color: rgb(240, 186, 9);
}
.facebook {
  height: 30px;
  margin: 0 5px;
}
.like {
  height: 30px;
  margin: 0 5px;
}
.login {
  height: 30px;
  margin: 0 5px;
}
.search-icon {
  height: 30px;
  margin: 0 5px;

  width: auto;
  display: inline-block;
}
.cart {
  height: 30px;
  margin: 0 5px;
}
.search-put {
  width: 200px;
  height: 30px;
  margin-left: 8px;
}
.navbatlist {
  height: 75px;
}
.navbarlist ul {
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  gap: 1rem;
  margin-left: auto;
}
.navbarlist li {
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
.logo {
  max-height: 90px;
  max-width: 100px;
}
.active {
  border-radius: 10% 10% 10% 10%;
  background-color: rgb(12, 120, 12);
}
.thelink:hover {
  text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.6);
}
</style>
