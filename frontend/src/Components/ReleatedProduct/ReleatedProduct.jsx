import React from "react";

import "./ReleatedProduct.css";
import related_products from "../Assets/data";
import Item from "../Item/Item";    

const ReleatedProduct = () => {
    return (
        <div className="related-products">
            <h1>RELATED PRODUCTS</h1>
            <hr />
            <div className="related-items">
             {related_products.map((item, i) => (
                <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}
                />
             ))}   
            </div>  
        </div>
    );
}


export default ReleatedProduct;
