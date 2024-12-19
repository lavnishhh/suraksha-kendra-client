import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const uploadReport = async (latitude, longitude, type) => {
  try {
    const db = getFirestore();
    const locationData = {
      latitude,
      longitude,
      type,
      timestamp: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "reports"), locationData);
    console.log("Location uploaded with ID:", docRef.id);
  } catch (error) {
    console.error("Error uploading report:", error);
  }
};


export const fetchReports = async () => {
  const db = getFirestore();
  const reportsRef = collection(db, "reports");
  const snapshot = await getDocs(reportsRef);
  const heatmapData = [];

  snapshot.forEach((doc) => {
    const { latitude, longitude } = doc.data();
    heatmapData.push([latitude, longitude, 1]); // 1 is the intensity
  });

  return heatmapData;
};


export const fetchUser = async () => {
  const db = getFirestore();
  const reportsRef = collection(db, "user");
  const snapshot = await getDocs(reportsRef);
  const heatmapData = [];

  snapshot.forEach((doc) => {
    const { latitude, longitude } = doc.data();
    heatmapData.push([latitude, longitude, 1]); // 1 is the intensity
  });

  return heatmapData;
};