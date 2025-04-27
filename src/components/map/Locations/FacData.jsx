import { getDistance } from "geolib";

export async function getFacs(location, searchRadius = 1000) {
  if (!location) return null;

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_URL_FACILITIES);
    const data = await response.json();

    const facData = data.map(fac => {
      const latlng = { lat: fac.latitude, lng: fac.longitude };
      const dist = getDistance(location, latlng, 10);

      return {
        name: fac.name,
        latlng: latlng,
        type: fac.type,
        address: fac.address,
        dist: dist,
      };
    });

    return facData
      .filter(fac => fac.dist <= searchRadius)
      .sort((a, b) => a.dist - b.dist);

  } catch (error) {
    console.error('Error fetching facs data:', error);
    return null;
  }
}
