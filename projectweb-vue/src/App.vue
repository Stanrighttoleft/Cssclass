<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import Navbar from "@/components/navbar.vue";
import NewNavbar from "@/components/NewNavbar.vue";
import Footer from "./components/Footer.vue";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useCartStore } from "./stores/cartStore";
import { useUserStore } from "./stores/userStore";
import SlideSideMenu from "./components/SlideSideMenu.vue";
import { storeToRefs } from "pinia";
import ManagerNav from "./components/ManagerNav.vue";
import { computed } from "vue";
import { useUIStore } from "./stores/uiStore";

const cartStore = useCartStore();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
// uistore
const uiStore = useUIStore();
const showNavbar = computed(() => uiStore.showNavbar);

const carticon = ref("/assets/carticon.png");
const isLarge = ref(window.innerWidth >= 992); // Bootstrap lg = 992px
// 隱藏或顯示navbar變數

function handleResize() {
  isLarge.value = window.innerWidth >= 992;
}

const currentNav = computed(() => {
  if (userInfo.value?.role === "storeowner") {
    return ManagerNav;
  }
  return isLarge.value ? NewNavbar : SlideSideMenu;
});

onMounted(async () => {
  await userStore.fetchCurrentUser();
  window.addEventListener("resize", handleResize);
  console.log(userInfo);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <main
    class="position-relative col-lg-8 offset-lg-2 col-xxl-6 offset-xxl-3"
    style="max-width: 1920px"
  >
    <div class="navbar-fixed-wrapper">
      <component v-if="showNavbar" :is="currentNav" />
    </div>
    <div :class="[{ 'shift-up': !isLarge && userInfo?.role !== 'storeowner' }]">
      <RouterLink to="/cart">
        <button class="position-fixed rounded-circle bg-light" id="cartbutton">
          <img :src="carticon" alt="" class="" id="carticon" /><span
            class="cart-badge"
            v-if="cartStore.totalQuantity > 0"
            >{{ cartStore.totalQuantity }}</span
          >
        </button></RouterLink
      >

      <!-- <Navbar/> -->
      <RouterView />

      <Footer v-if="isLarge" />
    </div>
  </main>
</template>

<style>
html,
body,
div {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.shift-up {
  margin-top: -100px; /* push up content */
}
#carticon {
  width: 60px;
  height: 60px;
}
#cartbutton {
  border: 0;
  width: 90px;
  height: 90px;
  left: 20%;
  top: 80%;
  z-index: 5;
}
.cart-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  z-index: 6;
  display: inline-block;
}
.navbar-fixed-wrapper {
  position: fixed;
  top: 0;
  z-index: 999;
  width: inherit; /* match the parent's width */
  max-width: inherit;
}
</style>
