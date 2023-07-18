const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceConrtoller");


router.get("/companiesInterior", serviceController.companiesInterior);
router.get("/companiesQuantity", serviceController.companiesQuantity);
router.get("/companiesEngineering", serviceController.companiesEngineering);
router.get("/companiesall", serviceController.companiesall);
module.exports = router;
