interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
    {
        name: "Premium",
        price: "$599",
        description: "Perfect for occasional exotic car enthusiasts",
        features: [
            "Access to basic fleet vehicles",
            "24/7 customer support",
            "Basic insurance coverage",
            "10% Off All Rentals",
            "Weekend availability",
            "Standard delivery options",
            "Priority booking on all vehicles"
        ]
    },

    {
        name: "VIP",
        price: "$799",
        description: "Our most popular plan for car enthusiasts",
        features: [
            "Everything included in Basic",
            "Access to premium fleet vehicles",
            "Priority customer support",
            "Enhanced insurance coverage",
            "12% Off All Rentals",
            "Priority weekend booking",
        ],
        highlighted: true
    },

    {
        name: "Elite",
        price: "$999",
        description: "Ultimate luxury car experience",
        features: [
            "Everything included in Premium",
            "Access to entire fleet including supercars",
            "24/7 concierge service",
            "15% Off All Rentals",
            "Comprehensive insurance coverage",
            "Priority booking on all vehicles",
            "Free delivery anywhere"
        ]
    }
];