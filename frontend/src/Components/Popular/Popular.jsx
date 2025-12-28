import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";
//import data_product from "../Assets/data";   coming forom the local


const Popular = () => {
  
  const [popularPorducts ,setPopularProducts]= useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen')
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data))


  },[])


  return (
    <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-items">
            {/* {data_product.map((item, i) => (    insteed of data_product replace with popularProducts */  }
            {popularPorducts.map((item, i) => (
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
};

export default Popular;
