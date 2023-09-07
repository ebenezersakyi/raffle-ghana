import React, { useState, useEffect } from "react";
import "./Header.css";

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { Link, useNavigate } from "react-router-dom";
// import {
//   Add,
//   AppRegistration,
//   Key,
//   Login,
//   Money,
//   Search,
//   Sell,
// } from "@mui/icons-material";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     setLoggedIn(true);
    //     // console.log(user.email)
    //     setUserEmail(user.email);
    //   } else {
    //     setLoggedIn(false);
    //   }
    // });
  }, []);

  // const navToSearchPage = () => {
  //   setIsOpen(false);
  //   navigate("/search", {
  //     state: {
  //       coords: {
  //         lat: 5.6376136,
  //         lng: -0.1266064,
  //       },
  //     },
  //   });
  // };

  return (
    <>
      <nav className="nav__container">
        <div className="middle__section">
          <a href="/" className="title__text">
            <span>
              Ghana<span className="highlight">Raffle</span>
            </span>
          </a>
        </div>

        <div className="right__section">
          <p>
            <a href="/auth" className="auth__nav">
              Announcements
            </a>
          </p>

          {loggedIn ? (
            <a href="/profile" className="profile__avatar">
              {/* <AccountCircleIcon fontSize="large" /> */}
            </a>
          ) : (
            <p>
              <a href="/auth" id="sign__in" className="auth__nav">
                Sign in
              </a>
            </p>
          )}
          <img
            onClick={handleButtonClick}
            src="https://www.svgrepo.com/show/506246/menu-hamburger.svg"
            alt=""
          />
        </div>
      </nav>

      <div className={`menu ${isOpen ? "open" : "close"}`}>
        <div className="nav__container__menu">
          <div className="left__section">
            <img
              onClick={handleButtonClick}
              src="https://www.svgrepo.com/show/500510/close.svg"
              alt=""
            />
          </div>

          <div className="middle__section">
            <a href="/" className="title__text">
              <span>
                Ghana<span className="highlight">Raffle</span>
              </span>
            </a>
          </div>

          <div></div>
        </div>

        <ul>
          <a
            onClick={() => setIsOpen(false)}
            href="/profile"
            className="auth__nav"
          >
            <li>
              {/* <Sell fontSize="large" className="menu__icon" /> */}
              Announcements
            </li>
          </a>
          {!loggedIn ? (
            <>
              <a
                onClick={() => setIsOpen(false)}
                href="/auth"
                className="auth__nav"
              >
                <li>
                  {/* <Login fontSize="large" className="menu__icon" /> */}
                  Login
                </li>
              </a>
            </>
          ) : null}
        </ul>
      </div>
    </>
  );
}

export default Header;
