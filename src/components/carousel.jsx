import React, { useState } from "react";
import "./carousel.css";

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);

  const handleSetActiveClass = (e) => {
    e.preventDefault();
    e?.target?.parentElement?.parentElement?.parentElement?.children[2]?.classList.add(
      "active"
    );
    e?.target?.parentElement?.parentElement?.parentElement?.children[3]?.classList.add(
      "active"
    );
  };

  const handleSetInactiveClass = (e) => {
    e.preventDefault();
    e?.target?.parentElement?.parentElement?.parentElement?.children[2]?.classList.remove(
      "active"
    );
    e?.target?.parentElement?.parentElement?.parentElement?.children[3]?.classList.remove(
      "active"
    );
  };

  const handleDragStart = (e) => {
    if (e.type === "touchstart") {
      setDragStartX(e.touches[0].clientX);
    } else {
      setDragStartX(e.clientX);
    }
  };

  const handleDragMove = (e) => {
    if (dragStartX !== null) {
      let clientX;
      if (e.type === "touchmove") {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }
      const deltaX = clientX - dragStartX;
      if (deltaX > 50) {
        prevSlide();
        setDragStartX(null);
      } else if (deltaX < -50) {
        nextSlide();
        setDragStartX(null);
      }
    }
  };

  const handleDragEnd = (e) => {
    setDragStartX(null);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="carousel-container"
      onMouseMove={(e) => handleSetActiveClass(e)}
      onMouseLeave={(e) => handleSetInactiveClass(e)}
      onTouchStart={(e) => handleDragStart(e)}
      onTouchMove={(e) => handleDragMove(e)}
      onTouchEnd={(e) => handleDragEnd(e)}
    >
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="carousel-item" key={index}>
            <img
              className="carousel-img"
              src={image.imgPath}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? "active-dot" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <div className="carousel-btn prev-btn" onClick={prevSlide}>
        &#10094;
      </div>
      <div className="carousel-btn next-btn" onClick={nextSlide}>
        &#10095;
      </div>
    </div>
  );
}
