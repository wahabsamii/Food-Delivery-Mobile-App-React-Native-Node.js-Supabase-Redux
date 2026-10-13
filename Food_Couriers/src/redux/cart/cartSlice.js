import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], 
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((p) => p.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount += item.price;
    },

    // Remove from Cart
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((p) => p.id === id);
      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
      state.cartItems = state.cartItems.filter((p) => p.id !== id);
    },

    // Decrease Item Quantity
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((p) => p.id === id);
      if (!existingItem) return;

      existingItem.quantity -= 1;
      existingItem.totalPrice -= existingItem.price;
      state.totalQuantity -= 1;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity <= 0) {
        state.cartItems = state.cartItems.filter((p) => p.id !== id);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
