/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./card.scss";
// eslint-disable-next-line react/prop-types
const Card = ({ card }) => {
  return (
    <div className="card">
      <Link to={`/${card.id}`} className="imageContainer">
        <img src={card.images[0]} alt="Card Photo" />
      </Link>

      <div className="textContainer">
        <h2 className="title">
          <Link to={card.id}>{card.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="pin" />
          <span>{card.address}</span>
        </p>
        <p className="price">{`$${card.price}`}</p>
        <div className="bottom">
          <div className="features">
            <img src="/bed.png" alt="bed" />
            <span>{card.bedroom} bedrooms</span>
          </div>
          <div className="features">
            <img src="/bath.png" alt="bath" />
            <span>{card.bathroom} bathrooms</span>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/chat.png" alt="chat" />
            </div>

            <div className="icon">
              <img src="/save.png" alt="chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
