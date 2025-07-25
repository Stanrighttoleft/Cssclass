<template>
     <div class="productShow">
      <div class="container-fluid shows p-0 m-0 "  >
        <div class="row d-flex flex-row flex-nowrap overflow-hidden position-relative">
          <div class="col-1 col-sm-3 productcard p-0 m-0 " v-for="(product, index) in productsList" :key="index">
            <div class="position-relative border-end border-dark">
              <img class="productimage " :src="product.image" alt="">
              <img v-if="product.topsale" class="position-absolute top-0 start-0" :src="hot" alt="">
            </div>
            <div class="productTag border-end border-dark">
              <div class="bg-light">{{'TW '+ product.price }}</div>
              <div class="bg-warning">{{product.name }}</div>
            </div>
          </div>
        <!-- Navigation -->
          <div class="navigation position-absolute d-flex align-items-start align-items-center col-12 h-100">
              <div class="navPrev col-2">
                <img class="productBun" :src="prevBun" alt="">
              </div>
              <div class="navNext d-flex justify-content-end  col-10">
                <img class="productBun" :src="nextBun" alt="">

              </div>

          </div>
        </div>
      </div>

    </div> 
</template>

<script setup>
import { ref } from 'vue';
const hot=ref('./assets/hot.png');
const prevBun=ref('./assets/left.png');
const nextBun=ref('./assets/right.png');

const props=defineProps({
  productsList:
  {
    type:Array,
    default:'',
  },

})



</script>

<style>

.productcard{
  width:300px;
  height: 300px;
}
.productimage{
  width:300px;
  height: 200px;
}
.productBun{
  height: 40px;
}
</style>