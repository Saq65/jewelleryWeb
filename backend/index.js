const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authroute = require("../backend/routes/authRoute");
const productroute = require("../backend/routes/productroute");
const banneroute = require("../backend/routes/bannerroute");
const orderRoutes = require("../backend/routes/orderrouteTest");
// const orderRoute = require("../backend/routes/orderRoute");
const path = require('path');
const Razorpay = require('razorpay');

dotenv.config();
const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Server is connected to saqlain database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins, adjust if needed
app.use(express.json({limit:'10mb'}));  // Use built-in express.json() for JSON parsing


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Increase the size limit for URL-encoded bodies (if you're using it)
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/api/auth", authroute);
app.use("/api/product", productroute);
app.use("/api/banner",banneroute);
// app.use("/api/order", orderRoute);
app.use("/api/orders", orderRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    message,
    statuscode,
  });
});


// Create Order API
// app.use("/create-order", async (req, res) => {
//   console.log("Request Body:", req.body); // Debugging
//   try {
//     const options = {
//       amount: req.body.amount * 100, // Convert INR to paisa
//       currency: "INR",
//       receipt: `order_rcptid_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     console.error("Error creating order:", error); // Debugging
//     res.status(500).send({ message: "Internal Server Error", error });
//   }
// });


app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
