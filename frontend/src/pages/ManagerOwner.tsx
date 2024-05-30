import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";

const ManagerOwner = () => {
  const queryClient = useQueryClient();
  const { data: owners, error, isLoading } = useQuery("fetchOwners", apiClient.fetchOwner);

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentOwnerId, setCurrentOwnerId] = useState<string | null>(null);

  const createOwnerMutation = useMutation(apiClient.createOwner, {
    onSuccess: () => queryClient.invalidateQueries("fetchOwners"),
  });

  const updateOwnerMutation = useMutation(
    (data: { ownerId: string; formData: FormData }) => apiClient.updateOwner(data.ownerId, data.formData),
    {
      onSuccess: () => queryClient.invalidateQueries("fetchOwners"),
    }
  );

  const deleteOwnerMutation = useMutation(apiClient.deleteOwner, {
    onSuccess: () => queryClient.invalidateQueries("fetchOwners"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);

    if (isEditing && currentOwnerId) {
      updateOwnerMutation.mutate({ ownerId: currentOwnerId, formData: form });
    } else {
      createOwnerMutation.mutate(form);
    }

    setFormData({ name: "", email: "" });
    setIsEditing(false);
    setCurrentOwnerId(null);
  };

  const handleEdit = (owner: any) => {
    setIsEditing(true);
    setCurrentOwnerId(owner._id);
    setFormData({ name: owner.name, email: owner.email});
  };

  const handleDelete = (ownerId: string) => {
    deleteOwnerMutation.mutate(ownerId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading owners</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Owner Management</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition"
        >
          {isEditing ? "Update Owner" : "Add Owner"}
        </button>
      </form>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {owners.map((owner: any) => (
            <tr key={owner._id}>
              <td className="px-6 py-4 whitespace-nowrap">{owner.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{owner.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(owner)}
                  className="inline-flex items-center px-2 py-1 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 disabled:opacity-25 transition mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(owner._id)}
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

export default ManagerOwner;
