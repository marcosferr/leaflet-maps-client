import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap, useMapEvents } from "react-leaflet";

//Con map. locate podemos obtener la ubicacion del usuario
const LocationMarker = ({ setMarker }) => {
  const map = useMapEvents({
    click: (e) => {
      setMarker(e.latlng);
      console.log(e.latlng);
      map.locate();
    },
    locationfound: (location) => {
      console.log("location found:", location);
      map.flyTo(location.latlng, map.getZoom());
      setMarker(location.latlng);
    },
  });
  return null;
};

const SimpleExample = () => {
  const [marker, setMarker] = useState({ lat: 51.505, lng: -0.09 });

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <LocationMarker setMarker={setMarker} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />

      <Marker position={marker}>
        <Popup>
          <span>
            A pretty CSS3 popup. <br /> Easily customizable.
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SimpleExample;
