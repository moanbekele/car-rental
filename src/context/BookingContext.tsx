import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PickupLocation {
  type: 'predefined' | 'custom';
  name: string;
  address: string;
  coordinates?: [number, number];
  additionalCost: number;
}

export interface BookingState {
  // Car details
  carId: string;
  carName: string;
  carImage: string;
  pricePerDay: number;
  currency: string;
  
  // Date selection
  startDate: Date | null;
  endDate: Date | null;
  totalDays: number;
  totalPrice: number;
  
  // Pickup location
  pickupLocation?: PickupLocation;
}

interface BookingContextType {
  booking: BookingState;
  updateBooking: (updates: Partial<BookingState>) => void;
  clearBooking: () => void;
}

const initialBookingState: BookingState = {
  carId: '',
  carName: '',
  carImage: '',
  pricePerDay: 0,
  currency: 'ETB',
  startDate: null,
  endDate: null,
  totalDays: 0,
  totalPrice: 0,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [booking, setBooking] = useState<BookingState>(initialBookingState);

  const updateBooking = (updates: Partial<BookingState>) => {
    setBooking(prev => ({ ...prev, ...updates }));
  };

  const clearBooking = () => {
    setBooking(initialBookingState);
  };

  return (
    <BookingContext.Provider value={{ booking, updateBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
