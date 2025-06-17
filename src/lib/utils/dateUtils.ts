export const validateDates = (pickupDate: string, dropoffDate: string, isYacht: boolean = false): { isValid: boolean; error?: string } => {
    if (!pickupDate || (!dropoffDate && !isYacht)) {
        return { isValid: false, error: isYacht ? 'Please select a charter date' : 'Please select both pickup and dropoff dates' };
    }

    const pickup = new Date(pickupDate);
    const now = new Date();

    // For yachts, check 24-hour advance booking requirement
    if (isYacht) {
        const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        if (pickup < twentyFourHoursFromNow) {
            return { isValid: false, error: 'Yacht charters must be booked at least 24 hours in advance' };
        }
        return { isValid: true };
    }

    // For vehicles, check dropoff date
    if (dropoffDate) {
        const dropoff = new Date(dropoffDate);
        if (dropoff <= pickup) {
            return { isValid: false, error: 'Dropoff date must be after pickup date' };
        }
    }

    return { isValid: true };
};

export const getTomorrow = (date: string): string => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
};

export const get24HoursFromNow = (): string => {
    const twentyFourHoursFromNow = new Date();
    twentyFourHoursFromNow.setHours(twentyFourHoursFromNow.getHours() + 24);
    return twentyFourHoursFromNow.toISOString().split('T')[0];
}; 