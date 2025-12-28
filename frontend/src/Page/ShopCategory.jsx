import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';


import "./CSS/ShopCategory.css";

const ShopCategory = ({ category, banner }) => {
  const { allProducts } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img src={banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
        Sort by <img src={dropdown_icon} alt="" />
      </div>
      </div>
      
      <div className="shopcategory-products">
        {Array.isArray(allProducts) ? (
          allProducts.filter(item => (item.category || '').toString().toLowerCase() === category.toLowerCase()).length > 0 ? (
            allProducts
              .filter((item) => (item.category || '').toString().toLowerCase() === category.toLowerCase())
              .map((item, i) => (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              ))
          ) : (
            <p>No products found in this category.</p>
          )
        ) : (
          <p>Loading products...</p>
        )}
      </div>
 <div className="shopcategory-loadmore">
            Explore More
          </div>
    </div>
  );
};

export default ShopCategory;
