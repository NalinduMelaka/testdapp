// NotFound.js
import React from 'react';

const Missing = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">404 - Not Found</h1>
        <p className="text-gray-700 text-center">
          The page you are looking for does not exist. Please check the URL or go back to the
          homepage.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Missing;
