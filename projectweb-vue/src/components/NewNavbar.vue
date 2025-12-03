<template>
  <div class="row bg-secondary p-0 m-0">
    <div class="col-lg-1 col-xxl-1 col-2">
      <RouterLink to="/" class="text-danger"
        ><img :src="logo" alt="" class="img-fluid logoimage"
      /></RouterLink>
    </div>
    <div class="col-lg-11 col-10 flex-column m-0" style="padding-left: 10px">
      <div class="row p-0 m-0 rightTop">
        <div
          class="col-4 d-none d-lg-flex justify-content-center align-items-center ps-1 m-0"
        >
          <RouterLink to="/lottery">
            <img class="facebook" :src="facebook" alt="" />
          </RouterLink>
          <RouterLink to="/likeus" class="text-decoration-none mt-0"
            ><span class="text-light d-none d-md-inline"
              >關注我們</span
            ></RouterLink
          >
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
        <div class="d-none d-lg-flex col-lg-8 justify-content-end pe-3 m-0">
          <RouterLink
            v-if="userInfo"
            :to="userInfo?.role === 'storeowner' ? '/admin' : '/member'"
            class="text-decoration-none mt-1"
          >
            <img :src="login" alt="" class="login" /><span
              class="text-light d-none d-lg-inline"
              >{{
                userInfo?.role === "storeowner" ? "管理專區" : "會員專區"
              }}</span
            >
          </RouterLink>
          <RouterLink v-else to="/login" class="mt-1 text-decoration-none">
            <img :src="login" alt="" class="login" /><span
              class="text-light d-none d-lg-inline text-decoration-none"
              >會員登入</span
            >
          </RouterLink>
          <RouterLink to="/cart" class="text-decoration-none mt-1">
            <img :src="cart" alt="" class="cart" /><span
              class="text-light d-none d-lg-inline"
              >購物車</span
            >
          </RouterLink>
          <img
            :src="searchIcon"
            alt=""
            class="search-icon"
            @click="showSearch = !showSearch"
          />
          <input
            v-if="showSearch"
            v-model="searchKeyword"
            @keyup.enter="submitSearch"
            type="text"
            placeholder="輸入商品關鍵字"
            class="form-control ms-2"
            style="width: 200px; height: 40px"
          />
        </div>
      </div>
      <div
        class="navbarlist d-none d-lg-flex justify-content-end align-items-center pe-3 m-0 mt-2"
      >
        <ul class="navbarlistul">
          <li v-for="(item, index) in link" :key="index">
            <RouterLink
              :to="item.goTo"
              :class="[
                isActiveLink(item.goTo) ? 'active' : '',
                'navlink',
                'px-1',
                'pt-2',
                'thelink',
                'border-box',
              ]"
              >{{ item.name }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { motion } from "motion-v";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const showSearch = ref(false);
const searchKeyword = ref("");
const router = useRouter();

const name = ref("Navbar");
const logo = ref("./assets/logov122.png");
const facebook = ref("./assets/facebook.png");
const like = ref("./assets/like.png");
const login = ref("./assets/user-solid-full.svg");
const searchIcon = ref("./assets/search.png");
const cart = ref("./assets/cart-shopping-solid-full.svg");
const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

console.log("userInfo:", userInfo.value);
console.log("user role:", userInfo.value?.role);

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

const submitSearch = () => {
  if (searchKeyword.value.trim() !== "") {
    router.push({
      path: "/products",
      query: { keyword: searchKeyword.value.trim() },
    });
    showSearch.value = false;
    searchKeyword.value = "";
  }
};
</script>
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}
.rightTop {
  font-size: 1.3rem;
}

.nav-top {
  background-color: rgb(240, 186, 9);
}
.facebook {
  height: 40px;
  margin: 0 5px;
}
.like {
  height: 40px;
  margin: 0 5px;
}
.login {
  height: 40px;
  margin: 0 5px;
}
.search-icon {
  height: 40px;
  margin: 0 5px;
  cursor: pointer;

  width: auto;
  display: inline-block;
}
.cart {
  height: 40px;
  margin: 0 5px;
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
.logoimage {
  min-width: 60px;
  min-height: 60px;

  object-fit: cover;
}
.active {
  border-radius: 10% 10% 0% 0%;
  background-color: rgb(12, 120, 12);
  padding-bottom: 1rem;
}
.thelink:hover {
  text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.6);
}
</style>
