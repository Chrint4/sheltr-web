"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import setTitle from "@/lib/setTitle";

import FoodbankPin from '@/components/Pins/FoodbankPin';

import {
    APIProvider,
    Map,
    Pin,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";

export default function FoodBankDetail() {
    const params = useParams();
    const name = decodeURIComponent(params.name);
    const [foodbank, setFoodbank] = useState(null);

    useEffect(() => {
        if (!name) return;
        fetch(process.env.NEXT_PUBLIC_URL_FOODBANK)
            .then(res => res.json())
            .then(data => {
                const found = data.find(fb => fb.name === name);
                setFoodbank(found);

                found ? setTitle(found.name) : setTitle("Food bank not found");
            });
    }, [name]);

    if (!foodbank)
        return <p>Loading food bank details...</p>;

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
    const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

    const latlng = { lat: foodbank.latitude, lng: foodbank.longitude }

    return (
        <>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800">{foodbank.name}</h1>
                <p className="text-gray-600">{foodbank.address}</p>
                <p className="text-gray-600 mt-2">Phone: {foodbank.phone}</p>
                <p className="text-gray-600">Email: {foodbank.email}</p>

                {foodbank.homepage_url && (
                    <p className="text-blue-600 mt-2">
                        <a href={foodbank.homepage_url} target="_blank" rel="noreferrer">
                            Visit homepage
                        </a>
                    </p>
                )}

                <details open>
                    <summary className="text-xl font-semibold mt-6">Directions</summary>
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${foodbank.latitude},${foodbank.longitude}`}
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
                                    title={foodbank.name}
                                >
                                    <FoodbankPin />
                                </AdvancedMarker>
                            </Map>
                        </APIProvider>
                    </div>
                </details>

                <details open>
                    <summary className="text-xl font-semibold mt-6">Shopping List</summary>
                    {foodbank.shopping_list_url ? (
                        <>
                            <p className="text-blue-600 mt-2">
                                <a href={foodbank.shopping_list_url} target="_blank" rel="noreferrer">
                                    Visit Shopping List
                                </a>
                            </p>

                            <iframe
                                src={foodbank.shopping_list_url}
                                title="Shopping List"
                                className="w-full h-[1000px] mt-4 border rounded-md"
                            />
                        </>
                    ) : (
                        <p className="text-gray-500 mt-2">No shopping list available.</p>
                    )}
                </details>
            </div>
        </>
    );
}
