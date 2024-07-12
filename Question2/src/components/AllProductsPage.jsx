// AllProductsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AllProductsPage = ({ products }) => {
  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-800 transform transition hover:scale-105 gap-4"
          >
            <h2 className="text-2xl font-semibold mb-2">{product.productName}</h2>
            <p className="mb-1"><strong>Company:</strong> {product.company}</p>
            <p className="mb-1"><strong>Price:</strong> ${product.price}</p>
            <p className="mb-1"><strong>Rating:</strong> {product.rating}</p>
            <p className="mb-1"><strong>Discount:</strong> {product.discount}%</p>
            <p className="mb-4"><strong>Availability:</strong> {product.availability}</p>
            <Link
              to={`/product/${product.id}`}
              className="inline-block px-4 py-2 border border-blue-500 rounded-lg text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transform transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
