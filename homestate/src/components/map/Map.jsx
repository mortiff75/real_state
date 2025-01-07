/* eslint-disable react/prop-types */
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
// eslint-disable-next-line react/prop-types
const MyMap = ({ markers }) => {
  return (
    <MapContainer
      center={
        markers.length == 1
          ? [markers[0].latitude, markers[0].longitude]
          : [51.505, -0.09]
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => (
        <Pin key={marker[0]} marker={marker} />
      ))}
    </MapContainer>
  );
};

export default MyMap;
