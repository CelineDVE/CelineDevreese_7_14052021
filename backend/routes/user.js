const express       = require("express");
const router        = express.Router();

const userCtrl      = require("../controllers/user");
const auth          = require("../middleware/auth");
const multer        = require("../middleware/multer-config");

router.put("/:id", auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.get("/:id", auth, userCtrl.findOneUser);
router.get("/", auth, userCtrl.findAllUsers);
router.patch("/follow/:id", userCtrl.follow);
router.patch("/unfollow/:id", userCtrl.unfollow)

module.exports = router;
