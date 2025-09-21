<template>
  <div class="container managerboard">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        first row for the manager banner, i need to make sure everything is
        right Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptates illo recusandae veritatis repellat aliquam quis sequi eveniet
        sunt, accusamus expedita magni unde, perspiciatis porro atque deserunt
        rem ullam placeat necessitatibus?
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 offset-md-2">test</div>
      <div
        class="col-md-6 gap-2 d-flex justify-content-center align-items-center"
      >
        <div class="row">
          <div
            v-for="product in store.products"
            :key="product.id"
            class="col-md-4 flex-wrap"
          >
            <img :src="product.image" alt="" style="width: 150px" />
            <input v-model="product.title" />

            <input v-model="product.price" type="number" />
            <textarea v-model="product.description"></textarea>
            <button @click="updateProduct(product)">Save</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </div>
          <div
            class="col-md-12 d-flex justify-content-center align-items-center flex-column mt-5"
          >
            <h3>Add New Product</h3>
            <input v-model="newProduct.name" placeholder="Name" />
            <input
              v-model="newProduct.price"
              type="number"
              placeholder="Price"
            />
            <textarea
              v-model="newProduct.description"
              placeholder="Description"
            ></textarea>
            <button @click="addNewProduct">Add Product</button>

            <!-- <section>
              <h2>Order Management</h2>
              <button @click="fetchOrders">Refresh Orders</button>
              <div v-for="order in orders" :key="order.id">
                <p>Order #{{ order.id }} - {{ order.status }}</p>
                <p>Customer: {{ order.customer_name ?? 'N/A' }}</p>
                <p>Total: {{ order.total_amount ?? '?' }}</p>
                <button v-if="order.status !== 'confirmed'" @click="confirmOrder(order.id)">Confirm</button>
                <button @click="deleteOrder(order.id)">Delete</button>
                
              
          </div>
        </section> -->
            <br />
            <button class="btn btn-warning" @click="handleLogout">
              Logout
            </button>
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
import { useRouter } from "vue-router";
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
