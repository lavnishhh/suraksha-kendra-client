import React, { useState } from 'react';
import { DISASTER_GUIDES, DISASTER_TYPES } from '../../constants/constsants';

function SafetyGuides() {
    const [selectedDisaster, setSelectedDisaster] = useState(DISASTER_TYPES[0]);

    const handleDisasterChange = (event) => {
        setSelectedDisaster(event.target.value);
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-primary-500 mb-8">Disaster Safety Guides</h1>

                <select
                    value={selectedDisaster}
                    onChange={handleDisasterChange}
                    className="w-full p-2 mb-6 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {DISASTER_TYPES.map((disasterType) => (
                        <option key={disasterType} value={disasterType}>
                            {disasterType.charAt(0).toUpperCase() + disasterType.slice(1)}
                        </option>
                    ))}
                </select>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {DISASTER_GUIDES[selectedDisaster].title}
                        </h2>
                        {DISASTER_GUIDES[selectedDisaster].sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-700 mb-3">{section.title}</h3>
                                {section.steps.map((step, stepIndex) => (
                                    <div key={stepIndex} className="mb-4">
                                        <h4 className="text-lg font-medium text-gray-600 mb-2">{step.subtitle}</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {step.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="text-gray-700">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SafetyGuides;

