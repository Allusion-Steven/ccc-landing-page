interface BaseItem {
    specs: any;
    userId: any;
    id: string;
    make: string;
    model: string;
    pricePerDay: number;
    tags: string[];
    images: { url: string; alt: string; urls: any; isActive: boolean }[];
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
    return {
        min: Math.min(...items.map(item => item.pricePerDay)),
        max: Math.max(...items.map(item => item.pricePerDay))
    };
}

export function getMinMaxYear(vehicles: Vehicle[]): { min: number; max: number } {
    return {
        min: Math.min(...vehicles.map(v => v.year)),
        max: Math.max(...vehicles.map(v => v.year))
    };
}

export function getMinMaxGuests(yachts: Yacht[]): { min: number; max: number } {
    return {
        min: Math.min(...yachts.map(y => y.specs.guests)),
        max: Math.max(...yachts.map(y => y.specs.guests))
    };
}

export function filterItems<T extends BaseItem>(
    items: T[],
    searchQuery: string,
    maxPrice: number,
    selectedTypes: string[],
    currentSort: string,
    additionalFilter?: (item: T) => boolean
): T[] {
    return items
        .filter((item) => {
            const matchesSearch = (item.make + ' ' + item.model)
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesPrice = item.pricePerDay <= maxPrice;
            const matchesType = selectedTypes.length === 0 ||
                item.tags.some(tag => selectedTypes.includes(tag));

            return matchesSearch && matchesPrice && matchesType &&
                (additionalFilter ? additionalFilter(item) : true);
        })
        .sort((a, b) => {
            switch (currentSort) {
                case 'name-asc':
                    return (a.make + a.model).localeCompare(b.make + b.model);
                case 'name-desc':
                    return (b.make + b.model).localeCompare(a.make + a.model);
                case 'price-asc':
                    return a.pricePerDay - b.pricePerDay;
                case 'price-desc':
                    return b.pricePerDay - a.pricePerDay;
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