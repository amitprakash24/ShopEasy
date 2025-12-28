import React, { useState } from "react";
import "./DiscriptionBox.css";

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="descriptionbox">
      {/* Tabs */}
      <div className="descriptionbox-navigator">
        <div
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </div>
        <div
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews (123)
        </div>
      </div>

      {/* Content */}
      <div className="descriptionbox-content">
        {activeTab === "description" ? (
          <p>
            This stylish striped flutter sleeve blouse is crafted from premium
            fabric for all-day comfort. The overlap collar and peplum hem add a
            modern feminine touch, making it perfect for casual and formal wear.
          </p>
        ) : (
          <p>
            ⭐⭐⭐⭐☆ <br />
            Customers love the fit and quality. Soft fabric, great design, and
            perfect sizing.
          </p>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
