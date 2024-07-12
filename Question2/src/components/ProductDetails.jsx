// ProductDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-4 text-white">Product not found</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{product.productName}</h1>
      <div className="border border-gray-700 p-6 rounded-lg shadow-md bg-gray-800">
        <p className="mb-4"><span className="font-bold text-gray-400">Company:</span> <span className="text-lg">{product.company}</span></p>
        <p className="mb-4"><span className="font-bold text-gray-400">Price:</span> <span className="text-lg">${product.price}</span></p>
        <p className="mb-4"><span className="font-bold text-gray-400">Rating:</span> <span className="text-lg">{product.rating}</span></p>
        <p className="mb-4"><span className="font-bold text-gray-400">Discount:</span> <span className="text-lg">{product.discount}%</span></p>
        <p className="mb-4"><span className="font-bold text-gray-400">Availability:</span> <span className="text-lg">{product.availability}</span></p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
