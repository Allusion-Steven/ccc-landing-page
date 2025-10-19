import type { PageServerLoad } from './$types';
import { apiUrl } from '$lib/index';

// Helper function to extract state from location string (e.g., "Miami, FL" -> "FL")
function extractStateFromLocation(location: string): string | null {
    if (!location) return null;
    const parts = location.split(',').map(part => part.trim());
    return parts.length >= 2 ? parts[parts.length - 1] : null;
}

export const load: PageServerLoad = async ({ url }) => {
    const pickupDate = url.searchParams.get('pickupDate') || '';
    const dropoffDate = url.searchParams.get('dropoffDate') || '';
    const location = url.searchParams.get('location') || '';
    const make = url.searchParams.get('make') || '';

    const response = await fetch(`${apiUrl}/vehicles`);
    const data = await response.json();
    const vehicles = data.vehicles;

    let filteredVehicles = vehicles.filter((vehicle: any) => !vehicle.vehicleType || vehicle.vehicleType !== 'yacht');

    // Filter by location if provided
    if (location) {
        const targetState = extractStateFromLocation(location);
        if (targetState) {
            filteredVehicles = filteredVehicles.filter((vehicle: any) => 
                vehicle.pickupLocation?.state && 
                vehicle.pickupLocation.state.toLowerCase() === targetState.toLowerCase()
            );
        }
    }

    return {
        pickupDate,
        dropoffDate,
        location,
        make,
        vehicles: filteredVehicles,
        allVehicles: vehicles
    };
}; 