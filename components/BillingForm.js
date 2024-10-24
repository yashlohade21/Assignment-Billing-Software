import React, { useState } from 'react';

const BillingForm = ({ customers, products, onAddBilling }) => {
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const formData = {
      customer: e.target.billingCustomer.value,
      product: e.target.billingProduct.value,
      quantity: parseInt(e.target.billingQuantity.value)
    };

    const product = products.find(p => p.name === formData.product);
    if (!product) {
      setError('Product not found');
      return;
    }

    if (formData.quantity > product.quantity) {
      setError(`Only ${product.quantity} items available in stock`);
      return;
    }

    onAddBilling(formData);
    e.target.reset();
    setSelectedProduct('');
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    setError('');
  };

  const selectedProductDetails = products.find(p => p.name === selectedProduct);

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="billingCustomer" className="block mb-2 text-gray-700">Customer:</label>
          <select
            id="billingCustomer"
            name="billingCustomer"
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
          <label htmlFor="billingProduct" className="block mb-2 text-gray-700">Product:</label>
          <select
            id="billingProduct"
            name="billingProduct"
            value={selectedProduct}
            onChange={handleProductChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Product</option>
            {products.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name} (Stock: {product.quantity})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="billingQuantity" className="block mb-2 text-gray-700">Quantity:</label>
          <input
            type="number"
            id="billingQuantity"
            name="billingQuantity"
            min="1"
            max={selectedProductDetails?.quantity || 1}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
      {error && (
        <div className="mt-2 text-red-500">{error}</div>
      )}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Billing
      </button>
    </form>
  );
};

export default BillingForm;
