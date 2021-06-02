const express           = require("express");
const router            = express.Router();

const postCtrl          = require("../controllers/post");
const auth              = require("../middleware/auth");
const multer            = require("../middleware/multer-config");

router.post             ("/",           auth, multer, postCtrl.createPost);
router.put              ("/:id",        auth, multer, postCtrl.updatePost);
router.delete           ("/",           auth,         postCtrl.deletePost);
//router.get              ("/:id",        auth,         postCtrl.findOnePost);
router.get              ("/:Userid",    auth,         postCtrl.findAllPostsUser);
router.get              ("/",           auth,         postCtrl.findAllPosts);

module.exports = router;