const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    shop_id: {
      type: mongoose.Types.ObjectId,
      ref: "Shop",
    },
    description: String,
    address: String,
    meals:Array,
    drinks:Array,
    total:Object,
    properties:{
      active:{type:Boolean,default:true},
      confirmation:{type:Boolean,default:false},
      rejective:{type:Boolean,default:false},
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
