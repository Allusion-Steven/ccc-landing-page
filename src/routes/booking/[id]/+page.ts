import type { PageLoad } from './$types';
import { vehicles } from '$lib/constants/Vehicles';

export const load = (({ params }) => {
    const vehicle = vehicles.find(v => v.id === params.id);
    
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }

    return {
        vehicle
    };
}) satisfies PageLoad; 