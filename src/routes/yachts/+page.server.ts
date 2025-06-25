import type { PageServerLoad } from './$types';
import { apiUrl } from '$lib/index';

export const load: PageServerLoad = async ({ url }) => {
    const pickupDate = url?.searchParams?.get('pickupDate') || '';
    const dropoffDate = url?.searchParams?.get('dropoffDate') || '';
    const location = url?.searchParams?.get('location') || '';

    const response = await fetch(`${apiUrl}/vehicles?vehicleType=yacht`);
    const vehicles = await response.json();

    console.log('Vehicles-------------', vehicles);

    // Additional filtering to ensure only yacht type vehicles are included
    if (vehicles && vehicles.vehicles ) {
        vehicles.vehicles = vehicles.vehicles.filter((vehicle: any) => 
            vehicle.vehicleType && vehicle.vehicleType === 'yacht'
        );
        
        // Transform yacht data to include specs object
        vehicles.vehicles.forEach((vehicle: any) => {
            // Create specs object if it doesn't exist
            if (!vehicle.specs) {
                vehicle.specs = {
                    // Map capacity to guests if available
                    guests: vehicle.capacity || 0,
                    // Use length property if available
                    length: vehicle.length ? `${vehicle.length}'` : 'N/A',
                    // Add other relevant properties
                    cabins: vehicle.cabins || 0,
                    crew: vehicle.crew || 0
                };
            }
        });
    }

    return {
        pickupDate,
        dropoffDate,
        location,
        yachts: vehicles.vehicles
    };
}; 