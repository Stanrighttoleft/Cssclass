import { defineStore } from "pinia";
import { ref } from "vue";
import request from "@/api/request";

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const product=ref([])
    const fetchProducts = async () => {
        try {
            const response = await request.get('api/products')

            products.value = response.data.data.nutrition;

            console.log('Products assigned to store:', products.value)
        } catch (error) {
            console.error('Failed to fetch products:', error)
        }
    }
    const fetchProduct=async(jobId)=>{
        try{
            const response=await request.get(`api/products/${jobId}`);
            product.value=response.data.data.nutrition;
            console.log('product assigned to store:',product.value)

        }catch(error){
            console.error('failed to fetch products:')

        }
    }
    return {
        products,
        product,
        fetchProducts,
        fetchProduct,
    }
})