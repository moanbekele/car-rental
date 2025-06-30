export interface Brand {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  model: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  availability: string;
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
}

export interface AppData {
  brands: Brand[];
  topRatedCars: Car[];
  mostPopularCars: Car[];
  featuredCars?: Car[];
}
