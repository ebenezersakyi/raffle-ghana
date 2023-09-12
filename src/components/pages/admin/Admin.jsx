import React, { useEffect, useState } from "react";
import "./Admin.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Admin = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    getData(); // Call the function to fetch data when the component mounts
  }, []);

  const getData = () => {
    const db = firebase.firestore();
    const housesCollection = db.collection("houses");

    housesCollection
      .get()
      .then((querySnapshot) => {
        const updatedHouses = [];
        querySnapshot.forEach((item) => {
          const data2 = item.data();
          updatedHouses.push({
            _id: item.id,
            location: data2.location,
            price: data2.price,
            ticketsSold: data2.ticketsSold,
            winningCode: data2.winningCode,
          });
        });

        setHouses(updatedHouses); // Update the state with the new data
        //   console.log("houses", updatedHouses); // Log the updated state here
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  };

  const addWinningCode = (item) => {
    const min = 100000;
    const max = 200000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const docRef = firebase.firestore().collection("houses").doc(item._id);

    docRef
      .update({
        winningCode: randomNumber,
      })
      .then(() => {
        getData();
        alert(`Code added successfully! \nCode: ${randomNumber}`);
        console.log(`Code added successfully! \nCode: ${randomNumber}`);
      })
      .catch((error) => {
        console.error("Error adding Code: ", error);
      });
  };

  return (
    <div className="admin__container">
      <div className="properties__container">
        {houses.map((item, index) => {
          return (
            <div key={index} className="property__divs">
              {/* <img src={item.houseImage[0]} alt="" className="ann__img" /> */}
              <div className="ann__details">
                <span className="main">
                  <b>Ticket price: </b>GH¢{" "}
                  {parseInt(item.price).toLocaleString()}
                </span>
                <span className="ann__deet">{item.location}</span>
                <span className="ann__deet">
                  <b>{item.ticketsSold.length}</b> tickets sold
                </span>
                {item.winningCode.length !== 0 ? (
                  <span className="ann__deet">
                    Winning code: <b>{item.winningCode}</b>
                  </span>
                ) : null}
                <span className="ann__deet">
                  {/* Winning code: <span className="main">{randomCode()}</span> */}
                </span>
                {item.winningCode.length == 0 ? (
                  <div
                    className="end__tbn"
                    onClick={() => addWinningCode(item)}
                  >
                    <span>End</span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
