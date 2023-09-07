import React, { useEffect, useState } from "react";
import "./HouseDetails.css";

import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const HouseDetails = () => {
  const Location = useLocation();
  const [house, setHouse] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  useEffect(() => {
    console.log("props", Location.state);
    setHouse(Location.state.data);
    setMainImage(Location.state.data.houseImage[0]);
  }, [house]);

  if (house == null) {
    return (
      <div className="results__count">
        <BeatLoader size={15} color="black" />
      </div>
    );
  }

  return (
    <div className="details__container">
      <div className="house-details">
        <div className="image-carousel">
          <img
            className="main-image"
            src={mainImage}
            alt={`House in ${house.country}`}
          />
          <div className="thumbnail-images">
            {house.houseImage.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                className="thumbnail"
                onClick={() => handleThumbnailClick(imageUrl)}
              />
            ))}
          </div>
        </div>
        <div className="house-info">
          <h2>{house.country}</h2>
          <p>Price: ${house.price}</p>
          <p>Type: {house.homeType}</p>
          <p>For Sale: {house.forSale ? "Yes" : "No"}</p>
          <p>House or Land: {house.houseOrLand}</p>
          <p>Bedrooms: {house.beds || "Not specified"}</p>
          {/* Add more details as needed */}
          <button className="buy-button">Buy Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
