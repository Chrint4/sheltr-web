import {
    AdvancedMarker,
    useMap
} from "@vis.gl/react-google-maps";

import FoodbankPin from "../Pins/FoodbankPin";

export function PositionMarker({ foodbank }) {
    const map = useMap();

    map?.panTo(foodbank.latlng);

    return (
        <AdvancedMarker
            key={foodbank.id}
            position={foodbank.latlng}
            title={foodbank.name}
        >
            <FoodbankPin scale={1.5}/>
        </AdvancedMarker>
    )
}