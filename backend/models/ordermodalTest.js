const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    orderItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    Address: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"], 
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
