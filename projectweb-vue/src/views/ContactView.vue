<template>
  <div class="container-fluid contactview">
    <div class="row">
      <ProductList class="mt-5" />
      <UserList />
      
    </div>
    <NewProductPage/>
  </div>
</template>

<script setup>
import ProductList from "@/components/ProductList.vue";
import UserList from "@/components/UserList.vue";
import NewProductPage from "@/components/NewProductPage.vue";
</script>

<style>
.contactview {
  overflow-x: hidden;
  height: 100vh;
}
</style>