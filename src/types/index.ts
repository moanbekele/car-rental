export interface Brand {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CarHost {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalTrips: number;
  joinDate: string;
  isAllStar: boolean;
  responseTime: string;
}

export interface CarReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CarRatingBreakdown {
  cleanliness: number;
  maintenance: number;
  communication: number;
  convenience: number;
  listingAccuracy: number;
}

export interface CarInsurance {
  provider: string;
  coverage: string;
  details: string;
}

export interface CarGuidelines {
  rules: string[];
  restrictions: string[];
}

export interface CarBasics {
  batteryCapacity?: string;
  capacity: number;
  doors: number;
  transmission: string;
  fuelCapacity?: string;
}

export interface CarAvailability {
  blockedDates: string[];
  minimumRental: number;
  maximumRental: number;
  advanceBookingDays: number;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  model: string;
  imageUrl: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  availability: string;  // Display string
  availabilityData?: CarAvailability;  // Renamed property
  availableFrom?: string;
  seats: number;
  pricePerDay: number;
  currency: string;
  features?: string[];
  isElectric: boolean;
  transmissionType: 'automatic' | 'manual';
  fuelType: 'petrol' | 'electric' | 'hybrid';
  category: 'economy' | 'luxury' | 'suv' | 'sedan' | 'hatchback';
  isAvailable: boolean;
  location?: string;
  trips?: number;
  isLiked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  
  // Extended properties for details page
  host?: CarHost;
  description?: string;
  fullDescription?: string;
  basics?: CarBasics;
  insurance?: CarInsurance;
  guidelines?: CarGuidelines;
  ratingBreakdown?: CarRatingBreakdown;
  reviews?: CarReview[];
  cancellationPolicy?: string;
  pickupLocation?: string;
}

export interface AppData {
  brands: Brand[];
  topRatedCars: Car[];
  mostPopularCars: Car[];
  featuredCars?: Car[];
}
