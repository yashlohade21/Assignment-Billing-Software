import React, { useState } from 'react';

const CustomerList = ({ customers, onSearch, searchQuery, onEdit, onDelete, setCustomers }) => {
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    gender: '',
    contact: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.gender && newCustomer.contact && newCustomer.email) {
      setCustomers((prev) => [...prev, newCustomer]);
      setNewCustomer({ name: '', gender: '', contact: '', email: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Customers List</h2>

      {/* <form onSubmit={handleAddCustomer} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCustomer.name}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded text-black"
          required
        />
        <select
          name="gender"
          value={newCustomer.gender}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded text-black"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={newCustomer.contact}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded text-black"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded text-black"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Customer
        </button>
      </form> */}

      <input
        type="text"
        placeholder="Search Customers..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="mb-4 p-2 border rounded text-black"
      />

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-black">Name</th>
            <th className="px-4 py-2 text-black">Gender</th>
            <th className="px-4 py-2 text-black">Contact</th>
            <th className="px-4 py-2 text-black">Email</th>
            <th className="px-4 py-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.filter(customer => 
            customer.name.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((customer, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-black">{customer.name}</td>
              <td className="border px-4 py-2 text-black">{customer.gender}</td>
              <td className="border px-4 py-2 text-black">{customer.contact}</td>
              <td className="border px-4 py-2 text-black">{customer.email}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(index)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="text-red-500 hover:underline ml-2"
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

export default CustomerList;
