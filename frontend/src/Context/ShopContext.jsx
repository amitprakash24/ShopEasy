import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 301; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    // fetch products with error handling and ensure we always set an array
    (async () => {
      try {
        const response = await fetch("http://localhost:4000/allproducts");
        const data = await response.json();
        if (Array.isArray(data)) {
          setAllProducts(data);
        } else {
          console.error('Failed to fetch products:', data);
          setAllProducts([]);
        }
      } catch (err) {
        console.error('Fetch products error:', err);
        setAllProducts([]);
      }
    })();

    if (localStorage.getItem("auth-token")) {
      (async () => {
        try {
          const res = await fetch("http://localhost:4000/getcart", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });
          const data = await res.json();
          setCartItems(data);
        } catch (err) {
          console.error('Fetch cart error:', err);
        }
      })();
    }
  }, []);

  // ADD TO CART
  const addtoCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // REMOVE FROM CART
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

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
    let count = 0;
    allProducts.forEach((product) => {
      if (cartItems[product.id] > 0) {
        count += cartItems[product.id];
      }
    });
    return count;
  };

  const contextValue = {
    allProducts,
    cartItems,
    addtoCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
