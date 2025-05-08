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

export default function ShelterDetail() {
    const params = useParams();
    const name = decodeURIComponent(params.name);
    const [shelter, setShelter] = useState(null);

    useEffect(() => {
        if (!name) return;
        fetch(process.env.NEXT_PUBLIC_URL_SHELTERS)
            .then(res => res.json())
            .then(data => {
                const found = data.find(sh => sh.name === name);
                setShelter(found);
                
                found ? setTitle(found.name) : setTitle("Shelter not found");
            });
    }, [name]);

    if (!shelter)
        return <p>Loading shelter details...</p>;

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
    const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

    const latlng = {lat: shelter.latitude, lng: shelter.longitude}

    return (
        <>
            <div className="p-6 max-w-3xl mx-auto">
                <div
                    className={`px-4 py-2 text-white font-semibold rounded-t-lg mb-2 ${
                        shelter.is_accepting ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {shelter.is_accepting
                        ? "This shelter is accepting new people."
                        : "This shelter is not accepting new people."}
                </div>

                <h1 className="text-2xl font-bold text-gray-800">{shelter.name}</h1>
                <p className="text-gray-600">{shelter.address}</p>
                <p className="text-gray-600 mt-2">Phone: {shelter.contact_number}</p>
                <p className="text-gray-600">Opening Hours: {shelter.opening_hours}</p>
                <p className="text-gray-600">Capacity: {shelter.capacity} people</p>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`}
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
                                title={shelter.name}
                            >
                                <Pin
                                    background={shelter.is_accepting ? "#80E0A7" : "#F76C6C"}
                                    borderColor={"#275C6A"}
                                    scale={1.5}
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
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </>
    );
}
