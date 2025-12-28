import React from "react";
import footer_logo from "../Assets/logo_big.png";
import facebook_icon from "../Assets/pintester_icon.png";
import twitter_icon from "../Assets/instagram_icon.png";
import instagram_icon from "../Assets/instagram_icon.png";
import piptrest_icon from "../Assets/pintester_icon.png";
import whatapp_icon from "../Assets/whatsapp_icon.png";


import "./Footer.css";
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="Footer Logo" />
                <p>ShopEasy</p> 
            </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <img src={facebook_icon} alt="Facebook" />
                <img src={twitter_icon} alt="Twitter" />
                <img src={instagram_icon} alt="Instagram" />    
  
                <img src={piptrest_icon} alt="Piptrest" />
                <img src={whatapp_icon} alt="WhatsApp" />
            </div>
        </div>
        <div className="footer copyright">
            <hr />
            <p>&copy; 2026 ShopEasy. All rights reserved.</p>
        </div>
        </div>
    );
}
export default Footer;
