import type { VehicleImage } from "$lib/types";

interface BaseItem {
    specs: any;
    userId: any;
    id: string;
    make: string;
    model: string;
    pricePerDay: number | null;
    year: number;
    tags: string[];
    images: VehicleImage[];
    pickupLocation?: {
        state: string;
        city?: string;
        address?: string;
    };
    yachtPricing?: {
        fourHours: number;
        sixHours: number;
        eightHours: number;
    };
}

// Helper function to extract state from location string (e.g., "Miami, FL" -> "FL")
function extractStateFromLocation(location: string): string | null {
    if (!location) return null;
    const parts = location.split(',').map(part => part.trim());
    return parts.length >= 2 ? parts[parts.length - 1] : null;
}

interface Vehicle extends BaseItem {
    year: number;
    specs: { length: string; guests: number; };
}

interface Yacht extends BaseItem {
    specs: {
        guests: number;
        length: string;
    };
}

export function getUniqueTypes<T extends BaseItem>(items: T[]): string[] {
    return [...new Set(items.flatMap(item => item.tags))].sort();
}

export function getMinMaxPrice<T extends BaseItem>(items: T[]): { min: number; max: number } {
    const allPrices: number[] = [];
    
    items.forEach(item => {
        if (item.pricePerDay !== null && item.pricePerDay !== undefined && !isNaN(item.pricePerDay)) {
            allPrices.push(item.pricePerDay);
        }
        
        // For yachts with hourly pricing, use the minimum hourly rate
        if (item.yachtPricing) {
            const minHourlyRate = Math.min(
                item.yachtPricing.fourHours,
                item.yachtPricing.sixHours,
                item.yachtPricing.eightHours
            );
            allPrices.push(minHourlyRate);
        }
    });
    
    if (allPrices.length === 0) {
        return { min: 0, max: 0 };
    }
    
    return {
        min: Math.min(...allPrices),
        max: Math.max(...allPrices)
    };
}

export function getMinMaxYear(vehicles: Vehicle[]): { min: number; max: number } {
    const validYears = vehicles
        .map(v => v.year)
        .filter(year => year !== null && year !== undefined && !isNaN(year));
        
    if (validYears.length === 0) {
        return { min: 2000, max: new Date().getFullYear() };
    }
    
    return {
        min: Math.min(...validYears),
        max: Math.max(...validYears)
    };
}

export function getMinMaxGuests(yachts: Yacht[]): { min: number; max: number } {
    const validGuests = yachts
        .map(y => y.specs.guests)
        .filter(guests => guests !== null && guests !== undefined && !isNaN(guests));
    
    if (validGuests.length === 0) {
        return { min: 0, max: 12 };
    }
    
    return {
        min: Math.min(...validGuests),
        max: Math.max(...validGuests)
    };
}

export function filterItems<T extends BaseItem>(
    items: T[],
    searchQuery: string,
    maxPrice: number,
    selectedTypes: string[],
    currentSort: string,
    additionalFilter?: (item: T) => boolean,
    location?: string
): T[] {
    return items
        .filter((item) => {
            const matchesSearch = (item.make + ' ' + item.model)
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesPrice = (() => {
                // If item has daily pricing, check against maxPrice
                if (item.pricePerDay !== null && item.pricePerDay !== undefined) {
                    return item.pricePerDay <= maxPrice;
                }
                
                // If item has yacht pricing, check if any duration option is within maxPrice
                if (item.yachtPricing) {
                    return item.yachtPricing.fourHours <= maxPrice ||
                           item.yachtPricing.sixHours <= maxPrice ||
                           item.yachtPricing.eightHours <= maxPrice;
                }
                
                // If no pricing info, include by default
                return true;
            })();
            const matchesType = selectedTypes.length === 0 ||
                item.tags.some(tag => selectedTypes.includes(tag));
            const matchesLocation = !location || (() => {
                const targetState = extractStateFromLocation(location);
                return targetState && item.pickupLocation?.state && 
                       item.pickupLocation.state.toLowerCase() === targetState.toLowerCase();
            })();

            return matchesSearch && matchesPrice && matchesType && matchesLocation &&
                (additionalFilter ? additionalFilter(item) : true);
        })
        .sort((a, b) => {
            switch (currentSort) {
                case 'name-asc':
                    return (a.make + a.model).localeCompare(b.make + b.model);
                case 'name-desc':
                    return (b.make + b.model).localeCompare(a.make + a.model);
                case 'price-asc':
                    const priceA = a.pricePerDay || (a.yachtPricing ? Math.min(a.yachtPricing.fourHours, a.yachtPricing.sixHours, a.yachtPricing.eightHours) : 0);
                    const priceB = b.pricePerDay || (b.yachtPricing ? Math.min(b.yachtPricing.fourHours, b.yachtPricing.sixHours, b.yachtPricing.eightHours) : 0);
                    return priceA - priceB;
                case 'price-desc':
                    const priceADesc = a.pricePerDay || (a.yachtPricing ? Math.min(a.yachtPricing.fourHours, a.yachtPricing.sixHours, a.yachtPricing.eightHours) : 0);
                    const priceBDesc = b.pricePerDay || (b.yachtPricing ? Math.min(b.yachtPricing.fourHours, b.yachtPricing.sixHours, b.yachtPricing.eightHours) : 0);
                    return priceBDesc - priceADesc;
                default:
                    return 0;
            }
        });
}

export function isAnyFilterActive(
    searchQuery: string,
    maxPrice: number,
    maxPriceAvailable: number,
    selectedTypes: string[],
    additionalFilters?: { [key: string]: boolean }
): boolean {
    const baseFiltersActive =
        searchQuery !== '' ||
        maxPrice !== maxPriceAvailable ||
        selectedTypes.length > 0;

    if (!additionalFilters) {
        return baseFiltersActive;
    }

    return baseFiltersActive || Object.values(additionalFilters).some(isActive => isActive);
} 