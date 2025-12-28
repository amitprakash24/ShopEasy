import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

import removeIcon from "../Assets/cart_cross_icon.png";
import "./CartItems.css";
const CartItems = (props) => {
   // const { id, name, image, new_price } = props.data;
    const { allProducts, cartItems,  removeFromCart } = useContext(ShopContext);

      const getTotalCartAmount = () => {
  let total = 0;
  allProducts.forEach((product) => {
    if (cartItems[product.id] > 0) {
      total += cartItems[product.id] * product.new_price;
    }
  });
  return total;
};

const getTotalCartItems = () => {
  return Object.values(cartItems || {}).reduce((sum, v) => sum + v, 0);
};

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
      <p>Quantity</p>
      <p>Total</p>
      <p>Remove</p>
    </div>
    <hr />

    {allProducts.map((product) => {
      if (cartItems[product.id] > 0) {
        return (
          <div
            key={product.id}
            className="cartitems-format cartitems-format-main"
          >
            <img
              src={product.image}
              alt=""
              className="cartitems-product-icon"
            />
            <p>{product.name}</p>
            <p>${product.new_price}</p>
            <button className="cartitems-quantity">
              {cartItems[product.id]}
            </button>
            <p>${cartItems[product.id] * product.new_price}</p>
            <img
              src={removeIcon}
              alt="remove"
              onClick={() => removeFromCart(product.id)}
              className="cartitems-remove-icon"
            />
          </div>
        );
      }
      return null;
    })}

    <div className="cartitems-down">
      <div className="cartitems-total">
        <h1>Cart Totals</h1>

        <div className="cartitems-total-item">
          <p>Items</p>
          <p>{getTotalCartItems()}</p>
        </div>

        <div className="cartitems-total-item">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>

        <hr />

        <div className="cartitems-total-item">
          <p>Shipping Fee</p>
          <p>Free</p>
        </div>

        <hr />

        <div className="cartitems-total-item">
          <h3>Total</h3>
          <h3>${getTotalCartAmount()}</h3>
        </div>

        <button className="cartitems-proceed" onClick={() => window.location.href = '/checkout'}>Proceed to Checkout</button>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
export default CartItems;
