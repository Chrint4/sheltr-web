"use client"

import {
    APIProvider,
    Map,
    Pin,
    AdvancedMarker,
    useMap
} from "@vis.gl/react-google-maps";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
                                <Pin
                                    background={"white"}
                                    scale={1.2}
                                >
                                    <img     
                                        src="/food-bank-icon.png"
                                        alt="Food Bank Marker"
                                        style={{
                                            width: '33px',
                                            height: '40px',
                                            padding: '4px',
                                            objectFit: 'contain',
                                            filter: 'brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(2500%) hue-rotate(0deg) brightness(101%) contrast(119%)' 
                                        }}
                                    />
                                </Pin>
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
                                <Pin
                                    background={shelter.is_accepting ? "#80E0A7" : "#F76C6C"}
                                    borderColor={"#275C6A"}
                                    scale={1.2}
                                >
                                    <img     
                                        src="/shelter-icon.png"
                                        alt="Shelter Marker"
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            padding: '4px',
                                            objectFit: 'contain',
                                            filter: 'brightness(0) saturate(100%) invert(20%) sepia(90%) saturate(500%) hue-rotate(190deg) brightness(95%) contrast(90%)'
                                        }}
                                    />
                                </Pin>
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
                                <Pin
                                    background={"white"}
                                    scale={1.2}
                                    borderColor={"#20C997"}
                                >
                                    {(() => {
                                        switch (fac.type) {
                                            case "wifi":
                                                return <img
                                                    src={`/${fac.type}.png`}
                                                    alt="Wifi Marker"
                                                    style={{
                                                        width: '28px',
                                                        height: '25px',
                                                        padding: '4px',
                                                        paddingTop: '6px',
                                                        filter: 'brightness(0) saturate(100%) invert(71%) sepia(55%) saturate(3666%) hue-rotate(164deg) brightness(102%) contrast(97%)'
                                                    }}
                                                    />
                                            case "toilet":
                                                return <img
                                                    src={`/${fac.type}.png`}
                                                    alt="Toilet Marker"
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        padding: '5px',
                                                        objectFit: 'contain',
                                                        filter: 'brightness(0) saturate(100%) invert(55%) sepia(7%) saturate(263%) hue-rotate(169deg) brightness(89%) contrast(85%)'
                                                    }}
                                                    />
                                            case "shower":
                                                return <img
                                                    src={`/${fac.type}.png`}
                                                    alt="Shower Marker"
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        padding: '4px',
                                                        objectFit: 'contain',
                                                        filter: 'brightness(0) saturate(100%) invert(62%) sepia(11%) saturate(2127%) hue-rotate(122deg) brightness(92%) contrast(91%)'
                                                    }}
                                                    />
                                            case "laundry":
                                                return <img
                                                    src={`/${fac.type}.png`}
                                                    alt="Laundry Marker"
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        padding: '4px',
                                                        objectFit: 'contain',
                                                        filter: 'brightness(0) saturate(100%) invert(21%) sepia(84%) saturate(2368%) hue-rotate(274deg) brightness(90%) contrast(94%)'
                                                    }}
                                                    />
                                            case "fresh_water":
                                                return <img
                                                    src={`/${fac.type}.png`}
                                                    alt="Fresh Water Marker"
                                                    style={{
                                                        width: '30px',
                                                        height: '26px',
                                                        padding: '4px',
                                                        objectFit: 'contain',
                                                        filter: 'brightness(0) saturate(100%) invert(62%) sepia(91%) saturate(1298%) hue-rotate(165deg) brightness(103%) contrast(104%)'
                                                    }}
                                                    />
                                        }
                                    })()}
                                </Pin>
                            </AdvancedMarker>
                        ))}
                    </>) : (<></>)}

                </Map>
            )}
        </APIProvider>
    )
}