import React from "react";
import "./HeroIntro.css";

const HeroIntro = () => {
  return (
    <div className="intro__main">
      <div className="intro__container">
        <div className="intro__item">
          <img
            className="intro__logo"
            src="https://www.svgrepo.com/show/532544/location-pin-alt.svg"
            alt=""
          />
          <span className="main__text">LOCATION</span>
          <span className="content">
            All of our houses are located in Ghana and carefully selected so
            that you can enjoy your dream home by the sea
          </span>
        </div>
        <div className="intro__item">
          <img
            className="intro__logo"
            src="https://www.svgrepo.com/show/413863/deliver.svg"
            alt=""
          />
          <span className="main__text">100% HOUSE DELIVERED</span>
          <span className="content">A transparent and guaranteed draw</span>
        </div>
        <div className="intro__item">
          <img
            className="intro__logo"
            src="https://www.svgrepo.com/show/152282/luck.svg"
            alt=""
          />
          <span className="main__text">MORE CHANCES</span>
          <span className="content">
            With a limited number of tickets available you can maximise your
            probability of winning, starting with only GHS2
          </span>
        </div>
        <div className="intro__item" id="no__border">
          <img
            className="intro__logo"
            src="https://www.svgrepo.com/show/447928/charity.svg"
            alt=""
          />
          <span className="main__text" id="chg__clr">
            CHARITIES
          </span>
          <span className="content" id="col__content">
            With every purchase you are contributing to building a better
            future.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroIntro;
