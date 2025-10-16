<script setup>
import { onMounted, ref, nextTick, watch, computed } from "vue";
import { useStoreOwnerStore } from "@/stores/storeOwnerStore";
import { storeToRefs } from "pinia";
import { motion } from "motion-v";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const productStore = useStoreOwnerStore();
//use storeToRefs to keep the unwrap become ref again
const { products } = storeToRefs(productStore);
const { fetchProducts } = productStore;

const selectedOption = ref("pricehigh");
const hot = ref("/assets/hot.png");
const selectedCategories = ref([]);
const selectedBrands = ref([]);

function getModelForMenu(menu) {
  return menu.title === "品項選擇"
    ? selectedCategories.value
    : selectedBrands.value;
}
function onCheckboxChange(menu, value, event) {
  const targetArray =
    menu.title === "品項選擇" ? selectedCategories.value : selectedBrands.value;

  if (event.target.checked) {
    if (!targetArray.includes(value)) {
      targetArray.push(value);
    }
  } else {
    const index = targetArray.indexOf(value);
    if (index !== -1) {
      targetArray.splice(index, 1);
    }
  }
}

const keyword = computed(() => route.query.keyword || "");

const filteredAndSortedProducts = computed(() => {
  if (!products.value) return [];

  let filtered = [...products.value];

  // Filter by keyword
  filtered = filtered.filter((p) =>
    p.title.toLowerCase().includes(keyword.value.toLowerCase())
  );

  //  Filter by categories
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter((product) =>
      selectedCategories.value.includes(product.category)
    );
  }

  //  Filter by brands
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter((product) =>
      selectedBrands.value.includes(product.brand)
    );
  }

  //  Sorting
  switch (selectedOption.value) {
    case "pricehigh":
      return filtered.sort((a, b) => b.price - a.price);
    case "pricelow":
      return filtered.sort((a, b) => a.price - b.price);
    case "hot":
      return filtered.sort((a, b) => {
        const hotA = isHot(a);
        const hotB = isHot(b);
        if (hotA && !hotB) return -1;
        if (!hotA && hotB) return 1;
        return 0;
      });
    default:
      return filtered;
  }
});

const menus = ref([
  {
    title: "品項選擇",
    expanded: false,
    children: ["生活五金", "保養品", "戶外用品"],
  },
  {
    title: "品牌選擇",
    expanded: false,
    children: ["Life Space", "Unichi Rosa"],
  },
]);

const isHot = (product) =>
  product.bestsell === true ||
  product.bestsell === 1 ||
  product.bestsell === "1";

function toggleMenu(index) {
  menus.value[index].expanded = !menus.value[index].expanded;
}
onMounted(async () => {
  await fetchProducts();
  console.log("products in component:", products.value);
});
watch(products, (newVal) => {
  console.log("products updated:", newVal);
});
</script>

<template>
  <div class="container-fluid productpage bg-light">
    <div class="row">
      <div
        class="col-xxl-2 offset-xxl-2 col-sm-3 flex-column align-items-start"
      >
        <div v-for="(menu, index) in menus" :key="index" class="menu-item">
          <div class="menu-header" @click="toggleMenu(index)">
            <i
              class="demoicon pi pi-angle-right"
              :class="{ rotated: menu.expanded }"
            ></i>
            {{ menu.title }}
          </div>

          <motion.ul
            v-if="menu.children && menu.expanded"
            class="submenu"
            :initial="{ opacity: 0 }"
            :animate="{
              y: 0,
              opacity: 1,
              transition: {
                duration: 1,
              },
            }"
          >
            <li v-for="(child, i) in menu.children" :key="i">
              <input
                type="checkbox"
                class="me-2"
                :value="child"
                :checked="getModelForMenu(menu).includes(child)"
                @change="onCheckboxChange(menu, child, $event)"
              />

              {{ child }}
            </li>
          </motion.ul>
        </div>
      </div>
      <div class="col-xxl-6 col-sm-9">
        <div>
          <label for="selector" class="form-label">篩選產品：</label>
          <select id="selector" class="form-select" v-model="selectedOption">
            <option value="pricehigh">價高優先</option>
            <option value="pricelow">價低優先</option>
            <option value="hot">人氣度</option>
          </select>
        </div>
        <hr />
        <div class="row d-flex g-1">
          <div
            v-for="product in filteredAndSortedProducts"
            :key="product.id"
            class="col-md-3 col-sm-4 col-6 position-relative"
          >
            <RouterLink :to="`/admin/productsmanager/${product.id}`">
              <div>
                <img
                  :src="product.image"
                  alt="product.title"
                  class=""
                  style="height: 110px; width: 120px"
                />
                <img
                  v-if="isHot(product)"
                  class="position-absolute top-0 start-0"
                  :src="hot"
                  alt=""
                />
              </div>
              <div class="m-0 p-0">
                <p class="">{{ product.title }}</p>
              </div>
              <div class="m-0 p-0">
                <p class="">TWD: {{ product.price }}</p>
              </div>
            </RouterLink>
            <div class="mb-2 mt-0">
              <button class="btn btn-warning btn-sm">下架商品</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.productpage {
  height: 100vh;
}
.sidebar {
  width: 250px;
  margin-left: 5px;
  margin-top: 10px;
  padding-left: 0;

  background: #fff;
  font-size: 14px;
}

.menu-header {
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  border: 1px dotted black;
}
.submenu {
  list-style: none;
  padding-left: 15px;
  margin: 0;
}
.submenu li {
  padding: 8px 10px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}
.demoicon {
  font-size: 1rem;
  color: black;
}
.demoicon.rotated {
  transform: rotate(90deg);
}
.test {
  background-size: contain;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
</style>