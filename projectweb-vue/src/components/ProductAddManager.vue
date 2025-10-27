<!-- src/views/AddProductForm.vue -->
<template>
  <div class="add-product-form">
    <h2>Add New Product</h2>

    <form @submit.prevent="handleSubmit">
      <div>
        <label>Title:</label>
        <input v-model="form.title" type="text" required />
      </div>

      <div>
        <label>Price:</label>
        <input v-model="form.price" type="number" step="0.01" required />
      </div>

      <div>
        <label>Description:</label>
        <textarea v-model="form.description" rows="4" />
      </div>

      <div>
        <label>Sizes (comma separated):</label>
        <input v-model="sizesInput" type="text" placeholder="S, M, L, XL" />
      </div>

      <div>
        <label>Image:</label>
        <input type="file" @change="handleFileChange" accept="image/*" />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Submitting..." : "Add Product" }}
      </button>

      <p v-if="message" :class="{ success: success, error: !success }">
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreOwnerStore } from "@/stores/storeOwnerStore";

const store = useStoreOwnerStore();
const form = ref({
  title: "",
  price: "",
  description: "",
  sizes: [],
});

const sizesInput = ref("");
const imageFile = ref(null);
const message = ref("");
const success = ref(false);
const loading = ref(false);

const handleFileChange = (e) => {
  imageFile.value = e.target.files[0];
};

const handleSubmit = async () => {
  loading.value = true;
  message.value = "";
  success.value = false;

  form.value.sizes = sizesInput.value
    .split(",")
    .map((size) => size.trim())
    .filter((size) => size.length > 0);

  const response = await store.addProduct(form.value, imageFile.value);

  success.value = response.success;
  message.value = response.message;
  loading.value = false;

  if (response.success) {
    // Optionally reset form
    form.value = { title: "", price: "", description: "", sizes: [] };
    sizesInput.value = "";
    imageFile.value = null;
  }
};
</script>

<style scoped>
.add-product-form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.add-product-form label {
  display: block;
  font-weight: bold;
  margin-top: 1rem;
}

.add-product-form input,
.add-product-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}

.success {
  color: green;
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
