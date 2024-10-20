const express = require("express");
const {
  getUserStats,
} = require("../../controllers/admin/adminUser-controller");

const router = express.Router();

// Route to get user statistics
router.get("/stats", getUserStats);

module.exports = router;
