<script setup>
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";

const productStore = useProductStore();
const cartStore = useCartStore();

function addProductToCart(product) {
  cartStore.addToCart(product);
}
</script>

<template>
  <div v-for="product in productStore.products" :key="product.id" class="product">
    <h3>{{ product.title }}</h3>
    <p>Price: ${{ product.price }}</p>
    <button @click="addProductToCart(product)">Add to Cart</button>
  </div>
</template>
Example: Display Cart
vue
複製程式碼
<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

function removeItem(id) {
  cartStore.removeFromCart(id);
}

function decreaseItem(id) {
  cartStore.decreaseQuantity(id);
}
</script>

<template>
  <div>
    <h2>Shopping Cart</h2>
    <div v-if="cartStore.items.length === 0">Your cart is empty</div>
    <ul v-else>
      <li v-for="item in cartStore.items" :key="item.id">
        <img :src="item.image" alt="" width="50" />
        <span>{{ item.title }}</span>
        <span>${{ item.price }} x {{ item.quantity }}</span>
        <button @click="decreaseItem(item.id)">-</button>
        <button @click="removeItem(item.id)">Remove</button>
      </li>
    </ul>
    <div v-if="cartStore.items.length">
      <strong>Total: ${{ cartStore.totalPrice }}</strong>
      <button @click="cartStore.clearCart()">Clear Cart</button>
    </div>
  </div>
</template>
3. Optional: Persist Cart in LocalStorage (Bonus)
If you want your cart to persist on page reload, you can add this to your cart store:

js
複製程式碼
// inside state
state: () => ({
  items: JSON.parse(localStorage.getItem('cartItems') || '[]')
}),

// inside actions, after any modification:
persistCart() {
  localStorage.setItem('cartItems', JSON.stringify(this.items));
},

// Call persistCart after mutating actions, for example:
addToCart(product) {
  const existingItem = this.items.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    this.items.push({ ...product, quantity: 1 });
  }
  this.persistCart();
},

// similarly call persistCart in removeFromCart, decreaseQuantity, clearCart