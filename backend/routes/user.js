const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.put("/:id", userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.get("/:id", userCtrl.findOneUser);
router.get("/", userCtrl.findAllUsers);

module.exports = router;
