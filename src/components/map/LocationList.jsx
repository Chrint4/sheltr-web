import Link from 'next/link';

export default function LocationList({ foodBanks, shelters, facs, filterOptions, selectedTab, setSelectedTab }) {
    const tabs = [
        { id: 'foodBanks', label: 'Food Banks' },
        { id: 'shelters', label: 'Shelters' },
        { id: 'facs', label: 'Public Facilities' }
    ];

    const getDataForTab = (tab) => {
        switch (tab) {
            case 'foodBanks':
                return foodBanks;
            case 'shelters':
                return shelters;
            case 'facs':
                return facs;
            default:
                return [];
        }
    };

    const isVisible = (tab) => filterOptions[tab] || !(filterOptions.foodBanks || filterOptions.shelters || filterOptions.facs);

    return (
        <div className="w-full bg-white rounded-xl shadow-md pt-1 pb-6 px-6">
            <>
                <div className="flex space-x-4 border-b mb-4">
                    {tabs.map(tab => (
                        isVisible(tab.id) && (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`px-4 py-2 font-semibold text-gray-700 border-b-2 ${selectedTab === tab.id ? 'border-blue-500' : 'border-transparent'} hover:text-blue-600`}
                            >
                                {tab.label}
                            </button>
                        )
                    ))}
                </div>

                <div className="space-y-4">
                    {getDataForTab(selectedTab)?.map((item, index) => (
                        <>
                            {selectedTab == 'foodBanks' ? (
                                <>
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition">
                                        <Link href={`/foodbank/${encodeURIComponent(item.name)}`} className="block">
                                            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                                            {item.type && <strong className="text-gray-600">{item.type}</strong>}
                                            <p className="text-gray-600">{item.address}</p>
                                            {item.dist && (
                                                <p className="text-gray-800 font-medium mt-2">
                                                    Distance:{" "}
                                                    <span className="text-blue-500">
                                                        {(item.dist / 1000).toFixed(2)} km
                                                    </span>
                                                </p>
                                            )}
                                        </Link>
                                    </div>

                                </>
                            ) : (
                                <>
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition">

                                        <div className="block">
                                            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                                            {item.type && <strong className="text-gray-600">{item.type}</strong>}
                                            <p className="text-gray-600">{item.address}</p>
                                            {item.dist && (
                                                <p className="text-gray-800 font-medium mt-2">
                                                    Distance:{" "}
                                                    <span className="text-blue-500">
                                                        {(item.dist / 1000).toFixed(2)} km
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    ))}
                </div>
            </>
        </div>
    );
}
