import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";

import { Button } from "@/components/ui/button";
import { PositionMarker } from "./PositionMarker";


export default function FoodBankCard({ foodbank }) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
    const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

    return (
        <div className="bg-white/80 rounded-lg shadow-md p-6 h-full flex flex-col">
            <h5 className="text-lg font-bold mb-2">{foodbank?.name}</h5>
            <div className="flex-1 bg-gray-100 rounded-md overflow-hidden mb-4">
                <div className="h-32 flex items-center justify-center">
                    {foodbank ? (
                        <APIProvider apiKey={API_KEY}>
                            <Map
                                defaultCenter={foodbank.latlng}
                                defaultZoom={15}
                                mapId={MAP_ID}
                            >
                                <PositionMarker foodbank={foodbank} />
                            </Map>
                        </APIProvider>
                    ) : (
                        <p className="text-gray-500">No results yet</p>
                    )}
                </div>
            </div>
            <p className="text-gray-600 mb-2">{foodbank?.address}</p>
            <p className="text-gray-800 font-medium mb-4">
                Distance: <span className="text-blue-500">{(foodbank?.dist / 1000).toFixed(2)} km</span>
            </p>

            <Button asChild className="mt-auto bg-[#3730a3] text-white hover:bg-opacity-90 rounded-full">
                <a href={foodbank?.homepage_url} target="_blank" rel="noreferrer" className="container">
                    Visit Website
                </a>
            </Button>
        </div>
    )
}