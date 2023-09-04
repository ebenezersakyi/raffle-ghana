import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <div className="top__text">
        <h1 className="home__page__title">
          Win <span className="highlight">Your</span> Dream Home
        </h1>
        <p className="home__page__subtitle">
          Win the raffle, fund your property dreams!
        </p>
      </div>
      <img
        className="slider__only__image"
        src="https://raffle-house-production.s3-eu-west-1.amazonaws.com/properties/64d1d636d18cb60033afa5d9_1692876199557_xMmA1XXK.jpg"
        alt="dreamhome"
      ></img>
    </div>
  );
};

export default Home;
