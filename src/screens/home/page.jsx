import { useRef, useState } from "react";
import Button from "../../components/buttons"
import LocationPicker from "../../components/location_picker";
import { uploadReport } from "../../controllers/firebase/auth";

function HomeScreen() {


    const disasterType = useRef('earthquake');
    const position = useRef(null)
    const [submitted, setSubmitted] = useState(false);

    const disasters = [
        'earthquake',
        'flood',
        'hurricane',
        'wildfire',
    ]
    
    const submitReport = async  ()=>{
        if(position.current == null){
            return
        }
        console.log(position.current)
        console.log(disasterType.current)
        await uploadReport(position.current.latitude, position.current.longitude, disasterType.current)
        setSubmitted(true);
    }

    return (
        <div className="flex flex-grow flex-col overflow-y-auto">
            <div className="mx-auto">
                <form className='md:col-span-2 flex-grow p-4 md:order-2'>
                    <h3 className="mb-5 text-3xl font-medium text-gray-900">Disaster Type</h3>
                    <ul className="grid gap-6 w-96" onChange={(e) => { disasterType.current = e.target.value; console.log(e.target.value) }}>
                        {
                            disasters.map((disaster, index) => {
                                return <li key={disaster} onClick={() => { disasterType.current = disaster }}>
                                    <input defaultChecked={disaster == disasterType.current} required={true} type="radio" id={disaster} name="disaster-type" value={disaster} className="hidden peer" />
                                    <label htmlFor={disaster} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary-600 peer-checked:text-primary-600 peer-enabled:hover:bg-primary-500 peer-enabled:hover:text-white peer-disabled:text-gray-300">
                                        <div className="block flex-grow">
                                            <div className='flex justify-between'>
                                                <div className="w-full font-semibold">{disaster}</div>
                                            </div>
                                        </div>
                                    </label>
                                </li>
                            })
                        }

                    </ul>
                </form>
                <LocationPicker onPositionChange={(change)=>{position.current = change}}></LocationPicker>
                {/* <Button className="mx-4" onClick={async ()=>{await submitReport()}}>Report</Button> */}
                {submitted ? <p className="text-center bg-primary-500 py-2 text-white">Submitted</p> : <Button className="mx-4" onClick={async ()=>{await submitReport()}}>Report</Button>}
            </div>
        </div>
    )
}

export default HomeScreen

async function findSafetyPlacesIndia(lat, lng, disasterType, apiKey) {
    const disasterMapping = {
        earthquake: ["park", "stadium", "hospital"],
        flood: ["lodging", "building", "school", "hospital"],
        hurricane: ["school", "community_center", "hospital", "supermarket"],
        wildfire: ["fire_station", "hospital", "stadium", "park"]
    };

    // Get the place types for the disaster
    const placeTypes = disasterMapping[disasterType] || ["hospital"];

    const results = [];
    for (const type of placeTypes) {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=${type}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === "OK") {
            results.push(...data.results);
        } else {
            console.error(`Error fetching places for type ${type}:`, data.status);
        }
    }

    // Combine and return results
    return results;
}
