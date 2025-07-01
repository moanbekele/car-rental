import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Car, MapPin } from 'lucide-react';
import { getCarById } from '../data/data';
import { useBooking } from '../contexts/BookingContext';

const SelectDate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);

  const car = getCarById(id || '');

  useEffect(() => {
    if (!car) {
      navigate('/');
    }
  }, [car, navigate]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-md bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h2>
          <p className="text-gray-600 mb-6">The car you're looking for doesn't exist or has been removed.</p>
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

  // Helper functions
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const isDateBlocked = (date: Date): boolean => {
    if (!car.availabilityData?.blockedDates) return false;
    const dateString = date.toISOString().split('T')[0];
    return car.availabilityData.blockedDates.includes(dateString);
  };

  const isBeforeToday = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSameDate = (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString();
  };

  const isDateInRange = (date: Date, start: Date | null, end: Date | null): boolean => {
    if (!start || !end) return false;
    const dateTime = date.getTime();
    return dateTime >= start.getTime() && dateTime <= end.getTime();
  };

  const isDateRangeStart = (date: Date): boolean => {
    return startDate ? isSameDate(date, startDate) : false;
  };

  const isDateRangeEnd = (date: Date): boolean => {
    return endDate ? isSameDate(date, endDate) : false;
  };

  const calculateTotalDays = (): number => {
    if (!startDate || !endDate) return 0;
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  const calculateTotalPrice = (): number => {
    const days = calculateTotalDays();
    return days * car.pricePerDay;
  };

  // Event handlers
  const handleDateClick = (date: Date): void => {
    if (isDateBlocked(date) || isBeforeToday(date)) return;

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
      setIsSelectingEndDate(true);
    } else if (isSelectingEndDate) {
      // Complete the range
      if (date < startDate) {
        // If clicked date is before start date, swap them
        setEndDate(startDate);
        setStartDate(date);
      } else if (isSameDate(date, startDate)) {
        // If clicked same date as start, clear selection
        setStartDate(null);
        setEndDate(null);
        setIsSelectingEndDate(false);
      } else {
        // Normal end date selection
        setEndDate(date);
      }
      setIsSelectingEndDate(false);
    }
  };

  const handleBack = (): void => {
    navigate(`/car/${id}`);
  };

  const handleReset = (): void => {
    setStartDate(null);
    setEndDate(null);
    setIsSelectingEndDate(false);
  };

  const handleNextMonth = (): void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handlePrevMonth = (): void => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const today = new Date();
    
    // Don't allow navigation to months before current month
    if (prevMonth.getFullYear() < today.getFullYear() || 
        (prevMonth.getFullYear() === today.getFullYear() && prevMonth.getMonth() < today.getMonth())) {
      return;
    }
    
    setCurrentMonth(prevMonth);
  };

  const handleSave = (): void => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    // Save booking data to context
    updateBooking({
      carId: car.id,
      carName: car.name,
      carImage: car.imageUrl,
      pricePerDay: car.pricePerDay,
      currency: car.currency,
      startDate,
      endDate,
      totalDays: calculateTotalDays(),
      totalPrice: calculateTotalPrice()
    });

    // Navigate to pickup selection
    navigate(`/car/${car.id}/select-pickup`);
  };

  // Calendar generation
  const generateCalendarDays = (): (Date | null)[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Utility functions
  const formatDate = (date: Date | null): string => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price: number): string => {
    return `${car.currency} ${price.toLocaleString()}`;
  };

  const days = generateCalendarDays();
  const today = new Date();
  const isPrevButtonDisabled = currentMonth.getFullYear() <= today.getFullYear() && 
                               currentMonth.getMonth() <= today.getMonth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
            <h1 className="text-2xl font-bold text-gray-900">Select Dates</h1>
            <p className="text-gray-600">Choose your rental period</p>
          </div>
        </div>

        {/* Car Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">{car.name}</h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Car size={14} />
                <span>{car.year} • {car.seats} seats</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin size={14} />
                <span>{car.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900 text-lg">
                {formatPrice(car.pricePerDay)}
              </div>
              <div className="text-gray-500 text-sm">per day</div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              disabled={isPrevButtonDisabled}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isPrevButtonDisabled 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="text-center">
              <h2 className="font-bold text-gray-900 text-lg">
                {currentMonth.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </h2>
            </div>
            
            <button
              onClick={handleNextMonth}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-500 text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              if (!date) {
                return <div key={index} className="h-12"></div>;
              }

              const blocked = isDateBlocked(date);
              const beforeToday = isBeforeToday(date);
              const isDisabled = blocked || beforeToday;
              const isStart = isDateRangeStart(date);
              const isEnd = isDateRangeEnd(date);
              const inRange = isDateInRange(date, startDate, endDate);

              let buttonClass = `h-12 w-full rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 `;

              if (isDisabled) {
                buttonClass += 'bg-gray-100 text-gray-400 cursor-not-allowed ';
              } else if (isStart || isEnd) {
                buttonClass += 'bg-emerald-500 text-white shadow-lg scale-105 ';
              } else if (inRange) {
                buttonClass += 'bg-emerald-100 text-emerald-700 ';
              } else {
                buttonClass += 'bg-gray-50 text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 ';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={isDisabled}
                  className={buttonClass}
                  title={blocked ? 'Date not available' : beforeToday ? 'Past date' : ''}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Selection Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-emerald-600" />
            Selected Dates
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-semibold text-gray-900">
                {startDate ? formatDate(startDate) : 'Select date'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-semibold text-gray-900">
                {endDate ? formatDate(endDate) : 'Select date'}
              </span>
            </div>

            {startDate && endDate && (
              <>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total days:</span>
                  <span className="font-semibold text-gray-900">{calculateTotalDays()} days</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total price:</span>
                  <span className="font-bold text-emerald-600 text-lg">
                    {formatPrice(calculateTotalPrice())}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 px-6 rounded-2xl font-semibold transition-colors duration-200"
          >
            Reset
          </button>
          
          <button
            onClick={handleSave}
            disabled={!startDate || !endDate}
            className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-200 ${
              startDate && endDate
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default SelectDate;
