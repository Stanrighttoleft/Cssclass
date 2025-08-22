import { defineStore } from "pinia";

export const useCartStore=defineStore("cart",{
    state:() =>({
        items:[],
    }),
    getters:{
        //total price of cart items
        totalPrice:(state)=>state.items.reduce((sum,item)=>sum +item.price*item.quantity, 0),

        //total count of all items in the cart
        totalQuantity:(state)=>state.items.reduce((sum,item)=>sum +item.quantity,0),
        //Total cou
    },
    actions:{
        //add a product to the cart, or increase quantity if it exists
        addToCart(product){
            const existingItem=this.items.find((item)=>item.id===product.id);
            if(existingItem){
                existingItem.quantity++;
            }else{
                this.items.push({...product,quantity:1});
            }
        },

        //Remove a product completely form the cart by id
        removeFromCart(productId){
            this.items=this.items.filter((item)=>item.id !==productId);
        },

        //Decrease quantity by 1, or remove if quantity goes to 0
        decreaseQuantity(productId){
            
        }
    }
})