import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function IPMap({ipaddress}) {
  const [ipAddresses, setIpAddresses] = useState([]);
  const [markers, setMarkers] = useState([]);
  console.log(ipaddress)
  useEffect(() => {
 
    const fetchCoordinates = async () => {
      try {
        const coordinatesPromises = ipAddresses.map(async (ip) => {
        //   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${ip}&format=json`);

          const response = await fetch(
            `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=ec2e3f89e6d84d45a6ad3d6556398bbf`,
            {method: "GET"}
          )

          const data = await response.json();
          if (data && data?.location?.latitude) {
            return {
              ip,
              lat:  data.location.latitude,
              lon:  data.location.longitude,
            };
          }
          return null;
        });
        const coordinates = await Promise.all(coordinatesPromises);
        setMarkers(coordinates.filter((marker) => marker !== null));
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [ipAddresses]);


  useEffect(() => {
    setIpAddresses(ipaddress?.data?.ipaddress?.map((data)=>(
        data.address
    )));
    console.log(ipaddress?.data?.ipaddress?.map((data)=>(
        data.address
    )))
  }, [ipaddress]);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' ,zIndex:0,position:'relative'}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {markers.map((marker) => (
        <Marker key={marker.ip} position={[marker.lat, marker.lon]}>
          <Popup>{marker.ip}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default IPMap;
