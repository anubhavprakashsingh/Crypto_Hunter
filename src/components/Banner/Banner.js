import React from "react";
import Carousel from "./Carousel";
const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="tagline">
          <h1 style={{ fontSize: "60px" }}>Crypto Hunter</h1>
          <p style={{ fontWeight: 100 }}>
            Get All The Info Regarding Your Favorite Crypto Currency
          </p>
        </div>
        <Carousel />
      </div>
    </div>
  );
};

export default Banner;
