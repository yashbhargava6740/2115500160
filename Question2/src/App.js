// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProductsPage from './components/AllProductsPage';
import ProductDetailPage from './components/ProductDetails';

// Sample product data
const products = [
  {
    productName: 'Laptop 8',
    price: 153,
    rating: 4.88,
    discount: 22,
    availability: 'yes',
    id: 'e70b53cf-6972-4d20-b634-874d4a16659c',
    company: 'FLP'
  },
  {
    productName: 'Laptop 1',
    price: 2236,
    rating: 4.86,
    discount: 63,
    availability: 'out-of-stock',
    id: 'acd17935-2ed0-4c47-a5ab-272da6a27a43',
    company: 'AMZ'
  }
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProductsPage products={products} />} />
        <Route path="/product/:id" element={<ProductDetailPage products={products} />} />
      </Routes>
    </Router>
  );
};

export default App;
