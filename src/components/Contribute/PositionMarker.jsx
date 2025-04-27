import {
    AdvancedMarker,
    useMap
} from "@vis.gl/react-google-maps";

export function PositionMarker({ foodbank }) {
    const map = useMap();

    map?.panTo(foodbank.latlng);

    return (
        <AdvancedMarker
            key={foodbank.id}
            position={foodbank.latlng}
            title={foodbank.name}
        />
    )
}