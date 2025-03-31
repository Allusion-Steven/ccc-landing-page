// User related types
// TODO: Utilize this data structure for database schema

/**************************** USER TYPES ***************************** */
export interface UserAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface DriverLicense {
    number: string;
    expirationDate: Date;
    state: string;
    frontImageUrl: string;
    backImageUrl: string;
}

export interface UserAuth {
    password: string;  // Hashed password
    emailVerified: boolean;
    phoneVerified: boolean;
    lastLogin?: Date;
    failedLoginAttempts: number;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    verificationToken?: string;
}

export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address?: UserAddress;  // Optional during registration
    driverLicense?: DriverLicense;  // Optional during registration
    countryOfCitizenship?: string;  // Optional during registration
    role: UserRole;
    auth: UserAuth;
    isActive: boolean;  // Account status
    isBanned: boolean;  // For user bans
    banReason?: string;
    createdAt: Date;
    updatedAt: Date;
    lastActivityAt?: Date;
    agreedToTerms: boolean;
    marketingConsent: boolean;
}

/**************************** END OF USER TYPES ***************************** */
/**************************** VEHICLE TYPES ***************************** */
// Vehicle related types
export interface VehicleImage {
    isActive?: boolean;
    url: string;
    public_id: string;
    alt?: string;
    isPrimary?: boolean;
    urls?: {
        small?: string;
        medium?: string;
        large?: string;
        thumbnail?: string;
    };
}

export type VehicleTag = 'Comfort' | 'Performance' | 'Coupe' | 'Supercar' | 'Convertible' | 'SUV';

export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    vin?: string;  // Optional VIN number
    images: VehicleImage[];
    tags: VehicleTag[];
    userId: string;  // Reference to the owner/manager of the vehicle
    isAvailable?: boolean;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    userDeleted: boolean;
}

// Booking related types (for reference)
export interface Booking {
    id: string;
    userId: string;
    vehicleId: string;
    pickupDate: Date;
    dropoffDate: Date;
    location: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

/**************************** END OF VEHICLE TYPES ***************************** */

export type YachtTag = 'Flybridge' | 'Luxury' | 'Family' | 'Sport' | 'Performance' | 'Mega Yacht' | 'Motor Yacht' | 'Entertainment';

export interface YachtSpecs {
    length: string;
    beam: string;
    guests: number;
    cabins: number;
    crew: number;
}

export interface Yacht {
    id: string;
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    images: VehicleImage[];
    tags: YachtTag[];
    userId: string;
    specs: YachtSpecs;
    isAvailable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    userDeleted?: boolean;
}
