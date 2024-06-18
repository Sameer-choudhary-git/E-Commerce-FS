import React from 'react'
import './CartItems.css'
import { useContext } from 'react';
import { ShopContext } from '../../Context/shopContext';
import remove_icon from "../Assets/cart_cross_icon.png"

const CartItems = () => {
    const token = localStorage.getItem('token');

    const removeFromCart = async (itemid) => {
        if (token) {
            let headersList = {
                "Content-Type": "application/json",
                "token": token,
                Accept: "application/json"
               }
               
               let bodyContent = JSON.stringify({
                   "itemid": itemid
               });
               
               let response = await fetch("http://localhost:8080/api/removeFromCart", { 
                 method: "POST",
                 body: bodyContent,
                 headers: headersList
               });
               
               let data = await response.text();
               console.log(data);
               
        }
    };

    const {cartItems,getTotalCartAmount} = useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        <div>
            
            
        {cartItems.map((item) => (
                    <div key={item.id}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={item.image} alt="img" className='carticon-product-icon' />
                            <p>{item.name}</p>
                            <p>{item.new_price}</p>
                            <button className='cartitems-quantity'>{item.quantity}</button>
                            <p>${item.new_price * item.quantity}</p>
                            <img className='cartitem-remove-item' src={remove_icon} onClick={ async () => { await removeFromCart(item.id); 
                                window.location.reload();
                             }} alt="" />
                        </div>
                        <hr />
                    </div>
                ))}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>if have a promocode</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder="Enter your promocode" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default CartItems