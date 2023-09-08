import React, { useState, useEffect } from "react";
import "./Header.css";

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);
  const [showAuthDialogue, setShowAuthDialogue] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });

  const { signup } = useAuth();
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        // console.log(user.email)
        setUserEmail(user.email);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (haveAccount) {
      userLogin();
    } else {
      userRegister();
    }
    // Add your sign-in logic here
  };

  const userLogin = async () => {
    try {
      await login(formData.email, formData.password)
        .then((result) => {
          setShowAuthDialogue(false);

          // history("/");
          // console.log(result)
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert("Error :", error);
    }
  };

  const userRegister = async () => {
    try {
      await signup(formData.email, formData.password)
        .then(async (result) => {
          try {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                email: formData.email,
                // _id: data2.data._id,
                phoneNumber: formData.phoneNumber,
              });
            setShowAuthDialogue(false);
          } catch (error) {
            console.log(error);
          }

          // history("/");
          // console.log(result);
        })
        .catch((error) => {
          alert(error.message);
          // setLoading(false);
        });
    } catch (error) {
      alert("Error :", error);
      // setLoading(false);
    }
  };

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

  // const Auth = () => {
  //   return (

  //   );
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
              <img
                style={{ width: 50, height: 50, borderRadius: 360 }}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAYFBMVEX////MzMxNTU3R0dHIyMhKSkr39/dGRkb8/Pzn5+fU1NRBQUHc3Nzs7Ow+Pj7h4eFkZGQ4ODiTk5OgoKBWVla3t7dcXFxzc3OsrKyBgYFqamozMzOLi4u9vb17e3umpqYN9S91AAAD/UlEQVRoge2a65KiMBCFBxIIBMQgoIiOvv9bbnCccQZP5wJo1Vbl/N2Bb/uS7k7jx0dQUFBQUFBQUJBNWZZqZdk7kelmW0rGolFMlttN+gZ8lpcs4tEf8YiV+WvZm3LCfMB5uXkZNp+aOjU8fwl2a6Te2dvVsbmd+qV1rU6lg7l3o2W6HtfZ3HWNzko/bsTLVc5Wyoj3s1H4n9Zwd0pRu2a3azoKvZicwqyS3aWohBBFVVw6Cd29kAy5MlJ1Et+V1CpCVi8jIz8zvot/sDd0vOMIvYCcgffJayziiUSyQ385P7fBOeKDSKbcET2AmJRzufnzy/j+ydw7eQ/+eGYlQQFWBHeMNLB5XpifjwlrKoqrbT4/x5nN4aICvUfx/TZ5Dx6Y4+zntxgNjuOqAantn9nb55fIg8FgbfIB1DD/yQCkCm/N4BY9s4LB0aeRq8mf4CHfKINXRF1hBhcdesqPuwFeY70xt3R29SC7uN/Ui4YO1tgsRmntVzgz1A1ngrnPiQJVWoOvNldfIdgnvfB4Ny+5fHyN+rDWp5mLj5P2lLuviQGPt2YwKiCj3HsUOkyjlLlyoS4ReR0oVLZGn1nAihh13es1cXU4WmIcH/Fz7tkFJ2VLUxwFG6Puaq5cnNSWpnhzNmqMHmmdQYcxS06PauF/2RmMr2nczo3RwBe5nyfiGLuA8ZPLwNJ8mEYlCsZ4IdjanKj25A7GyWUt1Vq4WDuPmkSPsPo6GbCn3bsE8fzO1o/RnTHyKCBUyeTKPNArore4l0yiSehRwHSF6agtjXuToNqiqT+RvcmnLRIVRIPpep0cKLDHIECktQYfafCRfMhjzKR2eYYiQhUPv8GaXF7ymgLX5ArdZ7yFA/3N5IHwdTKQueV1RSZ9Td2f4L3J29OGAyXxOJC0uNp5X9rgNfUGxr6mynTke00l04uYvIhpK5qxiyB8zS4YfCFC7L2KIIf6M1yxoSXXPIOpKLMdBhMd0TfCo0CUmZQl5epSSsCetc2cpgtj18tAbZySdrhcn74TzFopTnoUk70SIqGbRCKE6idWz9yV/1pIMN4ouKj+Cxeq+bWsn7s2fhROxndtYcXe0EX7+E4we1H+kckfrAv1Sz9onz48VTpiz7EH9oaOz1zn2bLPMP1QkUt5WqIa+oUfnrYnp9hOlZwWf0nOkzkWJyt8Ud0ozxDrIKtVfi+Qnq3Lj7+qzmt9u+6Fh7uF6FfCam0HZ6OrYd0fKHSFU6SLqlsVq5U1J/tG4NS84gcwWR/XpttiHfcv+90NP9Y1alKJqOuj/3jlo5SfVVUXujF/SxR1tT8v/TTvxM55czyofau1V4djw/M3UB/4dKOVvhMZFBQUFBQUFPS/6h99ITd40h9XeQAAAABJRU5ErkJggg=="
                alt=""
              />
              {userEmail}
            </a>
          ) : (
            <p>
              <span
                onClick={() => setShowAuthDialogue(!showAuthDialogue)}
                id="sign__in"
                className="auth__nav"
              >
                Sign in
              </span>
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
                onClick={() => setShowAuthDialogue(true)}
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

      {showAuthDialogue && (
        <div className="auth__container">
          <div className="auth__box">
            <form className="signin-form" onSubmit={handleSubmit}>
              <h2>Sign In</h2>
              <div className="input-container">
                <label>E-mail</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="on"
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="on"
                />
              </div>
              {!haveAccount && (
                <div className="input-container">
                  <label>Phone number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    autoComplete="on"
                  />
                </div>
              )}
              <span
                onClick={() => {
                  setHaveAccount(!haveAccount);
                }}
                className="toggle__account__state"
              >
                {haveAccount
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign In"}
              </span>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div
            onClick={() => setShowAuthDialogue(false)}
            className="close__btn"
          >
            X
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
