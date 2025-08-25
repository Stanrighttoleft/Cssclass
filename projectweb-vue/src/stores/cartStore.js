
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  //deliveryway

  const selectedShipping = ref("seven");
  const shippingMap = {
    seven: 60,
    family: 70,
    hilife: 70,
    postoffice: 70,
  };

  //add to cart
  function addToCart(product) {
    const existing = items.value.find(
      (i) => i.id === product.id && i.size == product.size
    );
    if (existing) {
      existing.cartQuantity += 1;
    } else {
      items.value.push({ ...product, cartQuantity: 1 });
    }
    saveToLocalStorage();
  }

  //reduce cartquantity
  function decreaseQuantity(id) {
    const idx = items.value.findIndex((i) => i.id === id);
    if (idx !== -1) {
      if (items.value[idx].cartQuantity > 1) {
        items.value[idx].cartQuantity -= 1;
      } else {
        items.value.splice(idx, 1);
      }
    }
    saveToLocalStorage();
  }

  //remove cartitem
  function removeFromCart(id) {
    items.value = items.value.filter((i) => i.id !== id);
    saveToLocalStorage();
  }

  //clearcart
  function clearCart() {
    items.value = [];
    saveToLocalStorage();
  }

  //caculatethe order
  const totalQuantity = computed(() =>
    items.value.reduce((sum, i) => sum + i.cartQuantity, 0)
  );

  const totalPrice = computed(() => {
    return items.value.reduce((sum, i) => sum + i.cartQuantity * i.price, 0);
  });

  //shipping cost
  const shippingCost = computed(() => {
    if (totalPrice.value >= 2000) return 0;
    return shippingMap[selectedShipping.value] || 0;
  });

  //final price
  const finalPrice = computed(() => totalPrice.value + shippingCost.value);

  //localstorage setup
  function saveToLocalStorage() {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items: items.value,
        selectedShipping: selectedShipping.value,
      })
    );
  }
  //import localhost
  function loadFromLocalStorage() {
    const data = localStorage.getItem("cart");
    if (data) {
      const parsed = JSON.parse(data);
      items.value = parsed.items || [];
      selectedShipping.value = parsed.selectedShipping || "seven";
    }
  }

  //loading the localstorage
  loadFromLocalStorage();

  //watch the change
  watch([items, selectedShipping], saveToLocalStorage, { deep: true });

  return {
    items,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalQuantity,
    totalPrice,
    selectedShipping,
    shippingCost,
    finalPrice,
  };
});
