import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GLOBAL_ERROR_STATE } from "../../constants/constsants";

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


export async function fetchUserById(id) {
  try {
    const db = getFirestore();
    console.log(id)

    // Reference to the user document
    const userDocRef = doc(db, "users", id);

    // Fetch the document
    const docSnap = await getDoc(userDocRef);

    // Check if the document exists
    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return docSnap.data();
    } else {
      return null
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return GLOBAL_ERROR_STATE;
  }
}

export async function addVolunteer(id, userData) {
    const db = getFirestore();
    // Reference to the user document with the provided ID
    const userDocRef = doc(db, "users", id);

    // Set the document with the provided data
    await setDoc(userDocRef, userData);

}
