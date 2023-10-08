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
  const [showFilter, setShowFilter] = useState(false);
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

    console.log("removeUndefined", removeUndefined);
    setHouseToRender(removeUndefined.slice(0, 50));
    setLoadingHouses(false);
  };

  return (
    <>
      <div className="browse__container">
        <div className="container__search__page">
          <div className="results__count">
            {loadingHouses ? null : (
              <div className="top__section">
                <span>
                  {/* <b>{housesToRender.length}</b> results */}
                  <b>Browse houses</b>
                </span>
                <div
                  onClick={() => setShowFilter(true)}
                  className="all__filter__botton"
                >
                  <p>All filters</p>
                  <img
                    src="https://www.svgrepo.com/show/509905/dropdown-arrow.svg"
                    alt=""
                  />
                </div>
              </div>
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
              // console.log("idenHouse", item);
              // console.log("housesToRender", housesToRender);
              return (
                <>
                  {dbHouses.length > 0 && (
                    <Card
                      firebaseHouseData={idenHouse}
                      key={index}
                      item={item}
                    />
                  )}
                </>
              );
            })}
            {/* <Footer /> */}
          </div>
        </div>
      </div>

      {showFilter && (
        <div className="auth__container">
          <div className="auth__box">
            {/* <form className="signin-form" onSubmit={handleSubmit}>
              <h2>Sign In</h2>
              <div className="input-container">
                <label>E-mail</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="on"
                  className="auth__input"
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="on"
                  className="auth__input"
                />
              </div>
              {!haveAccount && (
                <>
                  <div className="input-container">
                    <label>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      autoComplete="on"
                      className="auth__input"
                    />
                  </div>
                  <div className="input-container">
                    <label>Phone number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="eg: +233 123 4567 890"
                      required
                      autoComplete="on"
                      className="auth__input"
                    />
                  </div>
                </>
              )}
              <span
                onClick={() => {
                  setHaveAccount(!haveAccount);
                }}
                className="toggle__account__state"
              >
                {haveAccount
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign In"}
              </span>
              <button type="submit">Sign In</button>
            </form> */}
            <span className="signin-form">Filters</span>
          </div>
          <div onClick={() => setShowFilter(false)} className="close__btn">
            X
          </div>
        </div>
      )}
    </>
  );
};

export default HousesList;
