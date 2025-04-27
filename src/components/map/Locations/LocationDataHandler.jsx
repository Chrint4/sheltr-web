import { getUserPosition } from './UserPosition'
import { getFoodBanks } from './FoodBankData'
import { getFacs } from './FacData'
import { getShelters } from './ShelterData'

import {getLocationFromPostcode} from '@/lib/postcodeToLocation'

export async function updateSearch(queriedPostcode, radius = 1000, setPosition, setFoodBanks, setShelters, setFacs) {

    const location = queriedPostcode ? await getLocationFromPostcode(queriedPostcode) : await getUserPosition();

    if (location) {
        setPosition(location)

        await getFoodBanks(location, radius).then(setFoodBanks);
        await getShelters(location, radius).then(setShelters);
        await getFacs(location, radius).then(setFacs);
    }
}