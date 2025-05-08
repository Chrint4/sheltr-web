import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";

import { Button } from "@/components/ui/button";
import { PositionMarker } from "./PositionMarker";

export default function MainFoodBankCard({ foodbank }) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
    const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

    return (
        <div className="w-full lg:w-2/3 flex-none">
            <div className="bg-white/80 rounded-lg shadow-md p-6 h-full flex flex-col">
                <h4 className="text-xl font-bold mb-2">Nearest Food Bank</h4>
                <div className="flex-1 bg-gray-100 rounded-md overflow-hidden mb-4">
                    <div className="h-48 flex items-center justify-center">
                        {foodbank ? (
                            <APIProvider apiKey={API_KEY}>
                                <Map
                                    defaultCenter={foodbank.latlng}
                                    defaultZoom={13}
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
                <div>

                    {/* <div className="flex justify-between"> */}
                    <h5 className="text-lg font-semibold">{foodbank?.name ?? "Empty"}</h5>
                    {/* </div> */}

                    <p className="text-gray-600">{foodbank?.address ?? "Empty"}</p>
                    <p className="text-gray-800 font-medium mt-1 mb-2">
                        Distance: <span className="text-blue-500">{(foodbank?.dist / 1000).toFixed(2)} km</span>
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button asChild className="mt-auto bg-[#3730a3] text-white hover:bg-opacity-90 rounded-full flex-1">
                            <a href={foodbank?.homepage_url} target="_blank" rel="noreferrer">
                                Visit Website
                            </a>
                        </Button>

                        <Button asChild className="mt-auto bg-[#3730a3] text-white hover:bg-opacity-90 rounded-full flex-1">
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${foodbank?.latlng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get Directions
                            </a>
                        </Button>
                    </div>


                </div>
            </div>
        </div>
    )
}