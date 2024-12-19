import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// Replace with your actual Google Maps API key
const API_KEY = "AIzaSyAbcpxulogJ_uzw3ZViviJ2NySqmUPestM";

const MapsAndPlacesAutocomplete = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadAutocomplete = () => {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"], // You can specify types here, e.g., "establishment" or "address"
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          window.alert("No details available for input: " + place.name);
          return;
        }

        // Center the map on the selected place
        if (place.geometry.viewport) {
          mapRef.current.fitBounds(place.geometry.viewport);
        } else {
          mapRef.current.panTo(place.geometry.location);
          mapRef.current.setZoom(17);
        }

        // Update the state with selected place details
        setSelectedPlace({
          name: place.name,
          address: place.formatted_address,
          location: place.geometry.location,
        });

        setIsInfoWindowOpen(true);
      });
    };

    // Wait for the map to load and then initialize autocomplete
    if (window.google) {
      loadAutocomplete();
    } else {
      window.addEventListener("google-maps-loaded", loadAutocomplete);
    }

    return () => {
      window.removeEventListener("google-maps-loaded", loadAutocomplete);
    };
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={{ lat: 40.749933, lng: -73.98633 }} // Default map center
          zoom={13}
          onLoad={(map) => (mapRef.current = map)}
        >
          <div style={{ padding: "20px", position: "absolute", zIndex: 1 }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter an address"
              style={{
                padding: "10px",
                width: "300px",
                fontSize: "16px",
                borderRadius: "5px",
              }}
            />
          </div>

          {selectedPlace && selectedPlace.location && (
            <Marker
              position={selectedPlace.location}
              ref={markerRef}
              onClick={() => setIsInfoWindowOpen(!isInfoWindowOpen)}
            />
          )}

          {isInfoWindowOpen && selectedPlace && selectedPlace.location && (
            <InfoWindow
              position={selectedPlace.location}
              onCloseClick={() => setIsInfoWindowOpen(false)}
            >
              <div>
                <strong>{selectedPlace.name}</strong>
                <br />
                <span>{selectedPlace.address}</span>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapsAndPlacesAutocomplete;
