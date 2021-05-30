const express           = require("express");
const router            = express.Router();

const postCtrl          = require("../controllers/post");
const auth              = require("../middleware/auth");
const multer            = require("../middleware/multer-config");

router.post("/",  multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.get("/:id", auth, postCtrl.findOnePost);
router.get("/", auth, postCtrl.findAllPosts);

module.exports = router;

