import { error } from '@sveltejs/kit';
import { apiUrl } from '$lib/index';
import type { PageServerLoad } from './$types';

// Cache objects with expiration
const cache = {
  featuredVehicles: { data: null, timestamp: 0 },
  featuredYachts: { data: null, timestamp: 0 }
};

// Cache expiration time (in milliseconds) - 5 minutes
const CACHE_EXPIRATION = 5 * 60 * 1000;

export const load: PageServerLoad = async ({ fetch }) => {
  console.log('/+page.server.ts: Loading featured vehicles and yachts');

  // Check cache expiration for both
  const now = Date.now();
  const vehiclesCacheValid = cache.featuredVehicles.data && (now - cache.featuredVehicles.timestamp) < CACHE_EXPIRATION;
  const yachtsCacheValid = cache.featuredYachts.data && (now - cache.featuredYachts.timestamp) < CACHE_EXPIRATION;

  if (vehiclesCacheValid && yachtsCacheValid) {
    console.log('Returning cached featured vehicles and yachts');
    return {
      featuredVehicles: cache.featuredVehicles.data,
      featuredYachts: cache.featuredYachts.data
    };
  }

  // Fetch both in parallel for better performance
  const [featuredVehicles, featuredYachts] = await Promise.all([
    getFeaturedVehicles(fetch),
    getFeaturedYachts(fetch)
  ]);

  return {
    featuredVehicles,
    featuredYachts
  };
};

async function getFeaturedVehicles(fetch: typeof globalThis.fetch) {
  // Check if we have valid cached data
  const now = Date.now();
  if (cache.featuredVehicles.data && (now - cache.featuredVehicles.timestamp) < CACHE_EXPIRATION) {
    console.log(' /+page.server.ts: Returning featured vehicles from cache');
    return cache.featuredVehicles.data;
  }

  console.log('/+page.server.ts: No cache found, Fetching featured vehicles');
  const response = await fetch(`${apiUrl}/vehicles`);
  const data = await response.json();

  if (data && data.vehicles) {
    // Filter to exclude yachts but maintain the original data structure
    data.vehicles = data.vehicles.filter((vehicle: any) => vehicle.vehicleType !== 'yacht');

    // Update cache
    cache.featuredVehicles.data = data;
    cache.featuredVehicles.timestamp = now;
    console.log('Featured vehicles fetched and cached');
    return data; // Return the complete data object, not just the vehicles array
  }
  console.log('Featured vehicles fetched but no vehicles found returning empty array');

  return { vehicles: [] }; // Return empty vehicles array if no data
}

async function getFeaturedYachts(fetch: typeof globalThis.fetch) {
  // Check if we have valid cached data
  const now = Date.now();
  if (cache.featuredYachts.data && (now - cache.featuredYachts.timestamp) < CACHE_EXPIRATION) {
    console.log('Returning cached featured yachts');
    return cache.featuredYachts.data;
  }

  console.log(`/+page.server.ts: Fetching featured yachts ${apiUrl}/vehicles/yacht/getFeaturedYachts`);
  const response = await fetch(`${apiUrl}/vehicles/yacht/getFeaturedYachts`);
  const data = await response.json();
  console.log(`/+page.server.ts: Featured yachts data fetched`);
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

  // Update cache
  cache.featuredYachts.data = data;
  cache.featuredYachts.timestamp = now;

  return data;
}