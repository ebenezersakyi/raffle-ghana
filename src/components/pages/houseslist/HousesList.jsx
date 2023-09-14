import React, { useEffect, useRef, useState } from "react";
import "./HousesList.css";
import { BeatLoader } from "react-spinners";
import Card from "../../common/card/Card.jsx";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const HousesList = () => {
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [housesToRender, setHouseToRender] = useState([]);
  const [dbHouses, setDbHouses] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    getData();
    fetchHousesWithinBoundary();
  }, []);

  const data = [
    [-0.14577104681994246, 5.704431552659266],
    [-0.22542192572619246, 5.704431552659266],
    [-0.22542192572619246, 5.606719220138464],
    [-0.14577104681994246, 5.606719220138464],
    [-0.14577104681994246, 5.704431552659266],
  ];

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

        setDbHouses(updatedHouses); // Update the state with the new data
        console.log("houses", updatedHouses); // Log the updated state here
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  };

  const fetchHousesWithinBoundary = async () => {
    try {
      const apiResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/houseswithinboundary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const data2 = await apiResponse.json();
      // console.log("data from api", data2.data);
      // if (data2.data.length !== 0) {
      // setInitialHouseRender(10);
      filter(data2.data);
      // setLoadingHouses(false);
      // } else {
      //   setLoadingHouses(false);
      // }
    } catch (error) {
      setLoadingHouses(false);
      console.log(error);
    }
  };

  // const randomTicketPrice = () => {
  //   const min = 10;
  //   const max = 100;
  //   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //   return randomNumber;
  // };

  const filter = (data) => {
    const removeUndefined = data.filter((item) => {
      return (
        item !== undefined &&
        item.houseOrLand == "House" &&
        item.forSale == true
      );
    });

    // for (let i = 0; i < removeUndefined.length; i++) {
    //   firebase
    //     .firestore()
    //     .collection("houses")
    //     .doc(removeUndefined[i]._id)
    //     .set({
    //       price: randomTicketPrice(),
    //       location: removeUndefined[i].country,
    //       ticketsSold: [],
    //       winningCode: "",
    //     });
    // }

    // console.log("removeUndefined", removeUndefined);
    setHouseToRender(removeUndefined.slice(0, 50));
    setLoadingHouses(false);
  };

  return (
    <div className="browse__container">
      <div className="container__search__page">
        <div className="results__count">
          {loadingHouses ? null : (
            <>
              <span>
                {/* <b>{housesToRender.length}</b> results */}
                <b>Browse houses</b>
              </span>
            </>
          )}
        </div>

        {loadingHouses ? (
          <div className="loading__continer">
            <BeatLoader size={30} color="black" />{" "}
          </div>
        ) : null}

        <div
          ref={scrollContainerRef}
          //   onScroll={() => handleScroll("flipped")}
          className="property__results__section__list"
        >
          {housesToRender.slice(0, 50).map((item, index) => {
            const idenHouse = dbHouses.filter((item2, index) => {
              return item2._id == item._id;
            });
            // console.log("idenHouse", idenHouse);
            // console.log("housesToRender", housesToRender);
            return (
              <Card firebaseHouseData={idenHouse} key={index} item={item} />
            );
          })}
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default HousesList;
