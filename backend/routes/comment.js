const express           = require("express");
const router            = express.Router();

const commentCtrl       = require("../controllers/comment");
const auth              = require("../middleware/auth");
const multer            = require("../middleware/multer-config");

router.post("/", multer, commentCtrl.createComment);
router.put("/:comment_id", auth, multer, commentCtrl.updateComment);
router.get("/:comment_id", auth, commentCtrl.findOneComment)
router.delete("/", auth, commentCtrl.deleteComment);
router.get("/", auth, commentCtrl.findAllComments);

module.exports = router;
