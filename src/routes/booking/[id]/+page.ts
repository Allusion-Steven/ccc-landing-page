import type { PageLoad } from './$types';
import type { Vehicle } from '$lib/types';

export type BookingPageData = {
    vehicle: Vehicle | undefined;
    pickupDate: string;
    dropoffDate: string;
    location: string;
};

export const load: PageLoad<BookingPageData> = async ({ data }) => {
    return data as BookingPageData;
}; 