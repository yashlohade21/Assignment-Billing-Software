import React, { useState } from 'react';

const ProductList = ({ products, onSearch, searchQuery, onEdit, onDelete, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    brand: '',
    supplier: '',
    oldStock: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.quantity && newProduct.brand && newProduct.supplier && newProduct.oldStock && newProduct.category) {
      setProducts((prev) => [
        ...prev, 
        { 
          ...newProduct, 
          price: parseFloat(newProduct.price), 
          quantity: parseInt(newProduct.quantity), 
          oldStock: parseInt(newProduct.oldStock) 
        }
      ]);
      setNewProduct({ name: '', price: '', quantity: '', brand: '', supplier: '', oldStock: '', category: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Products List</h2>

      <input
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="mb-4 p-2 border rounded text-black"
      />

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-black">Name</th>
            <th className="px-4 py-2 text-black">Price</th>
            <th className="px-4 py-2 text-black">Quantity</th>
            <th className="px-4 py-2 text-black">Brand</th>
            <th className="px-4 py-2 text-black">Supplier</th>
            <th className="px-4 py-2 text-black">Old Stock</th>
            <th className="px-4 py-2 text-black">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((product, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-black">{product.name}</td>
              <td className="border px-4 py-2 text-black">${product.price.toFixed(2)}</td>
              <td className="border px-4 py-2 text-black">{product.quantity}</td>
              <td className="border px-4 py-2 text-black">{product.brand}</td>
              <td className="border px-4 py-2 text-black">{product.supplier}</td>
              <td className="border px-4 py-2 text-black">{product.oldStock}</td>
              <td className="border px-4 py-2 text-black">{product.category}</td>
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

export default ProductList;
