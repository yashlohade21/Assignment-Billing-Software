// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import CustomerList from '../components/CustomerList';
import ProductList from '../components/ProductList';
import BillingForm from '../components/BillingForm';
import BillingList from '../components/BillingList';
import TransactionList from '../components/TransactionList';

export default function Index() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [billings, setBillings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [editingCustomerIndex, setEditingCustomerIndex] = useState(null);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [profileVisible, setProfileVisible] = useState(false);
  const [transactionCustomer, setTransactionCustomer] = useState('');
  const [transactionProducts, setTransactionProducts] = useState('');
  const [transactionQuantity, setTransactionQuantity] = useState('');
  const [headerSearch, setHeaderSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const storedBillings = JSON.parse(localStorage.getItem('billings')) || [];
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

    setCustomers(storedCustomers);
    setProducts(storedProducts);
    setBillings(storedBillings);
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('billings', JSON.stringify(billings));
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [customers, products, billings, transactions]);

  // Transaction handlers
  // Modify handleAddTransaction to update product quantity
  const handleAddTransaction = (newTransaction) => {
    // Find the product
    const productToUpdate = products.find(p => p.name === newTransaction.product);
    
    if (!productToUpdate) {
      alert('Product not found');
      return;
    }

    if (newTransaction.quantity > productToUpdate.quantity) {
      alert('Not enough stock available');
      return;
    }

    // Update product quantity
    const updatedProducts = products.map(product => {
      if (product.name === newTransaction.product) {
        return {
          ...product,
          quantity: product.quantity - newTransaction.quantity
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setTransactions([...transactions, newTransaction]);
    setTransactionCustomer('');
    setTransactionProducts('');
    setTransactionQuantity('');
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const handleEditCustomer = (index) => {
    const customer = customers[index];
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerGender').value = customer.gender;
    document.getElementById('customerContact').value = customer.contact;
    document.getElementById('customerEmail').value = customer.email;
    setEditingCustomerIndex(index);
  };

    const handleDeleteCustomer = (index) => {
      const updatedCustomers = [...customers];
      updatedCustomers.splice(index, 1);
      setCustomers(updatedCustomers);
    };

  // Customer handlers
  const handleAddCustomer = (event) => {
    event.preventDefault();
    const name = event.target.customerName.value;
    const gender = event.target.customerGender.value;
    const contact = event.target.customerContact.value;
    const email = event.target.customerEmail.value;

    // Ensure the contact number is exactly 10 digits
    if (contact.length !== 10 || isNaN(contact)) {
      alert('Phone number should be exactly 10 digits and only numeric values are allowed.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const newCustomer = { name, gender, contact, email };

    if (editingCustomerIndex !== null) {
      const updatedCustomers = [...customers];
      updatedCustomers[editingCustomerIndex] = newCustomer;
      setCustomers(updatedCustomers);
      setEditingCustomerIndex(null);
    } else {
      setCustomers([...customers, newCustomer]);
    }
    event.target.reset();
  };
  
  // Product handlers
  const handleAddProduct = (event) => {
    event.preventDefault();
    const name = event.target.productName.value;
    const price = parseFloat(event.target.productPrice.value);
    const quantity = parseInt(event.target.productQuantity.value);
    const brand = event.target.productBrand.value;
    const supplier = event.target.productSupplier.value;
    const oldStock = parseInt(event.target.oldStock.value);
    const category = event.target.productCategory.value;

    // Price and quantity validation
    if (price < 0 ) {
      alert('Price should not be negative.');
      return;
    }
    if(quantity < 0){
      alert('Quantity should not be negative.');
      return;
    }
    const newProduct = { name, price, quantity, brand, supplier, oldStock, category };

    if (editingProductIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingProductIndex] = newProduct;
      setProducts(updatedProducts);
      setEditingProductIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }
    event.target.reset();
  };


  const handleEditProduct = (index) => {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productQuantity').value = product.quantity;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productSupplier').value = product.supplier;
    document.getElementById('oldStock').value = product.oldStock;
    document.getElementById('productCategory').value = product.category;
    setEditingProductIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleHeaderSearch = (value) => {
    setHeaderSearch(value);
    const results = products.filter(product => 
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.category.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  // Modify the handleAddBilling function to show notification


  // Billing handlers
  const handleAddBilling = (formData) => {
    const selectedProductDetails = products.find(
      (product) => product.name === formData.product
    );

    if (!selectedProductDetails) {
      alert('Product not found');
      return;
    }
    if (formData.quantity > selectedProductDetails.quantity) {
      alert('Not enough stock available');
      return;
    }

    const newBilling = {
      customer: formData.customer,
      product: formData.product,
      price: selectedProductDetails.price,
      quantity: formData.quantity,
      total: selectedProductDetails.price * formData.quantity,
    };

    const updatedProducts = products.map((product) => {
      if (product.name === formData.product) {
        return { ...product, quantity: product.quantity - formData.quantity };
      }
      return product;
    });

    setProducts(updatedProducts);
    setNotificationCount(prev => prev + 1); // Increment notification count
    setBillings([...billings, newBilling]);
  };

  const handlePrintBilling = () => {
    // Create a new window
    const printWindow = window.open('', '_blank');
    
    // Get the billing data to display
    const billingHTML = billings.map((billing) => `
        <tr>
            <td>${billing.customer}</td>
            <td>${billing.product}</td>
            <td>${billing.price.toFixed(2)}</td>
            <td>${billing.quantity}</td>
            <td>${billing.total.toFixed(2)}</td>
        </tr>
    `).join('');

    // Create the HTML structure for the print window
    const printContent = `
        <html>
            <head>
                <title>Billing Receipt</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    h2 { text-align: center; }
                </style>
            </head>
            <body>
                <h2>Billing Receipt</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${billingHTML}
                    </tbody>
                </table>
                <script>
                    window.print();
                    window.onafterprint = function() {
                        window.close();
                    };
                </script>
            </body>
        </html>
    `;

    // Write the content to the print window and print it
    printWindow.document.write(printContent);
    printWindow.document.close();
};


  const handleDeleteBilling = (index) => {
    const updatedBillings = [...billings];
    const billingToDelete = updatedBillings[index];
    
    // Restore the product quantity
    const updatedProducts = products.map((product) => {
      if (product.name === billingToDelete.product) {
        return { ...product, quantity: product.quantity + billingToDelete.quantity };
      }
      return product;
    });

    updatedBillings.splice(index, 1);
    setProducts(updatedProducts);
    setBillings(updatedBillings);
  };

  const handleUpdateBilling = (index, updatedBilling) => {
    const oldBilling = billings[index];
    const quantityDifference = oldBilling.quantity - updatedBilling.quantity;
    
    // Update product quantity
    const updatedProducts = products.map((product) => {
      if (product.name === oldBilling.product) {
        return { ...product, quantity: product.quantity + quantityDifference };
      }
      return product;
    });

    const newBillings = [...billings];
    newBillings[index] = updatedBilling;
    
    setProducts(updatedProducts);
    setBillings(newBillings);
  };

  const totalSales = billings.length;
  const totalRevenue = billings.reduce((sum, billing) => sum + billing.total, 0);

  return (
<div className="bg-gray-100 min-h-screen">
  <Head>
    <title>Billing System</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
    <div className="container mx-auto py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-black">Billing System</h2>
      
      <div className="flex-1 mx-8">
        <input
          type="text"
          placeholder="Search products..."
          value={headerSearch}
          onChange={(e) => handleHeaderSearch(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
        {headerSearch && (
          <div className="absolute bg-white mt-1 w-96 shadow-lg rounded-md max-h-60 overflow-y-auto">
            {searchResults.map((product, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 text-black">
                <div>{product.name}</div>
                <div className="text-sm text-gray-500">
                  Stock: {product.quantity} | Price: ${product.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center">        
        <button
          className="bg-gray-300 rounded-full p-2 mr-4 hover:bg-gray-400 transition-colors duration-200"
          onClick={() => setNotificationCount(0)} // Reset notifications on click
        >
          🛎️ {notificationCount > 0 && <span className="font-semibold">{notificationCount}</span>}
        </button>
        <div className="relative">
          <button
            className="bg-gray-300 rounded-full p-2 hover:bg-gray-400 transition-colors duration-200"
            onMouseEnter={() => setProfileVisible(true)}
            onMouseLeave={() => setProfileVisible(false)}
          >
            👤
          </button>
          {profileVisible && (
            <div className="absolute right-0 w-40 mt-2 p-2 bg-white shadow-lg rounded-md">
              <p className="font-bold mb-1 text-black">Yash Lohade</p>
              <p className="text-black">yashlohade2502@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>

  <main className="container mx-auto mt-16 p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h5 className="text-lg font-bold mb-2 text-black">Total Sales</h5>
        <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h5 className="text-lg font-bold mb-2 text-black">Total Revenue</h5>
        <p className="text-3xl font-bold text-blue-600">INR {totalRevenue.toFixed(2)}</p>
      </div>
    </div>

    <div className="mt-8 bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-black mb-4">Add Customer</h3>
      <form onSubmit={handleAddCustomer} className="mb-4">
        <input type="text" id="customerName" name="customerName" placeholder="Name" className="mb-2 p-2 border rounded text-black w-full" required />
        <select id="customerGender" name="customerGender" className="mb-2 p-2 border rounded text-black w-full" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="number" min="0" id="customerContact" name="customerContact" placeholder="Contact"  className="mb-2 p-2 border rounded text-black w-full" pattern="[0-9]{10}"  required  title="Phone number should be exactly 10 digits." />        
        <input type="email" id="customerEmail" name="customerEmail" placeholder="Email" className="mb-2 p-2 border rounded text-black w-full" required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
          {editingCustomerIndex !== null ? 'Update Customer' : 'Add Customer'}
        </button>
      </form>
      <CustomerList 
        customers={customers} 
        onSearch={setSearchCustomer} 
        searchQuery={searchCustomer} 
        onEdit={handleEditCustomer} 
        onDelete={handleDeleteCustomer} 
      />
    </div>

    <div className="mt-8 bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-black mb-4">Add Product</h3>
      <form onSubmit={handleAddProduct} className="mb-4">
        <input type="text" id="productName" name="productName" placeholder="Product Name" className="mb-2 p-2 border rounded text-black w-full" required />
        <input type="number" min="0" id="productPrice" name="productPrice" placeholder="Price" className="mb-2 p-2 border rounded text-black w-full" required />
        <input type="number" min="0" id="productQuantity" name="productQuantity" placeholder="Quantity" className="mb-2 p-2 border rounded text-black w-full" required />
        <input type="text" id="productBrand" name="productBrand" placeholder="Brand" className="mb-2 p-2 border rounded text-black w-full" required />
        <input type="text" id="productSupplier" name="productSupplier" placeholder="Supplier" className="mb-2 p-2 border rounded text-black w-full" required />
        <input type="number" min="0" id="oldStock" name="oldStock" placeholder="Old Stock" className="mb-2 p-2 border rounded text-black w-full" required />
        <input type="text" id="productCategory" name="productCategory" placeholder="Category" className="mb-2 p-2 border rounded text-black w-full" required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
          {editingProductIndex !== null ? 'Update Product' : 'Add Product'}
        </button>
      </form>
      <ProductList 
        products={products} 
        onSearch={setSearchProduct} 
        searchQuery={searchProduct} 
        onEdit={handleEditProduct} 
        onDelete={handleDeleteProduct} 
      />
    </div>

    <div className="mt-8 bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-black mb-4">Add Billing</h3>
      <BillingForm 
        customers={customers}
        products={products}
        onAddBilling={handleAddBilling}
      />
      <BillingList 
        billings={billings} 
        onPrint={handlePrintBilling}
        onDelete={handleDeleteBilling}
        onUpdate={handleUpdateBilling}
 
      />
    </div>

    <div className="mt-8 bg-white rounded-lg shadow-md p-4">
      <TransactionForm 
        customers={customers}
        products={products}
        onAddTransaction={handleAddTransaction}
        transactionCustomer={transactionCustomer}
        setTransactionCustomer={setTransactionCustomer}
        transactionProducts={transactionProducts}
        setTransactionProducts={setTransactionProducts}
        transactionQuantity={transactionQuantity}
        setTransactionQuantity={setTransactionQuantity}
      />
    </div>

    <div className="mt-8 bg-white rounded-lg shadow-md p-4">
      <TransactionList 
        transactions={transactions} 
        onDelete={handleDeleteTransaction} 
      />
    </div>
  </main>
</div>

  );
}
