import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
 import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {

      const[menu,setMenu]= useState("shop");
      const { cartItems } = useContext(ShopContext);
      const totalCount = Object.values(cartItems || {}).reduce((sum, v) => sum + v, 0);
      const menuRef = React.useRef();
      const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open");
      } 
 
      return (


      <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>ShopEasy</p>
        </div>
        <img src={nav_dropdown} alt="" onClick={dropdown_toggle} className="nav-dropdown"/>
        <ul ref={menuRef} className="nav-menu">
            <li  onClick={()=>setMenu("shop")}> <Link style={{textDecoration:'none'}} to="/">Shop</Link> {menu === "shop" ? <hr />:<></>}</li>
            <li onClick={()=>setMenu("men")}> <Link style={{textDecoration:'none'}} to="/men">Men</Link> {menu === "men" ? <hr />:<></>}</li>
            <li onClick={()=>setMenu("women")}> <Link style={{textDecoration:'none'}} to="/women">Women</Link>{menu === "women" ? <hr />:<></>}</li>
            <li onClick={()=>setMenu("kids")}> <Link style={{textDecoration:'none'}} to="/kids">Kid</Link>{menu === "kids" ? <hr />:<></>}</li>

        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
          
          :   <Link  state={{textDecoration:'none'}} to="/login"><button>Login</button></Link>
          
          }
         
          <div className="nav-cart-wrapper">
            <Link to="/cart"><img src={cart_icon} alt="" /></Link>
            {totalCount > 0 && <div className="nav-cart-count">{totalCount}</div>}
          </div>
        </div>
    

      </div>

  );
};      
export default Navbar;