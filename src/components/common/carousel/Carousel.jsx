import React, { Component } from "react";
import "./Carousel.css";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.slides = [
      // Add your carousel slides here
      <div>Slide 1</div>,
      <div>Slide 2</div>,
    ];
    this.interval = null;
  }

  componentDidMount() {
    // Start the auto-scrolling interval
    this.startAutoScroll();
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts
    clearInterval(this.interval);
  }

  startAutoScroll = () => {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds (adjust as needed)
  };

  nextSlide = () => {
    const { currentIndex } = this.state;
    const nextIndex = (currentIndex + 1) % this.slides.length;
    this.setState({ currentIndex: nextIndex });
  };

  render() {
    const { currentIndex } = this.state;

    return (
      <div className="carousel">
        <div className="carousel-wrapper">
          {this.slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              }`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
