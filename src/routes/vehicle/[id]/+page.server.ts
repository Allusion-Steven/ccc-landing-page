import { error } from '@sveltejs/kit';
import { apiUrl } from '$lib/index';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
    const userId = url.searchParams.get('userId');
    if (!userId) {
        throw error(404, 'User not found');
    }
    const vehicle = await getVehicle(params.id, userId);
    console.log('Server received vehicle:', vehicle);

    if (!vehicle || !vehicle.vehicle) {
        throw error(404, 'Vehicle not found');
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
            body
        });
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}