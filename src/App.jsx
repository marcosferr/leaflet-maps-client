import { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import MarcadorMapa from "./components/MarcadorMapa";
function App() {
  const [markers, setMarkers] = useState([]); //data from nasa api
  const url =
    "https://firms.modaps.eosdis.nasa.gov/api/country/csv/tuapikey/VIIRS_SNPP_NRT/PRY/1/2023-10-03";

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/785/785116.png",
    iconSize: [40, 40],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };
  const fetchNasaData = async () => {
    const response = await fetch(url);
    const text = await response.text();
    const { data } = Papa.parse(text, { header: true });
    //Turn data into markers and set the state We receive latitude and longitude from the data
    setMarkers(
      data.map((item) => {
        return {
          geocode: [item.latitude, item.longitude],
          popUp: `Brightness: ${item.bright_ti4}`,
        };
      })
    );
  };
  useEffect(() => {
    fetchNasaData();
  }, []);

  return (
    <>
      <MapContainer
        center={[-25.2637, -57.5759]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="Google Maps"
          //Mapas alternativos
          // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
          // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
          url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        {/* <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        > */}
        {markers.map((marker, index) => {
          return (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          );
        })}
        {/* </MarkerClusterGroup> */}
      </MapContainer>
      <MarcadorMapa />
    </>
  );
}

export default App;
