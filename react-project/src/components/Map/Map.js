import "./Map.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

let display;
const Map = () => {
  const mapLocations = useSelector((state) => state.location.mapLocations);
  const userLocation = useSelector((state) => state.location.userLocation);

  if (mapLocations.length === 0) {
    display = false;
  } else {
    display = true;
  }

  return (
    <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!display && (
        <Marker
          className="marker"
          position={[userLocation.lat, userLocation.lng]}
        >
          <Popup>
            <h2>Aligarh</h2>
            <br />
            <p>Search places neraby Aligarh</p>
          </Popup>
        </Marker>
      )}
      {display &&
        mapLocations.map((res, i) => (
          <Marker
            className="markers"
            key={i}
            position={[res.location.y, res.location.x]}
          >
            <Popup>
              <h2>{res.address}</h2>
              <br />
              <p>{res.attributes.Place_addr}</p>
            </Popup>
          </Marker>
        ))}
      ;
    </MapContainer>
  );
};

export default Map;
