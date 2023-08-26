const express = require("express");
const adminDashBoardController = require("../controller/adminDashBoardController");
const router = express.Router();


router.get("/AllClients", adminDashBoardController.AllClients);
router.get("/AllOffices", adminDashBoardController.AllOffices);
router.get("/AllOffices", adminDashBoardController.AllOffices);
router.get("/AllordersAdmin", adminDashBoardController.AllordersAdmin);
router.get("/PaymentAdmin", adminDashBoardController.PaymentAdmin);


router.put("/updateUserStatus/:userId",adminDashBoardController.updateUserStatus);
router.put("/updateUserActive/:userId",adminDashBoardController.updateUserActive);


router.get("/TotalUserNumber", adminDashBoardController.getTotalUserNumber);
router.get("/TotalOfficeNumber", adminDashBoardController.getTotalOfficeNumber);
router.get("/TotalOrderNumber", adminDashBoardController.getTotalOrderNumber);
router.get("/TotalIncome", adminDashBoardController.getTotalIncome);



module.exports = router;