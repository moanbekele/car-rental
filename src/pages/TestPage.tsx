import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">RC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Page</h1>
          <p className="text-gray-600 mb-6">This is a test page for the RentCar application.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
