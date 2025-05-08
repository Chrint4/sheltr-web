"use client"

import { useState, useEffect } from 'react';
import { getDistance } from "geolib";

import MainMap from './MainMap';
import LocationList from './LocationList';

import FilterButton from './FilterButton';

import { updateSearch } from './Locations/LocationDataHandler';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

import { getUserPosition } from './Locations/UserPosition';

export default function MapPage() {
    const [userPosition, setUserPosition] = useState(null);
    const [foodBanks, setFoodBanks] = useState(null);
    const [shelters, setShelters] = useState(null);
    const [facs, setFacs] = useState(null);
    const [selectedTab, setSelectedTab] = useState('foodBanks');

    const [queriedPostcode, setQueriedPostcode] = useState(null);
    const [postcode, setPostcode] = useState('')

    const [filters, setFilters] = useState({
        shelters: false,
        foodBanks: false,
        facs: false
    });

    const handleFilterChange = (type) => {
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters, [type]: !prevFilters[type]}

            if (newFilters[type]) {
                setSelectedTab(type);
            }
            
            return newFilters;
        });
    };

    useEffect(() => {
        updateSearch(queriedPostcode, 20000, setUserPosition, setFoodBanks, setShelters, setFacs)
    }, [queriedPostcode])

    return (
        <>
            <div className="w-full">

                <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
                    {/* Search Box Section */}
                    <div className="flex-1">
                        <div className="bg-primary rounded-2xl p-6 lg:p-8 shadow-md h-full">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-semibold text-white">Find your closest food bank</h3>
                                <Button className="text-xl font-semibold bg-white text-primary hover:bg-gray-100"
                                    onClick={() => {
                                        setQueriedPostcode(null);
                                    }}
                                >
                                    Use my current location
                                </Button>
                            </div>
                            <div className="flex">
                                <Input
                                    type="text"
                                    placeholder="Enter your postcode..."
                                    className="text-white rounded-l-lg rounded-r-none border-0 focus:ring-2 focus:ring-primary-foreground"
                                    onChange={(e) => setPostcode(e.target.value)}
                                    value={postcode}
                                    />
                                <Button className="bg-white text-primary hover:bg-gray-100 rounded-l-none"
                                    onClick={() => setQueriedPostcode(postcode)}
                                
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Filter Buttons Section */}
                    <div className="flex flex-wrap items-end gap-4">
                        <FilterButton text="Shelters" checked={filters.shelters} onFilterChange={() => handleFilterChange('shelters')} />
                        <FilterButton text="Food Banks" checked={filters.foodBanks} onFilterChange={() => handleFilterChange('foodBanks')} />
                        <FilterButton text="Public Toilets/Showers/WiFi" checked={filters.facs} onFilterChange={() => handleFilterChange('facs')} />
                        <FilterButton text="NHS Walk-in Centres (coming soon)" enabled={false} />
                    </div>
                </div>



                {/* Map */}
                <div className="bg-white/80 rounded-lg overflow-hidden shadow-md h-[800px] relative mb-6">
                    <MainMap
                        userPosition={userPosition}
                        foodBanks={foodBanks}
                        shelters={shelters}
                        facs={facs}
                        filterOptions={filters}
                    />
                </div>

                {/* Location List */}
                <LocationList
                    foodBanks={foodBanks}
                    shelters={shelters}
                    facs={facs}
                    filterOptions={filters}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                />
            </div>
        </>
    );
} 