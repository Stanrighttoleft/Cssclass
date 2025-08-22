<template>
    <div class="container-fluid productdetail">
        <div class="row">
            <div class="col-md-6 col-xxl-4 offset-xxl-2">
                <div class="float-end"><img class="productimage float-end" :src="product.image" alt="">
                </div>
                <div>

                </div>
            </div>
            <div class="col-md-6 col-xxl-4">
                <h1>{{ product.title }}</h1>
                <h2>{{ product.price }}</h2>
                <hr>
                <h3>購買前須知</h3>
                <hr>
                <label class="form-label" for="itemSize">產品規格</label>
                <select class="form-control" name="itemSize" id="">
                    <option value="singleSize">單一尺寸</option>
                    
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="S">S</option>
                </select>
                <br>
                <label for="orderQuantity form-label">訂購數量</label>
                <select class="form-control" name="orderQuantity" id="">
                    <option value="" name="1">1</option>
                    <option value="" name="2">2</option>
                    <option value="" name="3">3</option>
                </select>
                <hr>
                <button class="btn btn-warning me-2">加入購物車</button>
                <button class="btn btn-warning">立即購買</button>


            </div>
            
        </div>
        <div class="row  mt-5 ">
            <div class="offset-xxl-3 col-xxl-6 col-12">
                <h1>產品描述</h1>
                <hr>
                <p>預計產品描述跟圖片還有影片區域</p>
    
            </div>

        </div>
    </div>
    
  
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed, watch } from 'vue';

const productStore=useProductStore()
const {product}=storeToRefs(productStore);
// const {fetchProducts}=productStore;
const {fetchProduct}=productStore;


const route=useRoute();
const productId=route.params.id;

onMounted(async()=>{
    await fetchProduct(productId);
    console.log("product in component:", product.value)
})
watch(product,(newVal)=>{
    console.log("products updated", newVal);
})


</script>

<style scoped>
.productdetail{
    height: 100vh;
    width: 100%;
    margin-top: 100px;
}
.productimage{
    max-width: 400px;
    height: auto;
}

</style>