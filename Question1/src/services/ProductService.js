const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'products.json');

const readData = () => {
  if (fs.existsSync(dataFilePath)) {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
  }
  return {};
};
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const productMap = readData();
const fetchProducts = async (categoryname, top = 10, minPrice = "1", maxPrice = "20000", page = 1, sort = 'rating', order = 'desc') => {
  const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
  const allProducts = [];
  for (const company of companies) {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${process.env.JWT}`
      }
    });
    response.data.slice(0, top).forEach((product) => {
      // Check if the product already has an assigned ID
      const existingProduct = Object.values(productMap).find(p => p.company === company && p.originalId === product.id);
      const id = existingProduct ? existingProduct.id : uuidv4();
      const productWithId = {
        ...product,
        id,
        originalId: product.id,
        company
      };
      productMap[id] = productWithId;
      allProducts.push(productWithId);
    });
  }
  writeData(productMap);
  allProducts.sort((a, b) => {
    if (order === 'asc') {
      return a[sort] - b[sort];
    } else {
      return b[sort] - a[sort];
    }
  });
  const pageSize = 10;
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);
  let startIndex = (page - 1) * pageSize;
  let endIndex = startIndex + pageSize;
  if (top <= pageSize || startIndex + pageSize > top) {
    endIndex = Math.min(startIndex + pageSize, top);
  }
  const paginatedProducts = allProducts.slice(startIndex, endIndex);
  return {
    page,
    totalPages,
    products: paginatedProducts
  };
};

const fetchProductDetails = async (productid) => {
  const product = productMap[productid];
  if (product) {
    return product;
  }
  throw new Error('Product not found');
};

module.exports = {
  fetchProducts,
  fetchProductDetails,
  productMap
};
