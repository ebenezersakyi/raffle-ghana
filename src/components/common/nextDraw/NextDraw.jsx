import React from "react";
import "./NextDraw.css";

const NextDraw = () => {
  return (
    <div className="nextdraw__container">
      <span className="title">Next Draw</span>
      <div className="time">
        <span className="item" id="border">
          <span className="number">4</span>
          <span>Days</span>
        </span>
        <span className="item" id="border">
          <span className="number">6</span>
          <span>Hours</span>
        </span>
        <span className="item">
          <span className="number">36</span>
          <span>Minutes</span>
        </span>
      </div>
      <button className="join__btn">Join</button>
    </div>
  );
};

export default NextDraw;
