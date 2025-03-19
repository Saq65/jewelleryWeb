const express = require('express');
const { createOrder } = require("../controllers/orderControllertest.js");
const router = express.Router();

router.post("/create", createOrder);
module.exports = router;

