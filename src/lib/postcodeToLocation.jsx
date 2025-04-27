export async function getLocationFromPostcode(queriedPostcode) {
    try {
        const geoRes = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(queriedPostcode)}&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`);
        const data = await geoRes.json();
        if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat: lat, lng: lng };
        }
    } catch (error) {
        console.error(error);
    }
}