import { vehicles } from '$lib/constants/Vehicles';
import { error } from '@sveltejs/kit';
import { apiUrl } from '$lib/index';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  console.log('Loading featured vehicles and yachts');
  const featuredVehicles = await getFeaturedVehicles(fetch);
  const featuredYachts = await getFeaturedYachts(fetch);
  console.log('Featured vehicles loaded', featuredVehicles);
  console.log('Featured yachts loaded', featuredYachts);
  return {
    featuredVehicles,
    featuredYachts
  };
};

async function getFeaturedVehicles(fetch: typeof globalThis.fetch) {
  console.log('Fetching featured vehicles');
  const response = await fetch(`${apiUrl}/vehicles`);
  const data = await response.json();

  if(data && data.vehicles) {
    // Filter to exclude yachts but maintain the original data structure
    data.vehicles = data.vehicles.filter((vehicle: any) => vehicle.vehicleType !== 'yacht');
    return data; // Return the complete data object, not just the vehicles array
  }
  return { vehicles: [] }; // Return empty vehicles array if no data
}

async function getFeaturedYachts(fetch: typeof globalThis.fetch) {
  console.log('Fetching featured yachts');
  const response = await fetch(`${apiUrl}/vehicles?vehicleType=yacht`);
  const data = await response.json();
  
  // Additional filtering to ensure only yacht type vehicles are included
  if (data && data.vehicles && Array.isArray(data.vehicles)) {
    data.vehicles = data.vehicles.filter((vehicle: any) => 
      vehicle.vehicleType && 
      vehicle.vehicleType === 'yacht' && 
      vehicle.id && 
      vehicle.make && 
      vehicle.model
    );
    
    // Transform yacht data to include specs object
    data.vehicles.forEach((vehicle: any) => {
      // Create specs object if it doesn't exist
      if (!vehicle.specs) {
        vehicle.specs = {
          // Map capacity to guests if available
          guests: vehicle.capacity || 0,
          // Use length property if available
          length: vehicle.length ? `${vehicle.length}'` : 'N/A',
          // Add other relevant properties
          cabins: vehicle.cabins || 0,
          crew: vehicle.crew || 0
        };
      }
    });
  }

  return data;
}