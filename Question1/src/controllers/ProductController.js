const { fetchProducts, fetchProductDetails } = require('../services/productService');

const getProducts = async (req, res) => {
  const { categoryname } = req.params;
  const { top, minPrice, maxPrice, page, sort, order } = req.query;

  try {
    const topValue = Number(top) || 10;
    const pageValue = Number(page) || 1;
    
    if (topValue > 10 && !page) {
      return res.status(400).json({ message: 'Page parameter is required when top is greater than 10' });
    }

    const result = await fetchProducts(
      categoryname,
      topValue,
      minPrice,
      maxPrice,
      pageValue,
      sort,
      order
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getProductDetails = async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    const product = await fetchProductDetails(categoryname, productid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error });
  }
};

module.exports = {
  getProducts,
  getProductDetails,
};
