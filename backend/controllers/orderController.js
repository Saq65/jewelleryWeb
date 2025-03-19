const Order = require("../models/orderModal.js");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");
// const https = require("node-https");
const { log } = require("console");
// const https = require('https');

exports.create_order = catchAsyncErrors(async (req, res, next) => {
  try {
    const { Email, Mobile, Username, ClientId, Address } = req.body;

    // ✅ Validate required fields
    if (!Email || !Mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile and Email are required fields.",
      });
    }

    // ✅ Create Order
    const order = new Order({
      Email,
      Mobile,
      Username,
      ClientId,
      Address
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Your order has been placed successfully!",
      order,  // ✅ Send the saved order back in response
    });
  } catch (error) {
    console.error("🚨 Order creation failed:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error,
    });
  }
});


exports.createOrderForWebsite = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.create(req.body);

    let respo = "";
    let txnTokenResponce = "";
    // hashcode

    var paytmParams = {};
    let https;

    paytmParams.body = {
      requestType: "Payment",
      mid: "SHANTI03800179145316",
      websiteName: "WEBSTAGING",
      orderId: order._id,
      callbackUrl: `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${order._id}`,
      txnAmount: {
        value: order.GrandTotal,
        currency: "INR",
      },
      userInfo: {
        custId: order.ClientId,
      },
    };

    /* import checksum generation utility */
    const totalAmount = JSON.stringify(order.GrandTotal);

    var params = {};

    /* initialize an array */
    (params["MID"] = "SHANTI03800179145316"),
      (params["WEBSITE"] = "WEBSTAGING"),
      (params["CHANNEL_ID"] = "WEB"),
      (params["INDUSTRY_TYPE_ID"] = "Retail"),
      (params["ORDER_ID"] = order._id),
      (params["CUST_ID"] = order.ClientId),
      (params["TXN_AMOUNT"] = totalAmount),
      (params["CALLBACK_URL"] = "http://localhost:5000/api/callback"),
      (params["EMAIL"] = "sharadsinha08@gmail.com"),
      (params["MOBILE_NO"] = "9876543210");

    /**
     * Generate checksum by parameters we have
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    var paytmChecksum = PaytmChecksum.generateSignature(
      params,
      "5uP5UMcOeaDg@aaY"
    );
    paytmChecksum
      .then(function (checksum) {
        let paytmParams = {
          ...params,
          CHECKSUMHASH: checksum,
        };
        res.json(paytmParams, order);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.generateNewTokenIdForWebSite = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(200).json({
          success: false,
          message: "order not found",
        });
      }

      let respo = "";
      let txnTokenResponce = "";
      // hashcode

      var paytmParams = {};
      let https;

      paytmParams.body = {
        requestType: "Payment",
        mid: "SHANTI03800179145316",
        websiteName: "WEBSTAGING",
        orderId: order._id,
        callbackUrl: `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${order._id}`,
        txnAmount: {
          value: order.GrandTotal,
          currency: "INR",
        },
        userInfo: {
          custId: order.ClientId,
        },
      };

      /* import checksum generation utility */
      const totalAmount = JSON.stringify(order.GrandTotal);

      var params = {};

      /* initialize an array */
      (params["MID"] = "SHANTI03800179145316"),
        (params["WEBSITE"] = "WEBSTAGING"),
        (params["CHANNEL_ID"] = "WEB"),
        (params["INDUSTRY_TYPE_ID"] = "Retail"),
        (params["ORDER_ID"] = order._id),
        (params["CUST_ID"] = order.ClientId),
        (params["TXN_AMOUNT"] = totalAmount),
        (params["CALLBACK_URL"] = "http://localhost:5000/api/callback"),
        (params["EMAIL"] = "sharadsinha08@gmail.com"),
        (params["MOBILE_NO"] = "9876543210");

      /**
       * Generate checksum by parameters we have
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */

      var paytmChecksum = PaytmChecksum.generateSignature(
        params,
        "5uP5UMcOeaDg@aaY"
      );
      paytmChecksum
        .then(function (checksum) {
          let paytmParams = {
            ...params,
            CHECKSUMHASH: checksum,
          };

          res.json(paytmParams, order);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      res.status(501).json({
        success: false,
        massage: error._message,
        error: error,
      });
      res.status(400).json({
        success: false,
        massage: error._message,
        error: error,
      });
      res.status(500).json({
        success: false,
        massage: error._message,
        error: error,
      });
    }
  }
);

