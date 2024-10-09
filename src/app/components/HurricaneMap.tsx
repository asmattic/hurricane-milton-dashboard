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
  iconSize: [20, 20], // Adjust the size of the icon as needed
  iconAnchor: [16, 32], // Anchor the icon appropriately
  popupAnchor: [0, -32], // Position of the popup relative to the icon
});

type HurricanePoint = {
  coordinates: [number, number],
  icons: [{
    icon_data: {
      date: string,
      aircraft_pres: string,
      temp: string,
      dew: string,
      wind: {
        direction: string,
        speed_knots: number
      },
      rain_rate: string
    },
    icon_code: number
  }]
};
/*
const exampleFormat = [{
  "metadata": {},
  "objects": [
    {
      "coordinates": [
        27.833333333333332,
        -87.4
      ],
      "icons": [
        {
          "icon_data": {
            "date": "11:52:00 UTC",
            "aircraft_pres": "595.3 mb",
            "temp": "37.0°F",
            "dew": "26.8°F",
            "wind": {
              "direction": "30°",
              "speed_knots": 44.71
            },
            "rain_rate": "N/A mm/hr"
          },
          "icon_code": 0
        }
      ]
    },]
}]*/

export default function HurricaneMap() {
  const { data, isLoading, error } = useQuery({ queryKey: ['hurricaneData'], queryFn: fetchHurricaneData, refetchInterval: 10000 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <MapContainer center={new L.LatLng(24.2333, -92.7)} zoom={5} style={{ height: '800px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.objects.map((hurricanePoint: HurricanePoint, index: number) => (
        <Marker key={index} position={[hurricanePoint.coordinates[0], hurricanePoint.coordinates[1]]} icon={hurricaneIcon}>
          <Popup>
            <div>
              <p>Date: {hurricanePoint.icons[0].icon_data.date}</p>
              <p>Pressure: {hurricanePoint.icons[0].icon_data.aircraft_pres}</p>
              <p>Temp: {hurricanePoint.icons[0].icon_data.temp}°F</p>
              <p>Wind: {hurricanePoint.icons[0].icon_data.wind.direction} @ {hurricanePoint.icons[0].icon_data.wind.speed_knots} knots</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}