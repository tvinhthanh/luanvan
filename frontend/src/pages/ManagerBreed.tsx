import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ManagerBreed: React.FC = () => {
  const [breeds, setBreeds] = useState<{ name: string; types: string[] }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAddBreed = () => {
    setBreeds([...breeds, { name: `Breed ${breeds.length + 1}`, types: [] }]);
  };

  const handleAddBreedType = (index: number) => {
    const updatedBreeds = breeds.map((breed, i) => {
      if (i === index) {
        return { ...breed, types: [...breed.types, `Type ${breed.types.length + 1}`] };
      }
      return breed;
    });
    setBreeds(updatedBreeds);
  };

  const handleDeleteBreed = (index: number) => {
    const updatedBreeds = breeds.filter((_, i) => i !== index);
    setBreeds(updatedBreeds);
  };

  const handleDeleteBreedType = (breedIndex: number, typeIndex: number) => {
    const updatedBreeds = breeds.map((breed, i) => {
      if (i === breedIndex) {
        const updatedTypes = breed.types.filter((_, j) => j !== typeIndex);
        return { ...breed, types: updatedTypes };
      }
      return breed;
    });
    setBreeds(updatedBreeds);
  };

  const handleEditBreed = (index: number, newName: string) => {
    const updatedBreeds = breeds.map((breed, i) => (i === index ? { ...breed, name: newName } : breed));
    setBreeds(updatedBreeds);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBreeds = breeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Giống và Loại Giống</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={handleAddBreed}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-4"
          >
            Thêm Giống
          </button>
          <input
            type="text"
            placeholder="Tìm kiếm giống"
            value={searchTerm}
            onChange={handleSearch}
            className="py-2 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <Link
          to="/"
          className="py-2 px-4 bg-gray-500 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Quay lại Trang Chính
        </Link>
      </div>
      <ul>
        {filteredBreeds.map((breed, index) => (
          <li key={index} className="py-2 px-4 border-b border-gray-300">
            <div className="flex justify-between items-center">
              <div>{breed.name}</div>
              <div className="flex">
                <button
                  onClick={() => handleAddBreedType(index)}
                  className="py-1 px-2 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 focus:outline-none focus:bg-green-600 mr-2"
                >
                  Thêm Loại Giống
                </button>
                <button
                //   onClick={() => handleEditBreed(index, prompt('Nhập tên giống mới:', breed.name))}
                  className="py-1 px-2 bg-yellow-500 text-white rounded-lg text-xs font-semibold hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteBreed(index)}
                  className="py-1 px-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Xoá
                </button>
              </div>
            </div>
            <ul className="ml-4">
              {breed.types.map((type, typeIndex) => (
                <li key={typeIndex} className="flex justify-between items-center">
                  <div>{type}</div>
                  <button
                    onClick={() => handleDeleteBreedType(index, typeIndex)}
                    className="py-1 px-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Xoá
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerBreed;
