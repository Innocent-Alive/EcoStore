const express = require("express");

const {
  getAverageReviews,
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

router.get("/average", getAverageReviews);

module.exports = router;
