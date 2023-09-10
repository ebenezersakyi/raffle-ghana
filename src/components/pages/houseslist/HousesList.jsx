import React, { useEffect, useRef, useState } from "react";
import "./HousesList.css";
import { BeatLoader } from "react-spinners";
import Card from "../../common/card/Card.jsx";

const HousesList = () => {
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
            return <Card key={index} item={item} />;
          })}
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default HousesList;
