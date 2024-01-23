import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, productsSlice, selectProducts, addToCart, selectFiltered } from './productsSlice'
import { selectToggle } from '../cart/cartSlice'

export default function Products() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const filtered = useSelector(selectFiltered)
  const isItToggled = useSelector(selectToggle)

  useEffect(() => {
    dispatch(getProducts())
  }, []);
   //console.log(products[0] ? products[0].img.normal : "still undefined")
  function installments(price, installments, currency) {
    if(installments) {
      let monthly = price / installments
      return (
        <span className="productInstallments">or {installments} x {currency}{monthly.toFixed(2)}</span>
      )
    } 
  }

  function freeShipping(free) {
    if(free) {
      return (
        <span className="freeShipping">Free shipping</span>
      )
    } 
  }
//  A L L   P R O D U C T S   F U N C T I O N
  function allProducts(products) {
    return (
      <div className={isItToggled ? "mainProducts cartIsToggled": "mainProducts"}>
       {products.map((product, index) => {
          const price = product.price
          const installment = product.installments
          const currency = product.currencyFormat
        return (
        <div className="eachProduct">
          {freeShipping(product.isFreeShipping)}
          <img src={`https://josuem65.github.io/react-shopping-cart2${product.img.normal}`}className="productImg"/> 
          <span className="productTitle">{product.title}</span>
          <span className="productPrice">{currency}{price}</span>
          {installments(price, installment, currency)}
          <button className="addToCartBtn" onClick={() => dispatch(addToCart(product))}>Add to cart</button>
        </div>
        )
        })}
      </div>
    )
  }
  return (filtered.length > 0 ? allProducts(filtered) : allProducts(products))
}