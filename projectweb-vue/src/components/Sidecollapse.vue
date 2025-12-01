<script setup>
import { onMounted, ref, nextTick } from "vue";
import { motion } from "motion-v";

const menus = ref([
  {
    title: "新品直購",
    expanded: true,
    children: ["生活五金", "保養品", "戶外用品"],
  },
  {
    title: "澳洲直購",
    expanded: true,
    children: [
      "運動/戶外",
      "名牌精品",
      "私密生活",
      "健康零嘴",
      "美妝保養",
      "居家/生活",
      "母嬰兒童",
      "生活/玩具",
      "流行時尚",
      "寵物用品",
      "家電家具",
      "特惠專購",
    ],
  },
  {
    title: "航太超跑",
    expanded: false,
    children: [],
  },
  {
    title: "委託代購",
    expanded: false,
    children: [],
  },
  {
    title: "代購試算",
    expanded: false,
    children: [],
  },
]);

function toggleMenu(index) {
  menus.value[index].expanded = !menus.value[index].expanded;
}
</script>

<template>
  <div class="sidebar container-fluid">
    <div class="row">
      <div class="col-md-12 flex-column align-items-start">
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
              <input type="checkbox" class="me-2" />{{ child }}
            </li>
          </motion.ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
