import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ManagerBreed: React.FC = () => {
  // Sử dụng useState để lưu trữ danh sách giống
  const [breeds, setBreeds] = useState<string[]>([]);

  // Hàm này được gọi khi nút "Thêm Giống" được nhấp
  const handleAddBreed = () => {
    // Thực hiện các thao tác cần thiết để thêm giống mới vào danh sách
    // Sau đó cập nhật lại danh sách giống
    setBreeds([...breeds, `Breed ${breeds.length + 1}`]);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Giống</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAddBreed}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Thêm Giống
        </button>
        <Link
          to="/"
          className="py-2 px-4 bg-gray-500 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Quay lại Trang Chính
        </Link>
      </div>
      <ul>
        {breeds.map((breed, index) => (
          <li key={index} className="py-2 px-4 border-b border-gray-300">
            {breed}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerBreed;
