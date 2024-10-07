"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import { fetchHurricaneData } from '../api/hurricaneFetcher';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from '../assets/airplane.png'
// Define a custom icon for the marker
const hurricaneIcon = new L.Icon({
  iconUrl: icon.src, // Replace this with the actual path to your icon image
  iconSize: [32, 32], // Adjust the size of the icon as needed
  iconAnchor: [16, 32], // Anchor the icon appropriately
  popupAnchor: [0, -32], // Position of the popup relative to the icon
});

type HurricanePoint = {
  latitude: number;
  longitude: number;
  data: {
    date: string;
    pressure: number;
    temp: number;
    wind: {
      direction: number;
      speed: number;
    };
  };
};

export default function HurricaneMap() {
  const { data, isLoading, error } = useQuery({ queryKey: ['hurricaneData'], queryFn: fetchHurricaneData, refetchInterval: 10000 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <MapContainer center={new L.LatLng(24.2333, -92.7)} zoom={5} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((hurricanePoint: HurricanePoint, index: number) => (
        <Marker key={index} position={[hurricanePoint.latitude, hurricanePoint.longitude]} icon={hurricaneIcon}>
          <Popup>
            <div>
              <p>Date: {hurricanePoint.data.date}</p>
              <p>Pressure: {hurricanePoint.data.pressure} mb</p>
              <p>Temp: {hurricanePoint.data.temp}°F</p>
              <p>Wind: {hurricanePoint.data.wind.direction}° @ {hurricanePoint.data.wind.speed} knots</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}