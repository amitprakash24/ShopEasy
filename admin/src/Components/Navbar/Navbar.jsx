import React from "react";
import "./Navbar.css";
import navbarlogo from "../../assets/nav-logo2.svg";
import navprofile from "../../assets/nav-profile.svg";

const Navbar = () => {
    return (
        <div className="navbar">
            <img className="nav-logo" src={navbarlogo} alt="Logo" />
            <img className="nav-profile" src={navprofile} alt="Profile" />

        </div>
    );
}
export default Navbar;