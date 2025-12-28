import React from "react";
import"./Addproduct.css";
import upload_area from "../../assets/upload_area.svg";


const AddProduct = () => {
    const [image,setImage] = React.useState(false);
    const [productDetails,setProductDetails] = React.useState({
        name: "",
        image: "",
        category: "Women",
        old_price: "",
        new_price : ""
      
    });

    const imageHandler = (e) => {
       
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value});
    };

    const Add_product= async() => {
   
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append("product", image);
        await fetch("http://localhost:4000/upload", {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data"
                accetp: "application/json",
            },
            body: formData,
        })
        .then((res) => res.json())     
        .then((data) => {
            responseData = data;
            console.log("response data", responseData);
        });
       if(responseData.success){
        product.image = responseData.imageUrl;  
        console.log("final product details", product);  
        await fetch("http://localhost:4000/addproducts", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        }).then((res) => res.json()).then((data) => {
            data.success ? alert("Product added successfully") : alert("Error in adding product");
        })
        
        
        ;
    }
}

    return (
        <div className="add-product">
           <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler}   name="name" type="text" placeholder="Type here" />
         </div>

        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name ="old_price" placeholder="Type here" />
                
            </div>
        </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Offer price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name ="new_price" placeholder="Type here" />
                
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                <option value="Women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
            </select>
                
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
            <img src={image ? URL.createObjectURL(image) : upload_area} className= "add-product-thumnail-img" alt="" />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
        </div>
        <button onClick={Add_product} className="addproduct-btn">Add Product</button>
     </div>
    );
};
export default AddProduct;