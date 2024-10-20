const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductStats = async (req, res) => {
  try {
    // 1. Product count by category
    const categoryStats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // 2. Product count by brand
    const brandStats = await Product.aggregate([
      { $group: { _id: "$brand", count: { $sum: 1 } } },
    ]);

    // 3. Average price for each category
    const avgPriceByCategory = await Product.aggregate([
      { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
    ]);

    // 4. Total stock for each product
    const stockStats = await Product.find({}, { title: 1, totalStock: 1 });

    res.status(200).json({
      success: true,
      data: {
        categoryStats,
        brandStats,
        avgPriceByCategory,
        stockStats,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product stats",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails, getProductStats };
