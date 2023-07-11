const express = require("express");
const reportController = require("../controller/reportController");
const router = express.Router();


router.get("/allReports", reportController.allReports);
router.post("/oneReport", reportController.oneReport);

module.exports = router;