import { useState } from 'react';

export default function TransactionForm({ 
  customers, 
  products, 
  onAddTransaction,
  transactionCustomer,
  setTransactionCustomer,
  transactionProducts,
  setTransactionProducts,
  transactionQuantity,
  setTransactionQuantity
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTransaction = {
      customer: transactionCustomer,
      product: transactionProducts,
      quantity: parseInt(transactionQuantity),
    };

    onAddTransaction(newTransaction);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="transactionCustomer" className="block mb-2 text-gray-700">
            Customer:
          </label>
          <select
            id="transactionCustomer"
            value={transactionCustomer}
            onChange={(e) => setTransactionCustomer(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer, index) => (
              <option key={index} value={customer.name}>{customer.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="transactionProducts" className="block mb-2 text-gray-700">
            Products:
          </label>
          <select
            id="transactionProducts"
            value={transactionProducts}
            onChange={(e) => setTransactionProducts(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Product</option>
            {products.map((product, index) => (
              <option key={index} value={product.name}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="transactionQuantity" className="block mb-2 text-gray-700">
            Quantity:
          </label>
          <input
            type="number"
            id="transactionQuantity"
            value={transactionQuantity}
            onChange={(e) => setTransactionQuantity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            min="1"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
}
