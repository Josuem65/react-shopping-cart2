import React from 'react';
import { useSelector } from "react-redux";
import logo from './logo.svg';
import './App.css';
import './features/counter/cart/Cart.css'
import './features/counter/products/Product.css'
import './features/counter/sizes/Size.css'
import Cart from './features/counter/cart/Cart';
import Products from './features/counter/products/Products'
import Sizes from './features/counter/sizes/Sizes'
import { selectToggle } from './features/counter/cart/cartSlice'

function App() {
  const cartToggled = useSelector(selectToggle)

  return (
    <div className="App">
      <Sizes/>
      <Products/>
      <Cart/>
    </div>
  );
}

export default App;
