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
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [numberOfTicketsSold, setNumberOfTicketsSold] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  useEffect(() => {
    // randomNumber();
    setNumberOfTicketsSold(Location.state.ticketsSold);
    randomTicketPrice();
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
    } else if (ticketQuantity == 0) {
      alert("Please enter a ticket quantity");
    } else {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const min = 1000;
    const max = 2000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    let multipleCodes = [];
    if (ticketQuantity > 1) {
      for (let i = 0; i < ticketQuantity; i++) {
        const min = 1000;
        const max = 2000;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        multipleCodes.push(randomNumber);
      }
    }
    try {
      const response = await fetch(
        `https://real-estate-app-api-2.vercel.app/send-sms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: `Number of tickets purchased: ${ticketQuantity} \nTotal cost: GH¢ ${(
              ticketPrice * ticketQuantity
            ).toLocaleString()}.00 \nCode: ${
              ticketQuantity > 1 ? multipleCodes.join(", ") : randomNumber
            }`,
            to: phoneNumber,
          }),
        }
      );
      const responseData = await response.json();
      // console.log("data", responseData);
      if (responseData.success) {
        setNumberOfTicketsSold(
          parseInt(numberOfTicketsSold) + parseInt(ticketQuantity)
        );
        alert(`SMS sent! Your code is: ${randomNumber}`);
      }
      // setMessage(response.data.message);
    } catch (error) {
      // setMessage("Error sending SMS");
      console.error(error);
    }
  };

  const randomNumber = () => {
    const min = 10000;
    const max = 50000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumberOfTicketsSold(randomNumber);
    // return {randomNumber: randomNumber.toLocaleString(), percentage: (randomNumber/100000)&100}
  };

  const randomTicketPrice = () => {
    const min = 10;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setTicketPrice(randomNumber);
    // return {randomNumber: randomNumber.toLocaleString(), percentage: (randomNumber/100000)&100}
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
          {/* <h2>{house.country}</h2> */}
          <span className="desc__items">
            Location <span className="desc__items__blw">{house.country}</span>
          </span>
          {/* <p>Price: GH¢ {house.price.toLocaleString()}</p> */}
          <span className="desc__items">
            Number of tickets <span className="desc__items__blw">100,000</span>
          </span>
          <span className="desc__items">
            Number of tickets sold
            <span className="desc__items__blw">
              {numberOfTicketsSold.toLocaleString()}
              <span className="percentage">
                ({((numberOfTicketsSold / 100000) * 100).toFixed(0)}%)
              </span>
            </span>
          </span>
          <span className="desc__items">
            Ticket price{" "}
            <span className="desc__items__blw">GH¢{ticketPrice}.00</span>
          </span>

          {/* <span className="ticket__price">Ticket price: GH¢10.00</span> */}

          <div className="deet_inpt">
            <div className="qty">
              <span>Quantity: </span>
              <input
                className="inpt"
                type="text"
                // id="phoneNumber"
                // name="phoneNumber"
                placeholder="Quantity"
                required
                // autoComplete=''
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(e.target.value)}
              />
            </div>
            <span className="total">
              Total:{" "}
              <b>GH¢ {(ticketPrice * ticketQuantity).toLocaleString()}.00</b>
            </span>
            <button onClick={buyticket} className="buy-button">
              Buy Ticket
            </button>
          </div>
          {/* <div className="buy__section"> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
