import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { spinner } from "../constants/spinner";

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

    useEffect(()=>{
        getUserLocation()
        .then((location) => {
            console.log("User's Location:", location);
        })
        .catch((error) => {
            console.error("Error fetching location:", error);
            setPosition({latitude: 77.74964332580566, longitude: 12.975703954271719})
        });
    }, [])

    useEffect(()=>{
        onPositionChange(position)
    }, [position])


    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                console.log(lat)
                console.log(lng)
                setPosition({ latitude: lat, longitude: lng });
            },
        });

        return position ? <Marker position={[position.latitude, position.longitude]} /> : null;
    };

    return (
        <>
            <div className="my-3">
                {position == null ? 
                    <div className="flex">{spinner}<div className="ms-2">Fetching Location</div></div>:
                    <div>{`${position.longitude} ${position.latitude}`}</div>} 
            </div>
            <MapContainer center={[position?.latitude ? position.latitude: 51.505, position?.longitude ? position?.longitude: -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker />
            </MapContainer>
        </>
    );
};

export default LocationPicker;