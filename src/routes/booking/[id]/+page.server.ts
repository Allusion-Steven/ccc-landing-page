import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { vehicles } from '$lib/constants/Vehicles';
import { yachts } from '$lib/constants/Yachts';
export const load: PageServerLoad = async ({ params, url }) => {
    const vehicleId = params.id;
    const vehicle = vehicles.find(v => v.id === vehicleId) || yachts.find(v => v.id === vehicleId);
    
    // Get query parameters with the same names as they are passed from vehicles page
    const pickupDate = url.searchParams.get('pickupDate') || '';
    const dropoffDate = url.searchParams.get('dropoffDate') || '';
    const location = url.searchParams.get('location') || '';

    if (!vehicle) {
        throw error(404, 'Vehicle not found');
    }

    return {
        vehicle,
        pickupDate,
        dropoffDate,
        location
    };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        
        try {
            // TODO: Validate and save user data
            // const userData = {
            //     fullName: formData.get('fullName'),
            //     email: formData.get('email'),
            //     // ... other fields
            // };
            
            return {
                success: true
            };
        } catch (err) {
            return {
                success: false,
                error: 'Failed to save user information'
            };
        }
    }
}; 