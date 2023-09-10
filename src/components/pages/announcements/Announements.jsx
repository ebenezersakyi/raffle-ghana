import React, { useEffect, useRef, useState } from "react";
import "./Announcements.css";
import { BeatLoader } from "react-spinners";

const Announements = () => {
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [housesToRender, setHouseToRender] = useState([]);
  const scrollContainerRef = useRef(null);

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
      //   console.log("data from api", data2.data);
      if (data2.data.length !== 0) {
        // setInitialHouseRender(10);
        filter(data2.data);
        // setLoadingHouses(false);
      } else {
        setLoadingHouses(false);
      }
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
    // console.log("removeUndefined", removeUndefined);
    setHouseToRender(removeUndefined.slice(0, 50));
    setLoadingHouses(false);
  };

  const randomCode = () => {
    const min = 1000;
    const max = 2000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };

  return (
    <div className="announ__container">
      <h2>Announcements</h2>
      <div className="content__container">
        <div className="results__count">
          {loadingHouses ? (
            <BeatLoader size={10} color="black" />
          ) : (
            <>
              <span className="title__itm">
                {/* <b>{housesToRender.length}</b> results */}
                <b>End of draw</b>
              </span>
            </>
          )}
        </div>

        <div className="properties__container">
          {housesToRender.slice(0, 10).map((item, index) => {
            return (
              <div className="property__divs">
                <img src={item.houseImage[0]} alt="" className="ann__img" />
                <div className="ann__details">
                  <span className="main">
                    <b>Value: </b>GH¢ {parseInt(item.price).toLocaleString()}
                  </span>
                  <span className="ann__deet">{item.country}</span>
                  {/* <span className="ann__deet">{item.homeType}</span> */}
                  <span className="ann__deet">
                    Winning code: <span className="main">{randomCode()}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Announements;
