"use client"

import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap
} from "@vis.gl/react-google-maps";

import { useRouter } from "next/navigation";

import ShelterPin from "@/components/Pins/ShelterPin"
import FoodbankPin from '@/components/Pins/FoodbankPin';
import FacilityPin from '@/components/Pins/FacilityPin';


export function UserPositionMarker({ userPosition, pan }) {
    const map = useMap();
    if (!map) return;

    const zoom = map.getZoom();
    const radius = Math.max(8, zoom * 2);
    if (pan) map?.panTo(userPosition);

    return (
        <AdvancedMarker position={userPosition}>
            <div
                style={{
                    width: radius,
                    height: radius,
                    backgroundColor: 'rgba(0, 162, 255, 0.67)',
                    border: '2px solid #007AFA',
                    borderRadius: '50%',
                }}
            />
        </AdvancedMarker>
    );
}

export default function MainMap({ userPosition, foodBanks, shelters, facs, filterOptions }) {
    const router = useRouter();

    const handleFoodBankMarkerClick = (name) => {
        router.push(`/foodbank/${name}`);
    };

    const handleShelterMarkerClick = (name) => {
        router.push(`/shelter/${name}`);
    };

    const handleFacilityMarkerClick = (name) => {
        router.push(`/facility/${name}`);
    };

    const formatName = name => {
        return name
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
    const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

    const checkedFilterOptions = { ...filterOptions }
    if (!(checkedFilterOptions.shelters || checkedFilterOptions.facs || checkedFilterOptions.foodBanks)) {
        checkedFilterOptions.shelters = true;
        checkedFilterOptions.facs = true;
        checkedFilterOptions.foodBanks = true;
    }

    return (
        <APIProvider apiKey={API_KEY}>
            {userPosition && (
                <Map
                    defaultCenter={userPosition}
                    defaultZoom={15}
                    mapId={MAP_ID}
                >
                    <UserPositionMarker userPosition={userPosition} pan={true} />

                    {checkedFilterOptions.foodBanks ? (<>
                        {foodBanks?.map((foodbank, index) => (
                            <AdvancedMarker
                                key={index}
                                position={foodbank.latlng}
                                title={foodbank.name}
                                onClick={() => handleFoodBankMarkerClick(foodbank.name)}
                            >
                                <FoodbankPin />
                            </AdvancedMarker>
                        ))}
                    </>) : (<></>)}


                    {checkedFilterOptions.shelters ? (<>
                        {shelters?.map((shelter, index) => (
                            <AdvancedMarker
                                key={index}
                                position={shelter.latlng}
                                title={shelter.name}
                                onClick={() => handleShelterMarkerClick(shelter.name)}
                            >
                                <ShelterPin is_accepting={shelter.is_accepting} />
                            </AdvancedMarker>
                        ))}
                    </>) : (<></>)}

                    {checkedFilterOptions.facs ? (<>
                        {facs?.map((fac, index) => (
                            <AdvancedMarker
                                key={index}
                                position={fac.latlng}
                                title={formatName(fac.name)}
                                onClick={() => handleFacilityMarkerClick(fac.name)}
                            >
                                <FacilityPin type={fac.type} />
                            </AdvancedMarker>
                        ))}
                    </>) : (<></>)}

                </Map>
            )}
        </APIProvider>
    )
}