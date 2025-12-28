import React from "react";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import "./Hero.css";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {   
    return (
        
        <div className="hero">
            <div className="hero-left">
                <h2>NEW ARRIVAL ONLY </h2>
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Collections</p>
                <p>Collections For Every one</p>
                <div className="hero-letest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>
            </div>
            

            <div className="hero-right">
                <img src={hero_image} alt="" />
            </div>
           
        </div>


    );
}

export default Hero;    