import type { PageServerLoad } from './$types';
import { apiUrl } from '$lib/index';

// Helper function to extract state from location string (e.g., "Miami, FL" -> "FL")
function extractStateFromLocation(location: string): string | null {
    if (!location) return null;
    const parts = location.split(',').map(part => part.trim());
    return parts.length >= 2 ? parts[parts.length - 1] : null;
}

export const load: PageServerLoad = async ({ url }) => {
    const pickupDate = url?.searchParams?.get('pickupDate') || '';
    const dropoffDate = url?.searchParams?.get('dropoffDate') || '';
    const location = url?.searchParams?.get('location') || '';

    const response = await fetch(`${apiUrl}/vehicles/yacht/getFeaturedYachts`);
    const vehicles = await response.json();


    // Additional filtering to ensure only yacht type vehicles are included
    if (vehicles && vehicles.vehicles ) {
        let filteredYachts = vehicles.vehicles.filter((vehicle: any) => 
            vehicle.vehicleType && vehicle.vehicleType === 'yacht'
        );
        
        // Filter by location if provided
        if (location) {
            const targetState = extractStateFromLocation(location);
            if (targetState) {
                filteredYachts = filteredYachts.filter((vehicle: any) => 
                    vehicle.pickupLocation?.state && 
                    vehicle.pickupLocation.state.toLowerCase() === targetState.toLowerCase()
                );
            }
        }
        
        // Transform yacht data to include specs object
        filteredYachts.forEach((vehicle: any) => {
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
        
        vehicles.vehicles = filteredYachts;
    }

    return {
        pickupDate,
        dropoffDate,
        location,
        yachts: vehicles.vehicles
    };
}; 