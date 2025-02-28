export const validateDates = (pickupDate: string, dropoffDate: string): { isValid: boolean; error?: string } => {
    if (!pickupDate || !dropoffDate) {
        return { isValid: false, error: 'Please select both pickup and dropoff dates' };
    }

    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    if (dropoff <= pickup) {
        return { isValid: false, error: 'Dropoff date must be after pickup date' };
    }

    return { isValid: true };
};

export const getTomorrow = (date: string): string => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}; 