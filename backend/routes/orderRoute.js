const express = require("express");

const {
  create_order,
  getAllOrder,
  UpdateOrder,
  OrderByClientId,
  OrdergetLast10,
  GetSingleOrderbyId,
  UpdateSingleOrdereitem,
  callbackUrl,
  createOrderForWebsite,
  getOrderRecieved,
  getOrderProcessing,
  getOrderDispatched,
  getOrderOutforDelivery,
  getOrderDelivered,
  getOrderCancelled,
  getOrderDeliveredByLimit,
  generateNewTokenIdForWebSite,
  getOrderOutforDeliveryByDeliveryman,
  getOrderDeliveriedByDeliveryman,
  getOrderCancelledByDeliveryman
} = require("../controllers/orderController.js");

const router = express.Router();
router.route("/new").post(create_order);
router.route("/createorderforwebsite").post(createOrderForWebsite);
router.route("/callbackurl").post(callbackUrl);
router.route("/updatesingleorderitem").put(UpdateSingleOrdereitem);
router.route("/all").get(getAllOrder);
router.route("/orderrecieved").get(getOrderRecieved);
router.route("/orderprocessing").get(getOrderProcessing);
router.route("/orderdispatched").get(getOrderDispatched);
router.route("/Orderoutfordelivery").get(getOrderOutforDelivery);
router.route("/Orderdelivered").get(getOrderDelivered);
router.route("/Orderdeliveredbylimit").get(getOrderDeliveredByLimit);
router.route("/Ordercancelled").get(getOrderCancelled);
router.route("/tenOrderbyclient/:id").get(OrdergetLast10);
router.route("/outfororderbydeliveryman/:id").get(getOrderOutforDeliveryByDeliveryman);
router.route("/order-delivered-bydeliveryman/:id").get(getOrderDeliveriedByDeliveryman);
router.route("/order-cancelled-bydeliveryman/:id").get(getOrderCancelledByDeliveryman);
router.route("/orderbyclientid/:id").get(OrderByClientId);
router.route("/singleorderbyclient/:id").get(GetSingleOrderbyId);
router.route("/generatenewtoken/:id").get(generateNewTokenIdForWebSite);
router.route("/:id").put(UpdateOrder);

module.exports = router;
