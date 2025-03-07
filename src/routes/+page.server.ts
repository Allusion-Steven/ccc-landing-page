import { vehicles } from '$lib/constants/Vehicles';
import { error } from '@sveltejs/kit';
import { apiUrl } from '$lib/index';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  console.log('Loading featured vehicles');
  const featuredVehicles = await getFeaturedVehicles(fetch);
  console.log('Featured vehicles loaded', featuredVehicles);
  return {
    featuredVehicles
  };
};

async function getFeaturedVehicles(fetch: typeof globalThis.fetch) {
  console.log('Fetching featured vehicles');
  const response = await fetch(`${apiUrl}/vehicles`);
  const data = await response.json();

  return data;
}