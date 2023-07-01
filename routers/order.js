const express = require("express");
const orderController = require("../controller/orderController");
const router = express.Router();


router.get("/allorder", orderController.allorder);
router.get("/OfficeOrders/:id", orderController.OfficeOrders);
router.get("/OfficeOrdersDetails/:id", orderController.OfficeOrdersDetails);
router.get("/OfficeNewOrders/:id", orderController.OfficeNewOrders);
router.get("/OfficeCompletedOrders/:id", orderController.OfficeCompletedOrders);
router.get("/order/:id/:idOrder", orderController.oneorder);
router.get("/orders/:id", orderController.orders);
router.put("/order/:id/:idOrder", orderController.updatePayment);
// router.put("/order/:id", orderController.updateorder);
// router.delete("/order/:id", orderController.deleteorder);
module.exports = router;