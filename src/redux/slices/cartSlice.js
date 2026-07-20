import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const exist = state.cartItems.find(
        (x) => x._id === item._id
      );

      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state.cartItems)
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (x) => x._id === action.payload
      );

      if (item) item.quantity++;

      localStorage.setItem(
        "cart",
        JSON.stringify(state.cartItems)
      );
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (x) => x._id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity--;
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state.cartItems)
      );
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(state.cartItems)
      );
    },

    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;