import React, { useContext } from "react";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import {useParams} from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DiscriptionBox/DiscriptionBox";
import ReleatedProduct from "../Components/ReleatedProduct/ReleatedProduct";

const Product = () => {
  
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
 const product = allProducts?.find((item) => item.id === Number(productId));
  return (
    <div> 
      <Breadcrum product={product}/>
      <ProductDisplay product={product} />
      <DescriptionBox />
      <ReleatedProduct />
    </div>
    );
};

export default Product;