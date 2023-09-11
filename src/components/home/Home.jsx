import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

import Card from "../common/card/Card.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [housesToRender, setHouseToRender] = useState([]);
  const scrollContainerRef = useRef(null);

  const browseButtonPressed = () => {
    navigate("/browse");
  };

  useEffect(() => {
    fetchHousesWithinBoundary();
  }, []);

  const data = [
    [-0.14577104681994246, 5.704431552659266],
    [-0.22542192572619246, 5.704431552659266],
    [-0.22542192572619246, 5.606719220138464],
    [-0.14577104681994246, 5.606719220138464],
    [-0.14577104681994246, 5.704431552659266],
  ];

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

  const filter = (data) => {
    const removeUndefined = data.filter((item) => {
      return (
        item !== undefined &&
        item.houseOrLand == "House" &&
        item.forSale == true
      );
    });
    console.log("removeUndefined", removeUndefined);
    setHouseToRender(removeUndefined.slice(0, 50));
    setLoadingHouses(false);
  };

  return (
    <div className="main__container">
      <div className="home__container">
        <div className="top__text">
          <h1 className="home__page__title">
            Win <span className="highlight">Your</span> Dream Home
          </h1>
          <p className="home__page__subtitle">
            Win the raffle, fund your property dreams!
          </p>
        </div>
        <div className="img__top__layer"></div>

        <button onClick={browseButtonPressed} className="enter__now">
          Browse houses
        </button>
        <img
          className="slider__only__image"
          src="https://raffle-house-production.s3-eu-west-1.amazonaws.com/properties/64d1d636d18cb60033afa5d9_1692876199557_xMmA1XXK.jpg"
          alt="dreamhome"
        />
      </div>

      <div className="properties__for__you">
        <p
          style={{
            marginTop: 5,
            marginBottom: 0,
            fontWeight: "bold",
            letterSpacing: 1,
            fontFamily: "sans-serif",
            fontSize: 20,
          }}
        >
          Trending now
        </p>
        {/* <p style={{ marginTop: 5, marginBottom: 0, color: "GrayText" }}>
          {locIndex.area}
        </p> */}
        {/* <div className="scroll__container">
          <button
            className="scroll__buttons"
            // onClick={() => handleButtonClick("left")}
          >
            {"<"}
          </button>
          <button
            className="scroll__buttons"
            // onClick={() => handleButtonClick("right")}
          >
            {">"}
          </button>
        </div> */}
        <ul
          // ref={listRef}
          style={{ display: "flex", flexDirection: "row", overflow: "scroll" }}
        >
          {housesToRender.slice(0, 10).map((item, index) => {
            return (
              <ui>
                <div key={item._id} className="card__container">
                  <Card item={item} />
                </div>
              </ui>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
