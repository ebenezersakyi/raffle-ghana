import React, { useEffect, useState } from "react";
import "./HouseDetails.css";

import { useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { PaystackButton } from "react-paystack";

// const twilio = require("twilio");

const HouseDetails = () => {
  const Location = useLocation();
  const navigate = useNavigate();

  const [house, setHouse] = useState(null);
  const [firebaseHouseData, setFirebaseHouseData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [userLoggedIn, setLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [numberOfTicketsSold, setNumberOfTicketsSold] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  // const [ticketNumer, setTicketPrice] = useState(0);

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  // const amount = 1000000; // Remember, set in kobo!
  const [email, setEmail] = useState("");
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const [newTickets, setNewTickets] = useState([]);

  const componentProps = {
    email,
    amount: ticketPrice * ticketQuantity * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    currency: "GHS",
    text: "Buy Now",
    onclick: () => {
      setShowCheckout(false);
    },
    // onSuccess: () => {
    //   // addToFirebase();
    //   for (let i = 0; i < ticketQuantity; i++) {
    //     addToFirebase();
    //   }
    //   sendMessage();
    //   alert("Thanks for doing business with us! Come back soon!!");
    // },
    onSuccess: () => {
      try {
        for (let i = 0; i < ticketQuantity; i++) {
          addToFirebase();
        }
        sendMessage();
        setNumberOfTicketsSold(
          parseInt(numberOfTicketsSold) + parseInt(ticketQuantity)
        );
        alert("Thanks for doing business with us! Come back soon!!");
      } catch (error) {
        console.error("Error:", error);
        // Handle the error here
      }
    },

    onClose: () => {},
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  useEffect(() => {
    // console.log("Location.state.data._id", Location.state.data._id);
    firebase
      .firestore()
      .collection("houses") // Replace "houses" with your collection name
      .doc(Location.state.data._id) // Use the correct document ID
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          console.log("Document data:", doc.data());
          setFirebaseHouseData(doc.data());
          setNumberOfTicketsSold(data.ticketsSold.length);
          setTicketPrice(data.price);
        } else {
          console.log("Document does not exist");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });

    // randomNumber();
    // setNumberOfTicketsSold(Location.state.ticketsSold);
    // randomTicketPrice();
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
              setEmail(userData.email);
              setPhone(userData.phoneNumber);
              setName(userData.name);
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
    } else if (ticketQuantity == 0 || ticketQuantity == undefined) {
      alert("Please enter a ticket quantity");
    } else {
      setShowCheckout(true);
    }
    // if (!userLoggedIn) {
    //   alert("Please log in");
    // } else if (ticketQuantity == 0) {
    //   alert("Please enter a ticket quantity");
    // } else {
    //   sendMessage();
    // }
    // navigate("/checkout");
  };

  const min = 100000;
  const max = 200000;

  function getRandomNumberNotInArray() {
    const arr = firebaseHouseData.ticketsSold;
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while ([...arr, ...newTickets].includes(randomNumber));
    setNewTickets([...newTickets, randomNumber]);
    return randomNumber;
  }

  const addToFirebase = (item) => {
    const docRef = firebase
      .firestore()
      .collection("houses")
      .doc(Location.state.data._id);

    // const newTicketData = {
    //   ticketNumber: getRandomNumberNotInArray(),
    // };
    const newTicketData = getRandomNumberNotInArray();

    docRef
      .update({
        ticketsSold: firebase.firestore.FieldValue.arrayUnion(newTicketData),
      })
      .then(() => {
        console.log("Ticket added successfully!");
      })
      .catch((error) => {
        console.error("Error adding ticket: ", error);
      });
  };

  const sendMessage = async () => {
    setShowCheckout(false);
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
      // const response = await fetch(process.env.REACT_APP_SMS_API, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     body: `Number of tickets purchased: ${ticketQuantity} \nTotal cost: GH¢ ${(
      //       ticketPrice * ticketQuantity
      //     ).toLocaleString()}.00 \nCode: ${
      //       ticketQuantity > 1 ? multipleCodes.join(", ") : randomNumber
      //     }`,
      //     to: phoneNumber,
      //   }),
      // });

      const response = await fetch("https://deywuro.com/api/sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // body: `Number of tickets purchased: ${ticketQuantity} \nTotal cost: GH¢ ${(
          //   ticketPrice * ticketQuantity
          // ).toLocaleString()}.00 \nCode: ${
          //   ticketQuantity > 1 ? multipleCodes.join(", ") : randomNumber
          // }`,
          // to: phoneNumber,
          userName: "ebenezersakyi_",
          password: "705b0f",
          destinaton: phoneNumber,
          source: "Efie Akensie",
          message: `Number of tickets purchased: ${ticketQuantity} \nTotal cost: GH¢ ${(
            ticketPrice * ticketQuantity
          ).toLocaleString()}.00 \nCode: ${
            ticketQuantity > 1 ? multipleCodes.join(", ") : randomNumber
          }`,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        alert(`SMS sent!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const randomNumber = () => {
    const min = 10000;
    const max = 50000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    // setNumberOfTicketsSold(randomNumber);
    // return {randomNumber: randomNumber.toLocaleString(), percentage: (randomNumber/100000)&100}
  };

  const randomTicketPrice = () => {
    const min = 10;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setTicketPrice(randomNumber);
    setAmount(randomNumber);
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
      {showCheckout && (
        <div className="checkout__div">
          <div onClick={() => setShowCheckout(false)} className="close__btn">
            X
          </div>
          <div className="checkout__box">
            <div className="checkout-field">
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {name ? (
              <PaystackButton className="paystack-button" {...componentProps} />
            ) : null}
          </div>
        </div>
      )}
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
                type="number"
                // id="phoneNumber"
                // name="phoneNumber"
                placeholder="Quantity"
                required
                min={1}
                // autoComplete=''
                value={ticketQuantity}
                onChange={(e) => {
                  setTicketQuantity(e.target.value);
                  setAmount(ticketPrice * e.target.value);
                }}
              />
            </div>
            <span className="total">
              Total:{" "}
              <b>GH¢ {(ticketPrice * ticketQuantity).toLocaleString()}.00</b>
            </span>
            <button onClick={buyticket} className="buy-button">
              Buy Ticket
            </button>
            {/* <PaystackButton className="paystack-button" {...componentProps} /> */}
          </div>
          {/* <div className="buy__section"> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
