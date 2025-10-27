<template>
  <div class="container managerboard">
    <div class="row">
      <div class="col-md-8 offset-md-2 d-flex flex-row">
        <RouterLink to="/admin/addproductmanager" class="me-3"><button class="btn btn-primary">新增商品</button></RouterLink>
        <RouterLink to="/admin/productsmanager" class="me-3"><button class="btn btn-primary">編輯商品</button></RouterLink>
        <RouterLink to="/admin/ordermanager" class="me-3"><button class="btn btn-primary">管理訂單</button></RouterLink>
        <button class="btn btn-warning" @click="handleLogout">
          登出
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="card col-md-3" v-for="product in store.products" :key="product.id" >
      <img :src="product.image" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{product.title}}</h5>
        <h5 class="card-title">{{product.price}}</h5>
        <p class="card-text">{{product.description}}</p>
        <div class="d-flex">
          <RouterLink class="text-decoration-none" to="/admin/addproductmanager"><button class="btn btn-primary">編輯</button></RouterLink>
          <button @click="deleteProduct(product.id)" class="btn btn-danger">刪除</button>
        </div>
      </div>
      </div>
  </div>
</div>
  
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStoreOwnerStore } from "@/stores/storeOwnerStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter, RouterLink } from "vue-router";
import { watch } from "vue";
import { motion } from "motion-v";

//use the pinia store, without unwrap it so, everything from the store(products), should put store in front, like store.products
const router = useRouter();
const store = useStoreOwnerStore();
const userStore = useUserStore();

const { logout } = userStore;

const role = userStore.userRole;
console.log("Role:", role);

const newProduct = ref({
  name: "",
  price: 0,
  description: "",
});

//the logout function
const handleLogout = () => {
  logout();
  router.push("/");
};

//deal with the product management
const addNewProduct = async () => {
  const res = await addProduct(newProduct.value);
  if (res.success) {
    await fetchProducts();
    newProduct.value = { name: "", price: 0, description: "" };
  } else {
    alert(res.message || "Failed to add product");
  }
};
//check whether the products value is right
watch(store.products, (newVal) => {
  console.log("Products updated:", newVal);
});

onMounted(async () => {
  await store.fetchProducts();
});
</script>

<style scoped>
.managerboard {
  padding: 2rem;
  height: 200vh;
}
.admin-dashboard h2 {
  margin-top: 2rem;
}
.admin-dashboard input,
.admin-dashboard textarea {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
