import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { spinner } from "../constants/spinner";

// Fix for missing markers in deployment
const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

L.Marker.prototype.options.icon = defaultIcon;

const LocationPicker = ({ onPositionChange }) => {
    const [position, setPosition] = useState(null);

    const getUserLocation = async () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported by this browser."));
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        });
    };

    useEffect(() => {
        getUserLocation()
            .then((location) => {
                console.log("User's Location:", location);
                setPosition({ latitude: location.latitude, longitude: location.longitude });
            })
            .catch((error) => {
                console.error("Error fetching location:", error);
                setPosition({ latitude: 12.980216112573299, longitude: 77.59734868843226 });
            });
    }, []);

    useEffect(() => {
        onPositionChange(position);
    }, [position]);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                console.log(lat, lng);
                setPosition({ latitude: lat, longitude: lng });
            },
        });

        return position ? <Marker position={[position.latitude, position.longitude]} /> : null;
    };

    return (
        <>
            <div className="my-3">
                {position == null ? (
                    <div className="flex">
                        {spinner}
                        <div className="ms-2">Fetching Location</div>
                    </div>
                ) : (
                    <div>{`${position.longitude} ${position.latitude}`}</div>
                )}
            </div>
            <MapContainer
                center={[position ? position.latitude : 12.980216112573299, position ? position.longitude : 77.59734868843226]}
                zoom={10}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                <LocationMarker />
            </MapContainer>
        </>
    );
};

export default LocationPicker;
