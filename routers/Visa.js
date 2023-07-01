const express = require("express");
const visaController = require("../controller/visaController");
const router = express.Router();


router.get("/payment", visaController.allpayment);
router.post("/paymentOne", visaController.onepayment);

module.exports = router;