import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social">
        <img
          src={require("../../../assets/logo.png")}
          alt=""
          className="logo__footer"
        />
        <p>Follow us: </p>
        <div className="icons__div">
          <a href="">
            <img
              className="social__logo"
              src="https://www.svgrepo.com/show/512399/instagram-167.svg"
              alt=""
            />
          </a>
          <a href="">
            <img
              className="social__logo"
              src="https://www.svgrepo.com/show/509274/twitter.svg"
              alt=""
            />
          </a>
          <a href="">
            <img
              className="social__logo"
              src="https://www.svgrepo.com/show/509923/facebook.svg"
              alt=""
            />
          </a>
          <a href="">
            <img
              className="social__logo"
              src="https://www.svgrepo.com/show/463367/tiktok.svg"
              alt=""
            />
          </a>
          <a href="">
            <img
              className="social__logo"
              src="https://www.svgrepo.com/show/509293/youtube.svg"
              alt=""
            />
          </a>
        </div>
        {/* <p>© 2023 Asasefie</p> */}
      </div>
      <div className="footer__links">
        <a href="">Our Winners</a>
        <a href="">Draw Results</a>
        <a href="">Privacy Policy</a>
        <a href="">Terms of Service</a>
        <a href="">Contact Us</a>
      </div>
      <div className="copyright">
        <span>© 2023 EfieAkensie</span>
      </div>
    </footer>
  );
};

export default Footer;
