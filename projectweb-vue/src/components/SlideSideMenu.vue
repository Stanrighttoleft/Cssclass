<template>
  <div>
    <!-- Slide-out container (menu + tab) -->
    <motion.div
      class="side-wrapper"
      :animate="isOpen ? { x: 0 } : { x: -150 }"
      :transition="{ type: 'spring', stiffness: 100, damping: 20 }"
    >
      <!-- Side Menu -->
      <div class="side-menu shadow-lg bg-secondary">
        <div class="menu-content p-3">
          <div>
            <img :src="logo" style="width: 7rem" alt="" />
          </div>
          <ul class="list-unstyled text-white">
            <RouterLink
              v-if="userInfo"
              :to="userInfo.role === 'storeowner' ? '/admin' : '/member'"
              class="text-decoration-none"
            >
              <li class="text-light">
                <img :src="user" alt="" style="width: 1.5rem" />
                {{ userInfo.role === "storeowner" ? "管理專區" : "會員專區" }}
              </li>
            </RouterLink>
            <RouterLink v-else to="/login" class="text-decoration-none">
              <li class="text-light">
                <img :src="user" alt="" style="width: 1.5rem" />會員登入
              </li>
            </RouterLink>

            <RouterLink to="/" class="text-decoration-none"
              ><li class="text-white text-decoration-none">
                <img :src="home" class="mb-1" alt="" style="width: 1.5rem" />
                團購首頁
              </li></RouterLink
            >
            <RouterLink to="/memo" class="text-decoration-none"
              ><li class="text-white text-decoration-none">
                <img :src="note" class="mb-1" alt="" style="width: 1.5rem" />
                購貨須知
              </li></RouterLink
            >
            <RouterLink to="/products" class="text-decoration-none"
              ><li class="text-white text-decoration-none">
                <img :src="goods" class="mb-1" alt="" style="width: 1.5rem" />
                商品瀏覽
              </li></RouterLink
            >
            <RouterLink to="/contact" class="text-decoration-none"
              ><li class="text-white text-decoration-none">
                <img :src="contact" class="mb-1" alt="" style="width: 1.5rem" />
                連絡我們
              </li></RouterLink
            >
            <RouterLink to="/contact" class="text-decoration-none"
              ><li class="text-white text-decoration-none">
                <img :src="cart" class="mb-1" alt="" style="width: 1.5rem" />
                購物車
              </li></RouterLink
            >
          </ul>
          <hr style="color: white" />
          <ul class="list-unstyled text-white">
            <RouterLink to="/likeus" class="text-decoration-none"
              ><li class="text-white text-decoration-none">
                <img :src="draw" class="mb-1" alt="" style="width: 1.5rem" />
                兔兔抽獎
              </li></RouterLink
            >
            <RouterLink to="/lottery" class="text-decoration-none"
              ><li class="text-white text-decoration-none">
                <img
                  :src="powerball"
                  class="mb-1"
                  alt=""
                  style="width: 1.5rem"
                />
                威彩模擬
              </li></RouterLink
            >
          </ul>
        </div>
      </div>
      <!-- Tab (attached to the menu) -->
      <div
        class="side-tab d-flex align-items-center justify-content-center"
        @click="toggleMenu"
      >
        <span class="rotate-text">Menu</span>
      </div>
    </motion.div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { motion } from "motion-v";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const logo = "./assets/logov12.png";
const home = "./assets/house-solid-full.svg";
const user = "./assets/user-solid-full.svg";
const note = "./assets/clipboard-solid-full.svg";
const goods = "./assets/gift-solid-full.svg";
const contact = "./assets/tty-solid-full.svg";
const cart = "./assets/cart-shopping-solid-full.svg";
const draw = "./assets/dragon-solid-full.svg";
const powerball = "./assets/money-bills-solid-full.svg";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
<style scoped>
/* Wrapper that slides (menu + tab) */
.side-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 230px; /* 220 (menu) + 40 (tab) */
  display: flex;
  flex-direction: row;
  z-index: 10;
} /* Side Menu */
.side-menu {
  width: 150px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #ccc;
} /* Tab */
.side-tab {
  width: 40px;
  height: 100px;
  background-color: #343a40;
  color: white;
  cursor: pointer;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: calc(50vh - 50px); /* Vertically center the tab */
}
.rotate-text {
  transform: rotate(-90deg);
  font-weight: bold;
  white-space: nowrap;
}
</style>
