/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Pin = ({ marker }) => {
  return (
    <Marker
      key={marker.latitude}
      position={[marker.latitude, marker.longitude]}
    >
      <Popup>
        <div className="popupContainer">
          <img src={marker.images[0]} alt="marker photo" />
          <div className="textContainer">
            <Link to={`/${marker.id}`}>{marker.title}</Link>
            <span className="bed">{marker.bedroom} bedroom</span>
            <b className="price">${marker.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
