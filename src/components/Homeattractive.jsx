import React from "react";
import "../assets/style.css";
import "../assets/mediaquery.css";

const HomeAttractive = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="main">
        <div className="area">
          <h1>
            WELCOME TO MOVIEHUB<br />
            WATCH TRAILERS & DISCOVER MOVIES
          </h1>
          <h3>Your hub for movie trailers, short and long descriptions.</h3>
        </div>
      </div>

      {/* TV Section */}
      <div className="container1">
        <div className="text">
          <h1>Watch trailers on your TV</h1>
          <p>
            Explore high-quality trailers on Smart TVs, PlayStation, Xbox, Apple TV, and more.
          </p>
        </div>
        <div className="image">
          <img
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
            alt="TV"
          />
        </div>
      </div>

      {/* Multi-device Section */}
      <div className="container1">
        <div className="text">
          <h1>Available Everywhere</h1>
          <p>
            Access MovieHub on your phone, tablet, laptop, and TV — anytime, anywhere.
          </p>
        </div>
        <div className="image">
          <img
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
            alt="Devices"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footercon">
          <div className="flex1">
            <h5>Questions? Email us at support@moviehub.com</h5>
          </div>

          <ul className="list1">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Watch Trailers</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <ul className="list1">
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Feedback</a></li>
          </ul>
          <ul className="list1">
            <li><a href="#">Account</a></li>
            <li><a href="#">Saved Trailers</a></li>
            <li><a href="#">Cookie Preferences</a></li>
            <li><a href="#">Legal Info</a></li>
          </ul>
        </div>
      </div>

      <div className="end">
        <h2>MovieHub India</h2>
      </div>
    </>
  );
};

export default HomeAttractive;
