import { error } from '@sveltejs/kit';
import { apiUrl } from '$lib/index';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
    try {
        const userId = url.searchParams.get('userId');
        if (!userId) {
            console.warn('No userId provided in URL parameters');
            throw error(400, 'Missing required user parameter. Please access this page through the proper vehicle listing.');
        }

        const vehicle = await getVehicle(params.id, userId);
        console.log('Server received vehicle:', vehicle);

        if (!vehicle || !vehicle.vehicle) {
            console.warn(`Vehicle not found for id: ${params.id}, userId: ${userId}`);
            throw error(404, 'Vehicle not found or no longer available');
        }

        const pickupDate = decodeURIComponent(url.searchParams.get('pickupDate') || '');
        const dropoffDate = decodeURIComponent(url.searchParams.get('dropoffDate') || '');
        const location = decodeURIComponent(url.searchParams.get('location') || 'Miami, FL');

        return {
            vehicle: vehicle.vehicle,
            pickupDate,
            dropoffDate,
            location
        };
    } catch (err) {
        console.error('Error loading vehicle page:', err);
        
        // If it's already a SvelteKit error, re-throw it
        if (err && typeof err === 'object' && 'status' in err) {
            throw err;
        }
        
        // For any other errors, throw a generic 500
        throw error(500, 'Failed to load vehicle information. Please try again later.');
    }
};

async function getVehicle(vehicleId: string, userId: string) {
    const payload = {
        vehicleId,
        userId
    };
    console.log('/vehicle/[id]: fetching vehicle');
    console.log(payload);
    
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    };
    const method = 'POST';
    const body = JSON.stringify(payload);

    try {
        const response = await fetch(`${apiUrl}/vehicles/getVehicle`, {
            headers,
            method,
            body,
            // Add timeout and other fetch options for better error handling
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            if (response.status === 404) {
                return null; // Vehicle not found
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        if (error.name === 'AbortError') {
            console.error('Request timed out');
        }
        return null;
    }
}