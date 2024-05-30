import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Pet } from "../../../backend/src/shared/types"; 

const ManagerPet: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetching the list of pets
  const { data: pets, error, isLoading } = useQuery<Pet[], Error>("fetchPets", apiClient.fetchpet);

  // State for form data and edit mode
  const [formData, setFormData] = useState<Partial<Pet>>({
    name: "",
    type: "",
    age: "",
    weigh: "",
    breed_id: "",
    owner_id: "",
    sex: "",
    breed_type: "",
    img: "",
  });


  // Mutation for deleting a pet
  const deletePetMutation = useMutation(apiClient.deletePet, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchPets");
    },
  });


  // Handling pet delete
  const handleDelete = (petId: string) => {
    deletePetMutation.mutate(petId);
  };

  // Display loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error loading pets: {error.message}</div>;
  }

  // Display the form and list of pets
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pet Management</h1>
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weigh</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pets?.map((pet: Pet) => (
            <tr key={pet._id}>
              <td className="px-6 py-4 whitespace-nowrap">{pet.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.weigh}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.breed_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.owner_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.sex}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.breed_type}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={pet.img} alt={pet.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* <button
                  onClick={() => handleEdit(pet)}
                  className="inline-flex items-center px-2 py-1 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 disabled:opacity-25 transition mr-2"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDelete(pet._id)}
                  className="inline-flex items-center px-2 py-1 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerPet;
