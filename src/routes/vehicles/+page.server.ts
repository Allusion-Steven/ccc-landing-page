import type { PageServerLoad } from './$types';
import { apiUrl } from '$lib/index';


const cache = {
    featuredVehicles: { data: null, timestamp: 0 }
  };

export const load: PageServerLoad = async ({ url, setHeaders }) => {
    const pickupDate = url.searchParams.get('pickupDate') || '';
    const dropoffDate = url.searchParams.get('dropoffDate') || '';
    const location = url.searchParams.get('location') || '';

    // Set Cache-Control header for 20 minutes (1200 seconds)
    setHeaders({
        'Cache-Control': 'max-age=1200, s-maxage=1200'
    });

    console.log(`[${new Date().toISOString()}] Fetching vehicles from API`);
    const response = await fetch(`${apiUrl}/vehicles`);
    const vehicles = await response.json();
    const filteredVehicles = vehicles.vehicles.filter((vehicle: any) => !vehicle.vehicleType || vehicle.vehicleType !== 'yacht');
    console.log(`[${new Date().toISOString()}] Retrieved ${filteredVehicles.length} vehicles`);

    // Add a timestamp to verify cache freshness
    const fetchTimestamp = new Date().toISOString();

    return {
        pickupDate,
        dropoffDate,
        location,
        vehicles: filteredVehicles,
        fetchTimestamp
    };
}; 