import type { PageServerLoad } from './$types';
import { apiUrl } from '$lib/index';

export const load: PageServerLoad = async ({ url }) => {
    const pickupDate = url.searchParams.get('pickupDate') || '';
    const dropoffDate = url.searchParams.get('dropoffDate') || '';
    const location = url.searchParams.get('location') || '';

    const response = await fetch(`${apiUrl}/vehicles`);
    const vehicles = await response.json();
    const filteredVehicles = vehicles.vehicles.filter((vehicle: any) => !vehicle.vehicleType || vehicle.vehicleType !== 'yacht');

    return {
        pickupDate,
        dropoffDate,
        location,
        vehicles: filteredVehicles
    };
}; 