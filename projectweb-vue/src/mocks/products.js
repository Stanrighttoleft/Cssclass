import { mock } from "mockjs";
import products from '@/mocks/data/products.json'

mock.mock('/api/products', 'get', ()=>{
    return {
        code:200,
        message:'success',
        data:products,
    }
})