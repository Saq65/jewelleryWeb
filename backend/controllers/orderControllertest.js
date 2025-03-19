const Order = require("../models/ordermodalTest.js");

const createOrder = async (req, res) => {
    try {
        const { userId,email, orderItems, totalPrice, status ,Address} = req.body;

        if (!userId || !orderItems || orderItems.length === 0 || !totalPrice) {
            return res.status(400).json({ success: false, message: "Invalid order data" });
        }

        const newOrder = new Order({
            userId,
            email,
            orderItems,
            totalPrice,
            status: status || "Pending",
            Address
        });

        await newOrder.save();

        res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Error creating order", error });
    }
};

module.exports = { createOrder };
