const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    meals: Array,
    drinks: Array,
    name: String,
    description: String,
    address: String,
    rating: Number,
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
