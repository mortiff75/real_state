/* eslint-disable react/prop-types */
import { useState } from "react";
import "./slider.scss";
const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);

  const handleSlider = (type) => {
    if (type === "right") {
      setImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else {
      setImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }
  };

  return (
    <div className="slider">
      {/* Full Slider */}

      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <img
              src="/arrow.png"
              alt="Next"
              onClick={() => handleSlider("left")}
            />
          </div>
          <div className="images">
            <img src={images[imageIndex]} alt="Photo" />
          </div>
          <div className="arrow" onClick={() => handleSlider("right")}>
            <img src="/arrow.png" alt="Next" className="right" />
          </div>

          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      {/* End */}
      <div className="bigImage">
        <img
          src={images[0]}
          alt="House Image"
          onClick={() => setImageIndex(0)}
        />
      </div>

      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt="House Image"
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
