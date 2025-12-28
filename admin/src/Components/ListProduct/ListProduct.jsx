import React from "react";
import cross_icon from "../../assets/cross_icon.png";

import "./ListProduct.css";

const ListProduct = () => {
  const [allproducts, setAllproducts] = React.useState([]);

  const fatchinfo = async () => {
    try {
      const res = await fetch("http://localhost:4000/allproducts");
      const data = await res.json();
      setAllproducts(data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  React.useEffect(() => {
    fatchinfo();
  }, []);


//==========remove product function==========
    const removeproduct = async (id) => {
        await fetch("http://localhost:4000/removeproduct", {
            method: "POST",
            headers: {"Content-Type": "application/json"  },
            body: JSON.stringify({ id: id }),    

        });
        await fatchinfo();
    };



  return (
    <div className="list-product">
      <h2>All Product List</h2>
      <div className="list-product-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="list-product-format listproduct-formate">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => removeproduct(product.id)} src={cross_icon} className="listproduct-remove-icon" alt="remove" />
            </div>
            <hr />
          </React.Fragment>
        ))}

      </div>
    </div>
  );
};

export default ListProduct;