exports.callbackUrl = catchAsyncErrors(async (req, res, next) => { });

exports.getAllOrder = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderRecieved = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 1 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderProcessing = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 2 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderDispatched = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 3 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderOutforDelivery = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 4 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderOutforDeliveryByDeliveryman = catchAsyncErrors(
  async (req, res) => {
    try {
      const orders = await Order.find({
        Status: 4,
        "Delivery.DMobile": req.params.id,
      }).sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: orders.length,
        orders: orders,
      });
    } catch (error) {
      res.status(501).json({
        success: false,
        massage: error._message,
        error: error,
      });
      res.status(400).json({
        success: false,
        massage: error._message,
        error: error,
      });
      res.status(500).json({
        success: false,
        massage: error._message,
        error: error,
      });
    }
  }
);
exports.getOrderDeliveriedByDeliveryman = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({
      Status: 5,
      "Delivery.DMobile": req.params.id,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderCancelledByDeliveryman = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({
      Status: 0,
      "Delivery.DMobile": req.params.id,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderDelivered = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 5 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderDeliveredByLimit = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 5 })
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.getOrderCancelled = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 0 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.UpdateSingleOrdereitem = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById(req.body.Id);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Grocery not found",
      });
    }

    order.DeliveryCharge = req.body.DeliveryCharge;
    order.GrandTotal = req.body.GrandTotal;
    order.ProductCount = req.body.ProductCount;
    order.Saving = req.body.Saving;

    order.OrderProducts = order.OrderProducts.map((ordr) => {
      if (String(ordr._id) === req.body.itemId) {
        ordr.Qty = req.body.Qty;
        ordr.TotalAmount = req.body.TotalAmount;
        ordr.TotalPrice = req.body.TotalPrice;
      }
      return ordr;
    });

    order = await Order.findByIdAndUpdate(req.body.Id, order, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.UpdateOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "order not found",
      });
    }
    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.OrderByClientId = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.find({ ClientId: req.params.id });
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.OrdergetLast10 = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.find({ ClientId: req.params.id })
      .sort({ createdAt: -1 })
      .limit(10);
    if (!order) {
      return res.status(200).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      count: order.length,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.GetSingleOrderbyId = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.getAllOrder = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.UpdateOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "order not found",
      });
    }
    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.UpdateSingleOrdereitem = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById(req.body.Id);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Grocery not found",
      });
    }

    order.DeliveryCharge = req.body.DeliveryCharge;
    order.GrandTotal = req.body.GrandTotal;
    order.ProductCount = req.body.ProductCount;
    order.Saving = req.body.Saving;

    order.OrderProducts = order.OrderProducts.map((ordr) => {
      if (String(ordr._id) === req.body.itemId) {
        ordr.Qty = req.body.Qty;
        ordr.TotalAmount = req.body.TotalAmount;
        ordr.TotalPrice = req.body.TotalPrice;
      }
      return ordr;
    });

    order = await Order.findByIdAndUpdate(req.body.Id, order, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.getOrderRecieved = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 1 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.getOrderDispatched = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 3 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderOutforDelivery = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 4 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderDelivered = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 5 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.getOrderCancelled = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 0 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.OrderByClientId = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.find({ ClientId: req.params.ClientId });
    if (!order) {
      return res.status(200).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.GetSingleOrderbyId = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById({ _id: req.params._id });
    if (!order) {
      return res.status(200).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
