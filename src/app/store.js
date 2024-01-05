import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/counter/products/productsSlice'
import cartReducer from '../features/counter/cart/cartSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
