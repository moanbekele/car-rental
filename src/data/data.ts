import type { AppData, Brand, Car } from '../types';

// Import brand images
import menuAllImg from '../assets/images/brands/menu_all.png';
import bydImg from '../assets/images/brands/byd.png';
import toyotaImg from '../assets/images/brands/toyota.png';
import suzukiImg from '../assets/images/brands/suzuki.png';
import teslaImg from '../assets/images/brands/tesla.png';
import mercedesImg from '../assets/images/brands/mercedes.png';
import audiImg from '../assets/images/brands/audi.png';

// Import car images
import id4Img from '../assets/images/cars/id4.png';
import teslaCarImg from '../assets/images/cars/tesla.png';
import suzukiCarImg from '../assets/images/cars/suzuki.png';
import bydCarImg from '../assets/images/cars/byd.png';
import chevyImg from '../assets/images/cars/chevy.png';

// Brands Data
const brands: Brand[] = [
  {
    id: 'all',
    name: 'All',
    slug: 'all',
    imageUrl: menuAllImg,
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'byd',
    name: 'BYD',
    slug: 'byd',
    imageUrl: bydImg,
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'toyota',
    name: 'Toyota',
    slug: 'toyota',
    imageUrl: toyotaImg,
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'suzuki',
    name: 'SUZUKI',
    slug: 'suzuki',
    imageUrl: suzukiImg,
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'tesla',
    name: 'Tesla',
    slug: 'tesla',
    imageUrl: teslaImg,
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mercedes',
    name: 'Mercedes',
    slug: 'mercedes',
    imageUrl: mercedesImg,
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'audi',
    name: 'Audi',
    slug: 'audi',
    imageUrl: audiImg,
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  }
];

// Top Rated Cars Data
const topRatedCars: Car[] = [
  {
    id: 'car-001',
    name: 'Volkswagen Id4 Pro',
    brand: 'volkswagen',
    year: 2024,
    model: 'ID.4 Pro',
    imageUrl: id4Img,
    rating: 5.0,
    reviewCount: 24,
    availability: 'Available Now',
    availableFrom: new Date().toISOString(),
    seats: 4,
    pricePerDay: 7000,
    currency: 'ETB',
    features: ['Electric', 'Auto Pilot', 'Premium Interior', 'Fast Charging'],
    isElectric: true,
    transmissionType: 'automatic',
    fuelType: 'electric',
    category: 'suv',
    isAvailable: true,
    location: 'Addis Ababa',
    trips: 15,
    isLiked: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-06-30T00:00:00Z'
  },
  {
    id: 'car-002',
    name: 'Tesla Model Y',
    brand: 'tesla',
    year: 2023,
    model: 'Model Y Long Range',
    imageUrl: teslaCarImg,
    rating: 4.97,
    reviewCount: 89,
    availability: 'Available from 8 September',
    availableFrom: '2025-09-08T00:00:00Z',
    seats: 4,
    pricePerDay: 9000,
    currency: 'ETB',
    features: ['Full Self-Driving', 'Supercharging', 'Premium Audio', 'Glass Roof'],
    isElectric: true,
    transmissionType: 'automatic',
    fuelType: 'electric',
    category: 'suv',
    isAvailable: false,
    location: 'Addis Ababa',
    trips: 45,
    isLiked: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-06-30T00:00:00Z'
  },
  {
    id: 'car-003',
    name: 'Suzuki Dzire',
    brand: 'suzuki',
    year: 2022,
    model: 'Dzire VXI',
    imageUrl: suzukiCarImg,
    rating: 4.92,
    reviewCount: 156,
    availability: 'Available Now',
    availableFrom: new Date().toISOString(),
    seats: 4,
    pricePerDay: 2000,
    currency: 'ETB',
    features: ['Fuel Efficient', 'Comfortable Seating', 'AC', 'Bluetooth'],
    isElectric: false,
    transmissionType: 'manual',
    fuelType: 'petrol',
    category: 'sedan',
    isAvailable: true,
    location: 'Addis Ababa',
    trips: 203,
    isLiked: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-06-30T00:00:00Z'
  },
  {
    id: 'car-004',
    name: 'BYD Electric Kiray',
    brand: 'byd',
    year: 2024,
    model: 'Kiray Electric',
    imageUrl: bydCarImg,
    rating: 5.0,
    reviewCount: 67,
    availability: 'Available from 2 August',
    availableFrom: '2025-08-02T00:00:00Z',
    seats: 4,
    pricePerDay: 2000,
    currency: 'ETB',
    features: ['Electric', 'Long Range', 'Fast Charging', 'Smart Features'],
    isElectric: true,
    transmissionType: 'automatic',
    fuelType: 'electric',
    category: 'hatchback',
    isAvailable: false,
    location: 'Addis Ababa',
    trips: 12,
    isLiked: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-06-30T00:00:00Z'
  }
];

