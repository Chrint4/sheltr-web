import { getDistance } from "geolib";

export async function getFoodBanks(location, searchRadius = 20000) {
	if (!location) return null;

	try {
		const response = await fetch(process.env.NEXT_PUBLIC_URL_FOODBANK);
		const data = await response.json();

		const foodBankData = data.map(foodbank => {
			const latlng = { lat: foodbank.latitude, lng: foodbank.longitude };
			const dist = getDistance(location, latlng, 10);

			return {
				name: foodbank.name,
				latlng: latlng,
				email: foodbank.email,
				address: foodbank.address,
				dist: dist,
				homepage_url: foodbank.homepage_url,
			};
		});

		return foodBankData
			.filter(foodBank => foodBank.dist <= searchRadius)
			.sort((fb1, fb2) => fb1.dist - fb2.dist);
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}