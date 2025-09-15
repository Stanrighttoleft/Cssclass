<template>
  <div class="admin-dashboard">
    <h1>Store Owner Dashboard</h1>
    
    <section>
      <h2>Product Management</h2>
      <button @click="fetchProducts">Refresh Products</button>
      <div v-for="product in products" :key="product.id">
        <input v-model="product.name" />
        <input v-model="product.price" type="number" />
        <textarea v-model="product.description"></textarea>
        <button @click="updateProduct(product)">Save</button>
        <button @click="deleteProduct(product.id)">Delete</button>
      </div>
      <h3>Add New Product</h3>
      <input v-model="newProduct.name" placeholder="Name" />
      <input v-model="newProduct.price" type="number" placeholder="Price" />
      <textarea v-model="newProduct.description" placeholder="Description"></textarea>
      <button @click="addNewProduct">Add Product</button>
    </section>

    <section>
      <h2>Order Management</h2>
      <button @click="fetchOrders">Refresh Orders</button>
      <div v-for="order in orders" :key="order.id">
        <p>Order #{{ order.id }} - {{ order.status }}</p>
        <p>Customer: {{ order.customer_name ?? 'N/A' }}</p>
        <p>Total: {{ order.total_amount ?? '?' }}</p>
        <button v-if="order.status !== 'confirmed'" @click="confirmOrder(order.id)">Confirm</button>
        <button @click="deleteOrder(order.id)">Delete</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStoreOwnerStore } from "@/stores/storeOwnerStore";

const store = useStoreOwnerStore();

const { products, orders, fetchProducts, fetchOrders, addProduct, updateProduct, deleteProduct, confirmOrder, deleteOrder } = store;

const newProduct = ref({
  name: "",
  price: 0,
  description: "",
});

const addNewProduct = async () => {
  const res = await addProduct(newProduct.value);
  if (res.success) {
    await fetchProducts();
    newProduct.value = { name: "", price: 0, description: "" };
  } else {
    alert(res.message || "Failed to add product");
  }
};

onMounted(() => {
  fetchProducts();
  fetchOrders();
});
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
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
