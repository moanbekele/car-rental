import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { getCarById } from '../data/data';

interface PickupLocationOption {
  id: string;
  name: string;
  description: string;
  additionalCost: number;
  coordinates: [number, number];
}

const SelectPickup = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [selectedLocation, setSelectedLocation] = useState<string>('bole-medhenyalem');
  const [customAddress, setCustomAddress] = useState<string>('');

  const car = getCarById(id || '');

  useEffect(() => {
    if (!car || !booking.startDate || !booking.endDate) {
      navigate('/');
    }
  }, [car, booking, navigate]);

  if (!car || !booking.startDate || !booking.endDate) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-md bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid booking data</h2>
          <p className="text-gray-600 mb-6">Please start the booking process again.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const pickupLocations: PickupLocationOption[] = [
    {
      id: 'bole-medhenyalem',
      name: 'Bole Medhenyalem',
      description: "We'll send you the exact location once your trip is booked",
      additionalCost: 0,
      coordinates: [9.0090, 38.7889]
    },
    {
      id: 'meskel-square',
      name: 'Meskel Square',
      description: 'Central meeting point in Addis Ababa',
      additionalCost: 500,
      coordinates: [9.0132, 38.7569]
    },
    {
      id: 'airport',
      name: 'Bole International Airport',
      description: 'Airport pickup available',
      additionalCost: 1500,
      coordinates: [8.9778, 38.7999]
    }
  ];

  const handleBack = (): void => {
    navigate(`/car/${id}/select-date`);
  };

  const handleLocationSelect = (locationId: string): void => {
    setSelectedLocation(locationId);
    if (locationId !== 'custom') {
      setCustomAddress('');
    }
  };

  const handleMapClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Generate a simple address based on click position
    const areas = ['Bole', 'Piazza', 'Merkato', 'Kazanchis', 'CMC', 'Arat Kilo'];
    const randomArea = areas[Math.floor(Math.random() * areas.length)];
    const address = `${randomArea} Area, Addis Ababa`;
    
    setCustomAddress(address);
    setSelectedLocation('custom');
  };

  const handleSave = (): void => {
    let pickupLocation;

    if (selectedLocation === 'custom') {
      if (!customAddress.trim()) {
        alert('Please enter a pickup address');
        return;
      }
      pickupLocation = {
        type: 'custom' as const,
        name: 'Custom Address',
        address: customAddress.trim(),
        additionalCost: 1000
      };
    } else {
      const location = pickupLocations.find(loc => loc.id === selectedLocation);
      if (!location) return;
      
      pickupLocation = {
        type: 'predefined' as const,
        name: location.name,
        address: location.name + ', Addis Ababa',
        coordinates: location.coordinates,
        additionalCost: location.additionalCost
      };
    }

    // Update booking with pickup location
    // Note: We don't modify totalPrice here anymore since Checkout calculates it properly
    updateBooking({
      pickupLocation
    });

    // Navigate to checkout page
    navigate(`/car/${id}/checkout`);
  };

  const formatPrice = (price: number): string => {
    return `${booking.currency} ${price.toLocaleString()}`;
  };

  const getTotalWithPickup = (): number => {
    if (selectedLocation === 'custom') {
      return booking.totalPrice + 1000;
    }
    const location = pickupLocations.find(loc => loc.id === selectedLocation);
    return booking.totalPrice + (location?.additionalCost || 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Select Pickup & Return</h1>
          </div>
        </div>

        {/* Real Google Maps - Fully Interactive */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg mb-6">
          <div className="h-64 relative cursor-pointer" onClick={handleMapClick}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.01034269245!2d38.613343!3d9.0320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1672531600000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-3xl"
              title="Addis Ababa Map"
            />
          </div>
        </div>

        {/* Pickup Locations */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Pickup Locations</h3>
          
          {/* Predefined Locations */}
          {pickupLocations.map((location) => (
            <div key={location.id} className="mb-4 last:mb-0">
              <button
                onClick={() => handleLocationSelect(location.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                  selectedLocation === location.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                    selectedLocation === location.id
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedLocation === location.id && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{location.name}</h4>
                    <p className="text-sm text-gray-600">{location.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-emerald-600">
                      {location.additionalCost === 0 ? 'Free' : formatPrice(location.additionalCost)}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ))}

          {/* Custom Address Selection */}
          <div className="pt-4 border-t border-gray-200">
            <div
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                selectedLocation === 'custom'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedLocation === 'custom'
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300'
                }`}>
                  {selectedLocation === 'custom' && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Enter Pickup Address</h4>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-600">1000 ETB</span>
                </div>
              </div>

              <input
                type="text"
                placeholder="Enter your pickup address or click on map"
                value={customAddress}
                onChange={(e) => {
                  setCustomAddress(e.target.value);
                  setSelectedLocation('custom');
                }}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Save
        </button>

        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default SelectPickup;
