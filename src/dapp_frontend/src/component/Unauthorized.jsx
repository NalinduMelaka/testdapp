import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {

  const navigat = useNavigate();

  const goBack = () => navigat(-1);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Unauthorized</h1>
        <p className="text-gray-700 text-center">
          You are not authorized to view this page. Please contact the administrator for access.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            onClick={goBack}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go back
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
