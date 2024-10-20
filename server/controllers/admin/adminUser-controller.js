// controllers/adminUserController.js

const User = require("../../models/User");

// Function to get user statistics
exports.getUserStats = async (req, res) => {
  try {
    // Get user creation dates grouped by day
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const userStats = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          month: {
            $arrayElemAt: [monthNames, { $subtract: ["$_id.month", 1] }],
          }, // Convert month number to name
          year: "$_id.year",
          count: 1,
        },
      },
    ]);

    res.status(200).json(userStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
