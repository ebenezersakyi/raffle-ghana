import React from "react";
import "./Testimony.css";

const Testimony = ({ data }) => {
  return (
    <div className="testimony__container">
      <span className="stars">
        {Array.from({ length: data.stars }, (_, index) => (
          <span key={index}>⭐️</span>
        ))}
      </span>
      <span className="t__text">{data.text}</span>
      <div className="person">
        <img src={data.image} alt="" className="t__img" />
        <span className="person__text">
          <span>{data.name}</span>
          <span style={{ color: "grey", fontSize: 11 }}>{data.location}</span>
        </span>
      </div>
    </div>
  );
};

export default Testimony;
