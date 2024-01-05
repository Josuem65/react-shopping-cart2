import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Products from './Products';

const logger = (v) => console.log(JSON.parse(JSON.stringify(v)))
//logger()

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filtered: [],
    cart: [],
    subtotal: [],
  },

  reducers: {
    display: (state, action) => {
      state.products = action.payload
    },
    addToFiltered: (state, action) => {
      console.log(action.payload)
      let filteredArr = []
      let hashing = []
      for(let x=0; x < state.products.length; x++) {
        hashing.push(0)
    }

      if(action.payload.length > 0) {
      for(let i=0; i < action.payload.length; i++) {
        for(let j=0; j < state.products.length; j++) {
          if(hashing[j] === 1) {
            continue;
          }
          let sizeArr = state.products[j].availableSizes
          for(let k=0; k < sizeArr.length; k++) {
            if(action.payload[i] == sizeArr[k]) {
              filteredArr.push(state.products[j])
              hashing[j] = 1
              if(j == state.products.length -1 && k == sizeArr.length -1) {
                state.filtered = filteredArr
              }
              break;
          } if(j == state.products.length -1 && k == sizeArr.length -1) {
            state.filtered = filteredArr
          }
        }
      }
      }
    } else {
      state.filtered = action.payload;
    }
    },
    addToCart: (state, action) => {
      const product = action.payload 
      const index = state.cart.findIndex(item => item.id === product.id)
      if(index >= 0 ) {
        state.cart[index].quantity += 1
        state.subtotal[index] += product.price
      } else {
        state.cart.push({...product, quantity: 1})
        state.subtotal.push(product.price)
      }
    },
    decreaseQuantity: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id)
      console.log(index)
      if(action.payload.quantity > 1) {
        state.cart[index].quantity -= 1
        state.subtotal[index] -= action.payload.price
      }
    },
    increaseQuantity: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id)
      state.cart[index].quantity +=1
      state.subtotal[index] += action.payload.price
    },
    deleteFromCart: (state, action) => {
      console.log(action.payload)
      const filteredArr = state.cart.filter((item) => item.id !== action.payload.id)
      const targetIndex = state.cart.findIndex(item => item.id === action.payload.id)
      if (targetIndex > -1) { // only splice array when item is found
        state.subtotal.splice(targetIndex, 1); // 2nd parameter means remove one item only
      }
      console.log(state.subtotal)
      state.cart = filteredArr
      logger(state.cart)
    }
  }, 
});

export const { display, addToFiltered, addToCart, decreaseQuantity, increaseQuantity, deleteFromCart } = productsSlice.actions;

export const getProducts = () => (dispatch) => {
  axios.get('http://localhost:3001/products')
  .then((products) => dispatch(display(products.data)))
}

export const selectProducts = (state) => state.products.products; 
export const selectCart = (state) => state.products.cart
export const selectFiltered = (state) => state.products.filtered
export const selectSubtotal = (state) => state.products.subtotal

export default productsSlice.reducer;