// Most Popular Cars Data
const mostPopularCars: Car[] = [
  {
    id: 'car-005',
    name: 'Chevrolet Captiva',
    brand: 'chevrolet',
    year: 2023,
    model: 'Captiva LTZ',
    imageUrl: chevyImg,
    rating: 5.0,
    reviewCount: 87,
    availability: 'Available from 2 August',
    availableFrom: '2025-08-02T00:00:00Z',
    seats: 4,
    pricePerDay: 8000,
    currency: 'ETB',
    features: ['7 Seater', 'Turbo Engine', 'Premium Interior', 'Safety Features'],
    isElectric: false,
    transmissionType: 'automatic',
    fuelType: 'petrol',
    category: 'suv',
    isAvailable: false,
    location: 'Addis Ababa',
    trips: 5,
    isLiked: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-06-30T00:00:00Z'
  },
  {
    id: 'car-006',
    name: 'Tesla Model Y',
    brand: 'tesla',
    year: 2023,
    model: 'Model Y Long Range',
    imageUrl: teslaCarImg,
    rating: 4.9,
    reviewCount: 89,
    availability: 'Available from 8 September',
    availableFrom: '2025-09-08T00:00:00Z',
    seats: 4,
    pricePerDay: 9000,
    currency: 'ETB',
    features: ['Full Self-Driving', 'Supercharging', 'Premium Audio', 'Glass Roof'],
    isElectric: true,
    transmissionType: 'automatic',
    fuelType: 'electric',
    category: 'suv',
    isAvailable: false,
    location: 'Addis Ababa',
    trips: 12,
    isLiked: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-06-30T00:00:00Z'
  },
  {
    id: 'car-007',
    name: 'Suzuki Dzire',
    brand: 'suzuki',
    year: 2022,
    model: 'Dzire VXI',
    imageUrl: suzukiCarImg,
    rating: 4.8,
    reviewCount: 156,
    availability: 'Available Now',
    availableFrom: new Date().toISOString(),
    seats: 4,
    pricePerDay: 2000,
    currency: 'ETB',
    features: ['Fuel Efficient', 'Comfortable Seating', 'AC', 'Bluetooth'],
    isElectric: false,
    transmissionType: 'manual',
    fuelType: 'petrol',
    category: 'sedan',
    isAvailable: true,
    location: 'Addis Ababa',
    trips: 8,
    isLiked: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-06-30T00:00:00Z'
  }
];

// Main App Data Export
export const appData: AppData = {
  brands,
  topRatedCars,
  mostPopularCars,
  featuredCars: [...topRatedCars.slice(0, 2), ...mostPopularCars.slice(0, 2)]
};

// Individual exports for easier component usage
export { brands, topRatedCars, mostPopularCars };

// Utility functions for backend integration
export const getCarsByBrand = (brandSlug: string): Car[] => {
  if (brandSlug === 'all') {
    return [...topRatedCars, ...mostPopularCars];
  }
  return [...topRatedCars, ...mostPopularCars].filter(car => car.brand === brandSlug);
};

export const getCarById = (carId: string): Car | undefined => {
  return [...topRatedCars, ...mostPopularCars].find(car => car.id === carId);
};

export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find(brand => brand.slug === slug);
};
