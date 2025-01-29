import { vehicles } from '$lib/constants/Vehicles';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, url }) => {
    const vehicle = vehicles.find(v => v.id === params.id);
    
    if (!vehicle) {
        throw error(404, 'Vehicle not found');
    }

    const pickupDate = decodeURIComponent(url.searchParams.get('pickupDate') || '');
    const dropoffDate = decodeURIComponent(url.searchParams.get('dropoffDate') || '');
    const location = decodeURIComponent(url.searchParams.get('location') || 'Miami, FL');

    return {
        vehicle,
        pickupDate,
        dropoffDate,
        location
    };
}; 