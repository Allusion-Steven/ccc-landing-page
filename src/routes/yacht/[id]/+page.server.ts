import { error } from '@sveltejs/kit';
import { apiUrl } from '$lib/index';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
    const userId = url.searchParams.get('userId');
    const vehicleType = url.searchParams.get('vehicleType') || 'yacht';
    console.log('Yacht ID route params:', params);
    console.log('URL search params:', Object.fromEntries(url.searchParams.entries()));
    
    if (!userId) {
        console.warn('No userId found in query parameters, yacht detail may not load correctly');
    }
    
    const yachtId = params.id;
    if (!yachtId) {
        throw error(404, 'Yacht ID is missing from URL');
    }
    
    console.log(`Attempting to fetch yacht with ID: ${yachtId}, userId: ${userId || 'not provided'}, vehicleType: ${vehicleType}`);
    
    try {
        const yacht = await getYacht(yachtId, userId || '', vehicleType);
        console.log('API response for yacht:', yacht);

        if (!yacht) {
            throw error(404, 'No response from yacht API');
        }
        
        if (!yacht.vehicle) {
            console.error('Invalid yacht data structure:', yacht);
            throw error(404, 'Yacht data structure is invalid');
        }

        // Get the yacht data from the response
        const yachtData = yacht.vehicle;
        console.log('Raw yacht data:', yachtData);
        
        // Ensure userId is available
        if (userId) {
            yachtData.userId = userId;
        }
        
        // Create specs object for yacht-specific data if it doesn't exist
        if (!yachtData.specs) {
            yachtData.specs = {
                guests: yachtData.capacity || 0,
                length: yachtData.length ? `${yachtData.length}'` : 'N/A',
                cabins: yachtData.cabins || 0,
                crew: yachtData.crew || 0,
                beam: yachtData.beam || 'N/A'
            };
        }
        
        // Get URL parameters for booking information
        const pickupDate = decodeURIComponent(url?.searchParams?.get('pickupDate') || '');
        const dropoffDate = decodeURIComponent(url?.searchParams?.get('dropoffDate') || '');
        const location = decodeURIComponent(url?.searchParams?.get('location') || 'Miami, FL');

        return {
            yacht: yachtData,
            pickupDate,
            dropoffDate,
            location
        };
    } catch (err) {
        console.error('Error fetching yacht data:', err);
        throw error(500, 'Failed to load yacht details');
    }
};

async function getYacht(yachtId: string, userId: string, vehicleType: string) {
    const payload = {
        vehicleId: yachtId,
        userId,
        vehicleType
    };
    //console.log('/yacht/[id]: fetching yacht with payload:', payload);
    
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
        
        if (!response.ok) {
            console.error(`API error: ${response.status} ${response.statusText}`);
            return null;
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
} 