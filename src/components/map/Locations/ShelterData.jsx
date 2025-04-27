import { getDistance } from "geolib";

export async function getShelters(location, searchRadius = 1000) {
    if (!location) return null;

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_URL_SHELTERS);
        const data = await response.json();

        const shelterData = data.map(shelter => {
            const latlng = { lat: shelter.latitude, lng: shelter.longitude };
            const dist = getDistance(location, latlng, 10);

            return {
                name: shelter.name,
                latlng: latlng,
                email: shelter.email,
                address: shelter.address,
                dist: dist,
                is_accepting: shelter.is_accepting,
                opening_hours: shelter.opening_hours,
            };
        });

        return shelterData
            .filter(shelter => shelter.dist <= searchRadius)
            .sort((a, b) => a.dist - b.dist);
    } catch (error) {
        console.error('Error fetching shelter data:', error);
        return null;
    }
}
