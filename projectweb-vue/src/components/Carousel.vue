<template>
  <div class="carousel">
    <slot :currentSlide="currentSlide"></slot>

    <!--Navigation  -->
    <div class="toggle-page left">
        <span ><img src="./assets/left.png" alt=""></span>
    </div>
    <div class="toggle-page right">
        <span ><img src="./assets/right.png" alt=""></span>
    </div>
    
  </div>
</template>

<script setup>
import {ref, onMounted, defineProps} from "vue";
const currentSlide = ref(1);
const getSlideCount=ref(0)



defineProps({
    currentSlide:{
        type:Number,
        default:1,
    }
})

onMounted(() => {
  getSlideCount.value = document.querySelectorAll('.slide').length
})


</script>

<style>
carousel {
  position: relative;
  height: 100%;
  width: 100%;
}

.navigate {
  padding: 0 16px;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navigate .toggle-page {
  display: flex;
  flex: 1;
}

.navigate .right {
  justify-content: flex-end;
}

.navigate i {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #6347c7;
  color: #fff;
}

.pagination {
  position: absolute;
  bottom: 24px;
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.pagination span {
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
              0 1px 2px rgba(0, 0, 0, 0.06);
}

.pagination .active {
  background-color: #6347c7;
}

</style>