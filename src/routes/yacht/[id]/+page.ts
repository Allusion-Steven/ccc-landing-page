import { yachts } from '$lib/constants/Yachts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, url }) => {
    const yacht = yachts.find(y => y.id === params.id);
    
    if (!yacht) {
        throw error(404, 'Yacht not found');
    }

    const pickupDate = decodeURIComponent(url.searchParams.get('pickupDate') || '');
    const dropoffDate = decodeURIComponent(url.searchParams.get('dropoffDate') || '');
    const location = decodeURIComponent(url.searchParams.get('location') || 'Miami, FL');

    return {
        yacht,
        pickupDate,
        dropoffDate,
        location
    };
}; 