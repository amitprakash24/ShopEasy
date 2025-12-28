import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
const Item = (props) => {
 return (
    <div >
      <div className="item">

     <Link to={`/product/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={props.image}
            alt={props.name || ''}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="%23f3f3f3"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial" font-size="20">No Image</text></svg>';
            }}
          />
        </Link>  
        <p>{props.name}</p>
        <div className="item-proces">
            <div className="item-prices">
                <div className="item-price-new">
                    ${props.new_price}
                </div>
                <div className="item-price-new">
                    ${props.old_price}
                </div>
            </div>
        </div>
      </div>
    </div>
    )


};
     
export default Item;

