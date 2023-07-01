const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const orderController = require("../controller/orderController");
// Configure Multer to specify the destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check the file type and set the destination directory accordingly
    if (file.fieldname === "images") {
      cb(null, "images");
    } else if (file.fieldname === "projects") {
      cb(null, "projects");
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  "/order",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "projects", maxCount: 5 },
  ]),
  orderController.handleAddForm
);
router.put(
  "/order/:id",
  upload.fields([
    { name: "images", maxCount: 5 },
  ]),
  orderController.addResponseOffice
);

module.exports = router;
