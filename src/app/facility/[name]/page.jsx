"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import setTitle from "@/lib/setTitle";

import {
    APIProvider,
    Map,
    Pin,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";

export default function FacilityDetail() {
    const params = useParams();
    const name = decodeURIComponent(params.name);
    const [facility, setFacility] = useState(null);

    useEffect(() => {
        if (!name) return;
        fetch(process.env.NEXT_PUBLIC_URL_FACILITIES)
            .then(res => res.json())
            .then(data => {
                const found = data.find(fac => fac.name === name);
                setFacility(found);
                
                found ? setTitle(found.name) : setTitle("Facility not found");
            });
    }, [name]);

    if (!facility)
        return <p>Loading facility details...</p>;

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
    const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

    const latlng = {lat: facility.latitude, lng: facility.longitude}

    const formatName = name => {
        return name
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    return (
        <>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800">{formatName(facility.name)}</h1>
                <strong className="text-gray-600">{formatName(facility.type)}</strong>
                <p className="text-gray-600">{facility.address}</p>

                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-blue-500 text-white py-1.5 px-4 rounded-lg"
                >
                    Get Directions
                </a>

                <div className="bg-white/80 rounded-lg overflow-hidden shadow-md h-[800px] relative mb-6 mt-2">
                    <APIProvider apiKey={API_KEY}>
                        <Map
                            defaultCenter={latlng}
                            defaultZoom={17}
                            mapId={MAP_ID}
                        >
                            <AdvancedMarker
                                position={latlng}
                                title={formatName(facility.name)}
                            >
                                <Pin
                                    background={"white"}
                                    scale={1.2}
                                    borderColor={"#20C997"}
                                >
                                    {(() => {
                                        switch (facility.type) {
                                            case "wifi":
                                                return <img
                                                    src={`/${facility.type}.png`}
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
                                                    src={`/${facility.type}.png`}
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
                                                    src={`/${facility.type}.png`}
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
                                                    src={`/${facility.type}.png`}
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
                                                    src={`/${facility.type}.png`}
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
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </>
    );
}
