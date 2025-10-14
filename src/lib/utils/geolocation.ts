import { CITIES, DEFAULT_CITY } from '$lib/data/cities';

// City coordinates for distance calculation
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
	'Atlanta, GA': { lat: 33.749, lng: -84.388 },
	'Boston, MA': { lat: 42.361, lng: -71.057 },
	'Chicago, IL': { lat: 41.878, lng: -87.630 },
	'Dallas-Fort Worth, TX': { lat: 32.897, lng: -97.038 },
	'Denver, CO': { lat: 39.740, lng: -104.990 },
	'Las Vegas, NV': { lat: 36.171, lng: -115.139 },
	'Los Angeles, CA': { lat: 34.052, lng: -118.244 },
	'Miami, FL': { lat: 25.761, lng: -80.192 },
	'Nashville, TN': { lat: 36.162, lng: -86.781 },
	'New York City, NY': { lat: 40.713, lng: -74.006 },
	'Phoenix/Scottsdale, AZ': { lat: 33.448, lng: -112.074 },
	'San Francisco Bay Area, CA': { lat: 37.775, lng: -122.419 },
	'Seattle, WA': { lat: 47.606, lng: -122.332 }
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number {
	const R = 3959; // Radius of Earth in miles
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

/**
 * Find the closest city from our list based on user coordinates
 */
function findClosestCity(userLat: number, userLng: number): string {
	let closestCity = DEFAULT_CITY;
	let minDistance = Infinity;

	for (const city of CITIES) {
		const coords = CITY_COORDINATES[city.value];
		if (coords) {
			const distance = calculateDistance(userLat, userLng, coords.lat, coords.lng);
			if (distance < minDistance) {
				minDistance = distance;
				closestCity = city.value;
			}
		}
	}

	return closestCity;
}

/**
 * Get user's location using browser geolocation API
 */
async function getUserLocationFromBrowser(): Promise<string> {
	return new Promise((resolve) => {
		if (!navigator.geolocation) {
			resolve(DEFAULT_CITY);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const closestCity = findClosestCity(
					position.coords.latitude,
					position.coords.longitude
				);
				resolve(closestCity);
			},
			() => {
				// If user denies permission or error occurs, try IP-based fallback
				resolve(DEFAULT_CITY);
			},
			{ timeout: 5000 }
		);
	});
}

/**
 * Get user's location using IP-based geolocation API
 */
async function getUserLocationFromIP(): Promise<string> {
	try {
		// Using ipapi.co free API (1000 requests/day limit)
		const response = await fetch('https://ipapi.co/json/', {
			signal: AbortSignal.timeout(3000)
		});

		if (!response.ok) {
			return DEFAULT_CITY;
		}

		const data = await response.json();

		if (data.latitude && data.longitude) {
			return findClosestCity(data.latitude, data.longitude);
		}

		return DEFAULT_CITY;
	} catch (error) {
		console.warn('IP geolocation failed:', error);
		return DEFAULT_CITY;
	}
}

/**
 * Get the closest city to the user's location
 * First tries browser geolocation, then falls back to IP-based geolocation
 * Caches result in localStorage for 24 hours
 */
export async function getClosestCity(): Promise<string> {
	// Check localStorage cache first
	const cached = localStorage.getItem('userCity');
	const cacheTime = localStorage.getItem('userCityTime');

	if (cached && cacheTime) {
		const hoursSinceCache = (Date.now() - parseInt(cacheTime)) / (1000 * 60 * 60);
		if (hoursSinceCache < 24) {
			return cached;
		}
	}

	// Try browser geolocation first
	const browserCity = await getUserLocationFromBrowser();

	// If browser geolocation failed (returned default), try IP-based
	let detectedCity = browserCity;
	if (browserCity === DEFAULT_CITY) {
		detectedCity = await getUserLocationFromIP();
	}

	// Cache the result
	localStorage.setItem('userCity', detectedCity);
	localStorage.setItem('userCityTime', Date.now().toString());

	return detectedCity;
}

/**
 * Clear the cached location
 */
export function clearCachedLocation(): void {
	localStorage.removeItem('userCity');
	localStorage.removeItem('userCityTime');
}
