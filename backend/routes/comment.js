const express           = require("express");
const router            = express.Router();

const commentCtrl       = require("../controllers/comment");
const auth              = require("../middleware/auth");
const multer            = require("../middleware/multer-config");

router.post("/:id/comment", multer, commentCtrl.createComment);
router.put("/:id/:comment_id", auth, multer, commentCtrl.updateComment);
router.delete("/:id/:comment_id", auth, commentCtrl.deleteComment);
router.get("/comments", auth, commentCtrl.findAllComments);

module.exports = router;
