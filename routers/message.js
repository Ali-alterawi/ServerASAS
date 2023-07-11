const express = require("express");
const messageController = require("../controller/messageController");
const router = express.Router();


router.get("/allMessages", messageController.allMessages);
router.post("/oneMessage", messageController.oneMessage);

module.exports = router;