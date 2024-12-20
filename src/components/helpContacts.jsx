import React, { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../controllers/firebase/main";
import LocationPicker from "./location_picker";


const db = getFirestore(app);

export default function VolunteerList() {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const position = useRef({latitude: 12.97194, longitude: 77.59369})

    useEffect(() => {
        async function fetchVolunteers() {
            try {
                const q = query(collection(db, "users"), where("type", "==", "volunteer"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setVolunteers(data);
            } catch (err) {
                console.error("Error fetching volunteers:", err);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        }

        fetchVolunteers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div><LocationPicker onPositionChange={(change) => { position.current = change }}></LocationPicker></div>
            <h1>Volunteer List</h1>
            {volunteers.length === 0 ? (
                <p>No volunteers found.</p>
            ) : (
                <ul>
                    {volunteers.map((volunteer) => (
                        <li key={volunteer.id}>
                            <strong>{volunteer.name}</strong>: {volunteer.contactNumber} <a href={`sms:+91${volunteer.contactNumber}?body=Hello, please help. I am at https://www.google.com/maps/@${position.current.latitude},${position.current.longitude},2239m}!`}>Send SMS</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
