import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

import Card from "../common/card/Card.jsx";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { BeatLoader } from "react-spinners";
import Carousel from "../common/carousel/Carousel";
import HeroIntro from "../common/heroIntro/HeroIntro";
import Testimony from "../common/testimony/Testimony";

const Home = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [housesToRender, setHouseToRender] = useState([]);
  const [dbHouses, setDbHouses] = useState([]);
  const scrollContainerRef = useRef(null);

  const browseButtonPressed = () => {
    navigate("/browse");
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.muted = true; // Mute the video to meet autoplay requirements
      video.autoplay = true;
      video.loop = true; // If you want the video to loop continuously
      video.src =
        "https://cdn.shopify.com/videos/c/o/v/e861b00cb62e40189c37865de5d68453.mp4"; // Replace with the actual path to your video file

      // Handle any errors during video loading
      video.onerror = (error) => {
        console.error("Error loading the video:", error);
      };
    }
  }, []);

  useEffect(() => {
    getData();
    fetchHousesWithinBoundary();
  }, []);

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
        // console.log("houses", updatedHouses); // Log the updated state here
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  };

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
    <div className="main__container">
      <div className="home__container">
        <div className="top__text">
          <h1 className="home__page__title">Win Your Dream Home!</h1>
          {/* <h1 className="home__page__title">
            Win <span className="highlight">Your</span> Dream Home!
          </h1> */}
          <p className="home__page__subtitle">
            Win the raffle, fund your property dreams!
          </p>
          <button onClick={browseButtonPressed} className="enter__now">
            Browse houses
          </button>
        </div>
        <div className="img__top__layer"></div>

        {/* <img
          className="slider__only__image"
          src="https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg"
          alt="dreamhome"
        /> */}
        {/* <video
          data-src="https://cdn.shopify.com/videos/c/o/v/e861b00cb62e40189c37865de5d68453.mp4"
          style="z-index: 1"
          className="slider__only__image"
          muted
          loop
          playsinline
          autoplay={true}
          data-embed-responsive=""
          data-width="default"
          src="https://cdn.shopify.com/videos/c/o/v/e861b00cb62e40189c37865de5d68453.mp4"
        ></video> */}
        <video ref={videoRef} playsInline className="slider__only__image" />
        {/* <source
            src="https://cdn.shopify.com/videos/c/o/v/e861b00cb62e40189c37865de5d68453.mp4"
            type="video/mp4"
          /> */}
        {/* Your browser does not support the video tag. */}
        {/* </video> */}
        <div className="hero__icons">
          <span className="icons">
            <img
              className="icons__img"
              src="https://www.svgrepo.com/show/448460/guide.svg"
              alt=""
            />
            <span>Rules</span>
          </span>
          <span className="icons">
            <img
              className="icons__img"
              src="https://www.svgrepo.com/show/528992/gallery-wide.svg"
              alt=""
            />
            <span>Gallery</span>
          </span>
        </div>
      </div>

      <HeroIntro />

      <div className="properties__for__you">
        <div className="for__you__text">
          <span className="trending__now">Trending now</span>
          <span className="play__to__win">Play to win!</span>
        </div>
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
        {loadingHouses ? (
          <div
            style={{
              width: "100%",
              padding: "15px 0px 15px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BeatLoader color="black" size={25} />
          </div>
        ) : (
          <ul
            // ref={listRef}
            className="scroll__container"
          >
            {housesToRender.slice(0, 10).map((item, index) => {
              const idenHouse = dbHouses.filter((item2, index) => {
                return item2._id == item._id;
              });

              console.log("idenHouse", idenHouse);
              return (
                <ui key={index}>
                  <div key={item._id} className="card__container">
                    {dbHouses.length > 0 && (
                      <Card firebaseHouseData={idenHouse} item={item} />
                    )}
                  </div>
                </ui>
              );
            })}
          </ul>
        )}

        {/* <Carousel
          slides={[
            "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg",
            "https://firebasestorage.googleapis.com/v0/b/asasefie-43161.appspot.com/o/post%2FlnSVTqEtgBb7NMUlOAy4V9UAfRu1%2F0.nxka4l2zri9?alt=media&token=56a84e28-8464-4b54-b5b0-275abe762397",
            "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg",
            "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg",
            // Add more image URLs as needed
          ]}
        /> */}
      </div>

      <div className="testiomnies">
        <div className="for__you__text">
          <span className="trending__now">Player Testimonials</span>
          {/* <span className="play__to__win">Play to win!</span> */}
        </div>
        <div style={{ display: "flex" }}>
          {testimonyData.map((item, index) => {
            return <Testimony data={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

const testimonyData = [
  {
    stars: 5,
    text: "Win Big game is quite simple to play. So simple and fun that I gave it to my wife and brother to try it also. They found it easy to play too.",
    image:
      "https://www.ugoflip.com/_next/image?url=https%3A%2F%2Fugoflip-cms.fra1.digitaloceanspaces.com%2F1c6211204f71a0e85a0ff0c56f5fb625.png&w=128&q=75",
    name: "John Doe",
    location: "Tema, Accra",
  },
  {
    stars: 5,
    text: "Win Big game is quite simple to play. So simple and fun that I gave it to my wife and brother to try it also. They found it easy to play too.",
    image:
      "https://www.ugoflip.com/_next/image?url=https%3A%2F%2Fugoflip-cms.fra1.digitaloceanspaces.com%2F1c6211204f71a0e85a0ff0c56f5fb625.png&w=128&q=75",
    name: "John Doe",
    location: "Tema, Accra",
  },
  {
    stars: 5,
    text: "Win Big game is quite simple to play. So simple and fun that I gave it to my wife and brother to try it also. They found it easy to play too.",
    image:
      "https://www.ugoflip.com/_next/image?url=https%3A%2F%2Fugoflip-cms.fra1.digitaloceanspaces.com%2F1c6211204f71a0e85a0ff0c56f5fb625.png&w=128&q=75",
    name: "John Doe",
    location: "Tema, Accra",
  },
];
