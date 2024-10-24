import React, { useState } from 'react';

const BillingList = ({ billings, onPrint, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedBilling, setEditedBilling] = useState(null);
  const [error, setError] = useState('');

  const handleEdit = (billing, index) => {
    setEditingId(index);
    setEditedBilling({ ...billing });
    setError('');
  };

  const handleUpdate = (index) => {
    if (editedBilling.quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    onUpdate(index, editedBilling);
    setEditingId(null);
    setEditedBilling(null);
    setError('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedBilling(null);
    setError('');
  };

  const totalAmount = billings.reduce((sum, billing) => sum + billing.total, 0);

  if (billings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4 text-black">Billing List</h2>
        <p className="text-gray-500">No billings available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Billing List</h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-black">Total Amount: INR {totalAmount.toFixed(2)}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-black">Customer</th>
              <th className="px-4 py-2 text-black">Product</th>
              <th className="px-4 py-2 text-black">Price</th>
              <th className="px-4 py-2 text-black">Quantity</th>
              <th className="px-4 py-2 text-black">Total</th>
              <th className="px-4 py-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((billing, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-black">
                  {editingId === index ? (
                    <input
                      type="text"
                      value={editedBilling.customer}
                      onChange={(e) => setEditedBilling({...editedBilling, customer: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  ) : billing.customer}
                </td>
                <td className="border px-4 py-2 text-black">{billing.product}</td>
                <td className="border px-4 py-2 text-black">INR {billing.price.toFixed(2)}</td>
                <td className="border px-4 py-2 text-black">
                  {editingId === index ? (
                    <input
                      type="number"
                      value={editedBilling.quantity}
                      min="1"
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value);
                        setEditedBilling({
                          ...editedBilling, 
                          quantity: quantity,
                          total: billing.price * quantity
                        });
                      }}
                      className="w-full p-1 border rounded"
                    />
                  ) : billing.quantity}
                </td>
                <td className="border px-4 py-2 text-black">INR {billing.total.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  {editingId === index ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdate(index)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(billing, index)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="mt-2 text-red-500">{error}</div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={onPrint}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span>Print Billing</span>
        </button>
      </div>
    </div>
  );
};

export default BillingList;
