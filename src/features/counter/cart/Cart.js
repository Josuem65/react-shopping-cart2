import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from './cartSlice'
import { selectCart, decreaseQuantity, increaseQuantity, deleteFromCart, selectSubtotal } from '../products/productsSlice'
import { FaCartPlus } from "react-icons/fa"

export default function Cart() {
    const dispatch = useDispatch()
    const cartList = useSelector(selectCart)
    const subtotalList = useSelector(selectSubtotal)
    const [ cartToggle, setCartToggle ] = useState(0)

    function subTotal(item) {
      const sub = item.price * item.quantity
      return sub.toFixed(2)
    }

    function subtotalHandle() {
      if(subtotalList.length == 1) {
        return '$' + subtotalList[0].toFixed(2)
      } else {
        return null
      }
    }

    function handleClick() {
      !cartToggle ? setCartToggle(1) : setCartToggle(0)
    }

    useEffect(() => {
      dispatch(toggle(cartToggle))
      console.log(cartToggle)
    },)

    const iconStyle = { backgroundColor: "rgb(27, 26, 32)", color: "white", padding: ".2em", fontSize: "3em", position: "fixed", right: "0", top: "0"}
    const toggledStyle = { backgroundColor: "rgb(27, 26, 32)", color: "white", padding: ".2em", fontSize: "3em", position: "fixed", right: "30%", top: "0" }
    return (
      <>
      <FaCartPlus style={cartToggle ? toggledStyle : iconStyle} onClick={() => handleClick()}/>
      <div className={cartToggle ? "mainCart cartToggled" : "mainCart"} >
        <h1 className="cartHeader">Cart</h1>
        <div className="cartAmountDiv">
          <li className="cartAmount">{cartList.length}</li>
          <p>Items</p>
        </div>
        <div className="allCartItems">
        {cartList.map((item) => {
          return (
            <div className="itemCart">
              <img className="imgCart" src={item.img.thumb}/>
              <div className="middleDivCart">
                <span className="title">{item.title}</span>
                <span className="size">{item.availableSizes}</span>
                <span className="description">{item.description}</span>
                <span className="quantity">Quantity: {item.quantity}</span>
              </div>
              <div className="rightDivCart">
                <button className="deleteItem" onClick={() => dispatch(deleteFromCart(item))}>x</button>
                <span className="itemSubtotal">{item.currencyFormat}{item.price.toFixed(2)}</span>
                <div className="decrease_increaseBtns">
                  <button className="decreaseBtn" onClick={() => dispatch(decreaseQuantity(item))}>-</button>
                  <button className="increaseBtn" onClick={() => dispatch(increaseQuantity(item))}>+</button>
                </div>
              </div>
            </div>
            )
        })}
        </div>
        <div>
          <div className="subtotalDiv">
            <li className="subtotalHeading">Subtotal</li>
            <h2 className="cartSubtotal">{subtotalList.length > 1 ? '$' + subtotalList.reduce((price, price2) => price + price2).toFixed(2) : subtotalHandle()}</h2>
          </div>
        </div>
      </div>
      </>
    )
}
