const express       = require("express");
const router        = express.Router();
const authCtrl      = require("../controllers/userConnect.js");
const checkPassword = require("../middleware/checkPassword");

router.post         ("/signup", checkPassword, authCtrl.signup);
router.post         ("/login",                 authCtrl.login); 

module.exports = router;
