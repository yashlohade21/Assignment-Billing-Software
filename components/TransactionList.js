import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Transactions List</h2>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-black">Customer</th>
            <th className="px-4 py-2 text-black">Product</th>
            <th className="px-4 py-2 text-black">Quantity</th>
            <th className="px-4 py-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-black">{transaction.customer}</td>
              <td className="border px-4 py-2 text-black">{transaction.product}</td>
              <td className="border px-4 py-2 text-black">{transaction.quantity}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onDelete(index)}
                  className="text-red-500 hover:underline"
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

export default TransactionList;
