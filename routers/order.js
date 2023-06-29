const express = require("express");
const orderController = require("../controller/orderController");
const router = express.Router();


router.get("/allorder", orderController.allorder);
// router.get("/allorderCompleted", orderController.allorderCompleted);
// router.get("/allorderNew", orderController.allorderNew);
router.get("/order/:id/:idOrder", orderController.oneorder);
router.get("/orders/:id", orderController.orders);
// router.put("/order/:id", orderController.updateorder);
// router.delete("/order/:id", orderController.deleteorder);
module.exports = router;