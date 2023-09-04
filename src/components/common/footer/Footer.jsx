import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">Ghana Raffle</div>
        <div className="footer-links">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Rules</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="footer-social">
        <a href="#" className="social-icon">
          Facebook
        </a>
        <a href="#" className="social-icon">
          Twitter
        </a>
        <a href="#" className="social-icon">
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
