import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const browseButtonPressed = () => {
    navigate("/browse");
  };

  return (
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
  );
};

export default Home;
