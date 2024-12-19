import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const uploadReport = async (latitude, longitude, type) => {
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

export default uploadReport;