# Billing Management System

A modern web-based billing and inventory management system built with Next.js and React.

## Tech Stack

- **Frontend Framework**: Next.js 15.0.1
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: Local Storage
- **Build Tool**: npm

## Features

- Customer Management
- Product Inventory
- Billing Generation
- Transaction History
- Real-time Product Search
- Stock Management
- Billing PDF Generation
- Notification System

## Installation

1. Clone the repository:
```bash
git clone [https://github.com/yashlohade21/Assignment-Billing-Software.git]
```

2. Navigate to project directory:
```bash
cd billing-system
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Customer Management
- Add new customers with details like name, gender, contact, and email
- Edit or delete existing customers
- Search customers by name

### Product Management
- Add products with name, price, quantity, brand, supplier, and category
- Track stock levels automatically
- Edit or delete products
- Search products by name or category

### Billing
- Create bills by selecting customer and products
- Automatic stock adjustment
- Print bills
- View billing history
- Edit or delete bills

### Transactions
- Record transactions with customer and product details
- Automatic stock updates
- View transaction history

## Data Storage
The application uses browser's Local Storage to persist data. This means:
- Data remains after page refresh
- No backend database required
- Data is stored locally in the browser

## Contributing
Feel free to open issues and pull requests for any improvements.
