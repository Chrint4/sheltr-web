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
import FacilityPin from '../../../components/Pins/FacilityPin';

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
                                <FacilityPin type={facility.type} scale={1.5}/>
                            </AdvancedMarker>
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </>
    );
}
