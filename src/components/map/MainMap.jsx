"use client"

import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap
} from "@vis.gl/react-google-maps";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function UserPositionMarker({ userPosition }) {
    const map = useMap();

    map?.panTo(userPosition);

    return (
        <AdvancedMarker position={userPosition}></AdvancedMarker>
    )
}

export default function MainMap({ userPosition, foodBanks, shelters, facs, filterOptions }) {
    const router = useRouter();

    const handleMarkerClick = (name) => {
        router.push(`/foodbank/${name}`);
    };

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
                    defaultZoom={12}
                    mapId={MAP_ID}
                >
                    {/* <AdvancedMarker position={userPosition}></AdvancedMarker> */}
                    <UserPositionMarker userPosition={userPosition} />

                    {checkedFilterOptions.foodBanks ? (<>
                        {foodBanks?.map((foodbank, index) => (
                            <AdvancedMarker
                                key={index}
                                position={foodbank.latlng}
                                title={foodbank.name}
                                onClick={() => handleMarkerClick(foodbank.name)}
                            />
                        ))}
                    </>) : (<></>)}


                    {checkedFilterOptions.shelters ? (<>
                        {shelters?.map((shelter, index) => (
                            <AdvancedMarker
                                key={index}
                                position={shelter.latlng}
                                title={shelter.name}
                            />
                        ))}
                    </>) : (<></>)}

                    {checkedFilterOptions.facs ? (<>
                        {facs?.map((fac, index) => (
                            <AdvancedMarker
                                key={index}
                                position={fac.latlng}
                                title={fac.name}
                            />
                        ))}
                    </>) : (<></>)}

                </Map>
            )}
        </APIProvider>
    )
}