import { create } from "zustand";

type cartItems = {
    _id  : string ;
    productName : string ;
    c
}

type cart = {

}

export const useCartStore = create({
    cart :[] ,
})