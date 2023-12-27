import { createSlice } from "@reduxjs/toolkit";
import productData from "../productData";
import { useEffect } from "react";




const cartsIt=localStorage.getItem("cartItems")!==null?JSON.parse(localStorage.getItem("cartItems")):[]
const totalPrice=localStorage.getItem("cartItems")!==null?JSON.parse(localStorage.getItem("totalPrice")):[]
const totalQuantity=localStorage.getItem("cartItems")!==null?JSON.parse(localStorage.getItem("totalQuantity")):[]


const initialState = {
  cart: cartsIt,
  items: productData,
  totalQuantity: totalPrice,
  totalPrice: totalQuantity,
};



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      
      
      let find = state.cart.findIndex((item) => item.id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }

      localStorage.setItem("cartItems",JSON.stringify(state.cart.map(item=>item)))
    },

    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          console.log("cartitem", cartItem);
          const { price, quantity } = cartItem;
          console.log(price, quantity);
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
      localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice))
      localStorage.setItem("totalQuantity",JSON.stringify(state.totalQuantity))
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.quantity>=1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});
export const saveCartToStorage = (state) => {
  const cartData = state.cart;
  localStorage.setItem("cart", JSON.stringify(cartData));
};

export const {
  addToCart,
  getCartTotal,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;