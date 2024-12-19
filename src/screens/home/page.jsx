import { useRef } from "react";
import Button from "../../components/buttons"

function HomeScreen() {


    const disasterType = useRef('earthquake');

    const disasters = [
        'earthquake',
        'flood',
        'fire',
    ]

    return (
        <div className="flex flex-grow flex-col">
            <div className="mx-auto">
                <form className='md:col-span-2 flex-grow p-4 md:order-2'>
                    <h3 className="mb-5 text-3xl font-medium text-gray-900">Disaster Type</h3>
                    <ul className="grid gap-6 w-96" onChange={(e) => { disasterType.current = e.target.value; console.log(e.target.value) }}>
                        {
                            disasters.map((disaster, index) => {
                                return <li key={disaster} onClick={() => { disasterType.current = disaster }}>
                                    <input defaultChecked={disaster == disasterType.current} required={true} type="radio" id={disaster} name="disaster-type" value={disaster} className="hidden peer" />
                                    <label htmlFor={disaster} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary-600 peer-checked:text-primary-600 peer-enabled:hover:bg-gray-100 peer-disabled:text-gray-300">
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
                <Button className="mx-4">Report</Button>
            </div>
        </div>
    )
}

export default HomeScreen