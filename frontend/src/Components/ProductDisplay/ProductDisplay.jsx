import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import "./ProductDisplay.css";

const ProductDisplay = (props) => {
  const { product } = props;
const {addtoCart} = useContext(ShopContext);
  if (!product) return <div className="product-display">Loading product...</div>;

  return (
    <div className="product-display">
      <div className="productdisplay-left">
        <div className="productdisplay-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt=""
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(123)</p>
        </div>
        <div className="productdisplay-right-price">
            <div className="productdisplay-right-price-old">${product.old_price}
              
            </div>
            <div className="productdisplay-right-price-new">${product.new_price}
              
            </div>
        </div>
        <div className="productdisplay-right-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod a dignissimos cumque quo molestias ratione omnis alias, consequuntur similique commodi, nisi exercitationem dolores architecto id corporis eaque voluptatum beatae temporibus.</p>    
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>  
            </div>
            <button onClick={() => addtoCart(product.id)}> Add to Cart</button>
            <p className="productdisplay-right-category"><span>Category: </span> Women,T-Shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags: </span> Morden,Latest</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
