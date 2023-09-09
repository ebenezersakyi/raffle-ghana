import React, { useEffect, useState } from "react";
import "./HouseDetails.css";

import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// const twilio = require("twilio");

const HouseDetails = () => {
  const Location = useLocation();
  const [house, setHouse] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [userLoggedIn, setLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  // const accountSid = process.env.REACT_APP_TWILO_SID;
  // const authToken = process.env.REACT_APP_TWILO_AUTH_TOKEN;
  // const twiloNumber = process.env.REACT_APP_TWILO_PHONE_NUMBER;

  // const client = twilio(accountSid, authToken);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        // console.log(user.email)
        // setUserEmail(user.email);
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              setPhoneNumber(userData.phoneNumber);
            }
          });
      } else {
        setLoggedIn(false);
      }
    });

    // console.log("props", Location.state);
    setHouse(Location.state.data);
    setMainImage(Location.state.data.houseImage[0]);
  }, []);

  const buyticket = () => {
    if (!userLoggedIn) {
      alert("Please log in");
    } else {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const min = 1000;
    const max = 2000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    try {
      const response = await fetch(
        `https://real-estate-app-api-2.vercel.app/send-sms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: `Your code is ${randomNumber}`,
            to: phoneNumber,
          }),
        }
      );
      const responseData = await response.json();
      // console.log("data", responseData);
      if (responseData.success) {
        alert(`SMS sent! Your code is: ${randomNumber}`);
      }
      // setMessage(response.data.message);
    } catch (error) {
      // setMessage("Error sending SMS");
      console.error(error);
    }
  };

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
          <p>Price: GH¢ {house.price.toLocaleString()}</p>
          <p>Type: {house.homeType}</p>
          {/* <p>Type: {house.description}</p> */}
          {/* <p>For Sale: {house.forSale ? "Yes" : "No"}</p> */}
          {/* <p>House or Land: {house.houseOrLand}</p> */}
          {/* <div className="deet_inpt">
            <input
              className="inpt"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              // value={formData.phoneNumber}
              // onChange={handleChange}
              // placeholder="eg: +233 123 4567 890"
              required
              autoComplete="on"
            />
          </div> */}
          <p>Bedrooms: {house.beds || "Not specified"}</p>
          {/* Add more details as needed */}
          <span className="ticket__price">Ticket price: GH¢ 10.00</span>
          {/* <div className="buy__section"> */}
          <button onClick={buyticket} className="buy-button">
            Buy Ticket
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
