// Centralized list of cities available for vehicle and yacht rentals
// This ensures consistency across all dropdowns in the application

export interface City {
	value: string;
	label: string;
}

export const CITIES: City[] = [
	{ value: 'all', label: 'All' },

	{ value: 'Atlanta, GA', label: 'Atlanta, GA' },
	{ value: 'Boston, MA', label: 'Boston, MA' },
	{ value: 'Chicago, IL', label: 'Chicago, IL' },
	{ value: 'Dallas-Fort Worth, TX', label: 'Dallas-Fort Worth, TX' },
	{ value: 'Denver, CO', label: 'Denver, CO' },
	{ value: 'Las Vegas, NV', label: 'Las Vegas, NV' },
	{ value: 'Los Angeles, CA', label: 'Los Angeles, CA' },
	{ value: 'Miami, FL', label: 'Miami, FL' },
	{ value: 'Nashville, TN', label: 'Nashville, TN' },
	{ value: 'New York City, NY', label: 'New York City, NY' },
	{ value: 'Phoenix/Scottsdale, AZ', label: 'Phoenix/Scottsdale, AZ' },
	{ value: 'San Francisco Bay Area, CA', label: 'San Francisco Bay Area, CA' },
	{ value: 'Seattle, WA', label: 'Seattle, WA' }
];

// Default city
export const DEFAULT_CITY = CITIES[0].value;

// Helper function to get city label from value
export function getCityLabel(value: string): string {
	const city = CITIES.find((c) => c.value === value);
	return city ? city.label : value;
}
