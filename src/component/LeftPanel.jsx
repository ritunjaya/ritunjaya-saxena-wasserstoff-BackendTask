import React, { useState } from 'react';

const LeftPanel = ({ imageSrc, tags, onApprove, onReject }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Button to open/close the panel */}
            <button
                className="fixed left-0 top-0 z-10 bg-gray-800 text-white p-4 rounded-r-md focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close' : 'Open'}
            </button>

            {/* Panel content */}
            <div className={`absolute top-0 left-0 bg-white shadow-lg h-full w-64 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4">
                    {/* Image */}
                    <img src={imageSrc} alt="Preview" className="w-full mb-4" />

                    {/* List of tags */}
                    <ul>
                        {tags.map((tag, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                <span>{tag.name}</span>
                                <span>{tag.confidence}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Approve and Reject buttons */}
                    <div className="mt-4 flex justify-between">
                        <button onClick={onApprove} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Approve
                        </button>
                        <button onClick={onReject} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;
