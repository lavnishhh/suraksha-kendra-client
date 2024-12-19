import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../controllers/firebase/main";


const db = getFirestore(app);

export default function VolunteerList() {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <h1>Volunteer List</h1>
            {volunteers.length === 0 ? (
                <p>No volunteers found.</p>
            ) : (
                <ul>
                    {volunteers.map((volunteer) => (
                        <li key={volunteer.id}>
                            <strong>{volunteer.name}</strong>: {volunteer.contactNumber}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
