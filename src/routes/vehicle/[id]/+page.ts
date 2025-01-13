import { vehicles } from '$lib/constants/Vehicles';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const vehicle = vehicles.find(v => v.id === params.id);
    
    if (!vehicle) {
        throw error(404, 'Vehicle not found');
    }

    return {
        vehicle
    };
}; 