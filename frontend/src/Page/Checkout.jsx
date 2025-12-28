import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/Checkout.css";

const Checkout = ({ isModal = false, onClose }) => {
  const { allProducts, cartItems, getTotalCartAmount } = useContext(ShopContext);

  const itemsInCart = allProducts.filter((p) => cartItems[p.id] > 0);

  const placeOrder = () => {
    // Dummy action — no backend call
    alert("Order placed (demo). Thank you!");
    if (typeof onClose === 'function') onClose();
  };

  return (
    <div className={`checkout ${isModal ? 'modal' : ''}`}>
      <div className="checkout-container">
        {isModal && (
          <button className="checkout-close" onClick={() => onClose && onClose()} aria-label="Close">×</button>
        )}
        <h1>Checkout</h1>

        <div className="checkout-grid">
          <div className="checkout-left">
            <h2>Shipping Details</h2>
            <div className="checkout-form">
              <input placeholder="Full name" />
              <input placeholder="Address" />
              <input placeholder="City" />
              <input placeholder="Postal code" />
              <input placeholder="Phone" />
            </div>
            <h2>Payment</h2>
            <div className="checkout-payment">
              <p>This is a demo checkout flow — no real payment will be taken.</p>
              <input placeholder="Card number" />
              <input placeholder="Expiry" />
              <input placeholder="CVC" />
            </div>
            <button className="checkout-placeorder" onClick={placeOrder}>
              Place Order (Demo)
            </button>
          </div>

          <div className="checkout-right">
            <h2>Order Summary</h2>
            <div className="checkout-summary">
              {itemsInCart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                itemsInCart.map((item) => (
                  <div key={item.id} className="checkout-summary-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="cs-name">{item.name}</p>
                      <p>
                        {cartItems[item.id]} x ${item.new_price} = ${
                          cartItems[item.id] * item.new_price
                        }
                      </p>
                    </div>
                  </div>
                ))
              )}

              <hr />

              <div className="checkout-total">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>

              <div className="checkout-total">
                <p>Shipping</p>
                <p>Free</p>
              </div>

              <div className="checkout-total total-final">
                <p>Total</p>
                <p>${getTotalCartAmount()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
