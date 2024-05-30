import React from 'react';
import { Link } from 'react-router-dom';

const Pet: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col space-y-4">
        <Link
          to="/manager-pet"
          className="py-4 px-8 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Quản Lý Thú Cưng
        </Link>
        <Link
          to="/manager-breed"
          className="py-4 px-8 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Quản Lý Giống
        </Link>
        <Link
          to="/manager-breedtypes"
          className="py-4 px-8 bg-yellow-500 text-white rounded-lg text-lg font-semibold hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
        >
          Quản Lý Loại Giống
        </Link>
      </div>
    </div>
  );
};

export default Pet;
