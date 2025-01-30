import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const pickupDate = url.searchParams.get('pickupDate') || '';
    const dropoffDate = url.searchParams.get('dropoffDate') || '';
    const location = url.searchParams.get('location') || '';

    return {
        pickupDate,
        dropoffDate,
        location
    };
}; 