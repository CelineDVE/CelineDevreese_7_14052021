const db            = require("../models");
const User          = db.users;
const Post          = db.posts;
const Comment       = db.comments;

//CREATE - BEGIN

exports.createPost = (req, res, next) => {
  let imagePost = "";
  if (req.file) {
    imagePost = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  const post = new Post({
    UserId:         req.body.UserId,
    message:        req.body.message,
    imageUrl:       imagePost
  })
  post
    .save()
    .then(() => res.status(201).json({ message: "Publication faite" }))
    .catch((error) => res.status(400).json({ error }));
};

//CREATE - END

//READ - BEGIN

// exports.findOnePost = (req, res, next) => {
//     const onePost = {}
//     Post
//         .findOne({ 
//             where:      { id: req.params.id },
//             include:    {
//                         model: User, 
//                         required: true,
//                         attributes: ["username"]
//                         },
//             order:      [["id", "DESC"]]
//         })
//         .then(post => {
//             onePost.id          = post.id
//             onePost.userId      = post.UserId
//             onePost.username    = post.User.username
//             onePost.createdAt   = post.createdAt
//             onePost.message     = post.message
//             onePost.imageUrl    = post.imageUrl
//             res.status(200).json(onePost)
//         })
//         .catch((error) => res.status(404).json({ error }));
// };

exports.findAllPostsUser = (req, res, next) => {

    Post.findAll({
      where: { UserId: req.params.Userid },
    })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((error) => res.status(400).json({ error }));
};

exports.findAllPosts = (req, res, next) => {
  Post.findAll({
    include: { model: User, required: true, attributes: ["userName"] },
    order: [["id", "DESC"]],
  })
    .then((posts) => {
      const listPosts = posts.map((post) => {
        return Object.assign(
          {},
          {
            id: post.id,
            created_at: post.created_at,
            message: post.message,
            image_url: post.image_url,
            serId: post.userId,
            username: post.User.username,
            isActive: post.User.isActive,
          }
        );
      });
      res.status(200).json({ listPosts });
    })
    .catch((error) => res.status(400).json({ error }));
};


//READ - END

//UPDATE - BEGIN

exports.updatePost = (req, res, next) => {
    Post
        .update(req.body, { where: { id: req.params.id } })
        .then((post) => {
            if (post.image_url !== null) {
                const postObject = req.file
                    ? {
                        ...JSON.parse(req.body.post),
                        image_url: `${req.protocol}://${req.get("host")}/images/${
                        req.file.filename
                        }`,
                    }
                    : { ...req.body };

                Post
                    .update(
                        { where: { id: req.params.id } },
                        { ...postObject, where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Post modifié !" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

//UPDATE - END

//DELETE - BEGIN

exports.deletePost = (req, res, next) => {
    Post
        .findOne({ where: { id: req.params.id } })
        .then((post) => {
            if (post.image_url !== null) {
                const filename = post.image_url.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Post
                        .destroy({ where: { id: req.params.id } })
                        .then(() =>
                            res.status(200).json({
                            message: "Post supprimé avec la photo !",
                            }))
                        .catch((error) => res.status(400).json({ error }));
                });
            } else {
                Post
                    .destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Post supprimé !" }))
                    .catch((error) => res.status(400).json({ error }));
                }
        })
        .catch((error) => res.status(500).json({ error }));
};

//DELETE - END



