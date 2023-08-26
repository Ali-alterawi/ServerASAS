const express = require("express");
const userController = require("../controller/userController");
const upload = require("../middleware/handleImage")
const router = express.Router();


router.get("/User", userController.AllUser);
router.get("/User0/:id", userController.oneUser);
router.get("/User/:id", userController.one);
router.post("/User", userController.newUser);
router.post("/loginUser", userController.loginUser);
router.put("/User/:id",upload.single("photo"), userController.updateUser);
router.delete("/User/:id", userController.deleteUser);
router.get("/Verify_token", userController.verifyJWT);

// router.put("/api/users/:id",upload.single("image"), userController.updateUser);
// router.post("/User", UserController.newUser, authController.createToken);

module.exports = router;