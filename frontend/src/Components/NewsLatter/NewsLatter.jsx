import React from "react";

import "./NewLatter.css";

const NewsLatter = () => { 
    return (
        <div className="newsletter">
            <h1>Get Excusive Offers on Your Email </h1>
            <p>Get the latest news and updates right at your inbox.</p>
            <div className="newsletter-input">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
            </div>
        </div>
    );
}
export default NewsLatter;