const db            = require("../models");
const fs            = require("file-system");
const User          = db.users;
const Post          = db.posts;
const Comment       = db.comments;

//CREATE - START

exports.createPost = (req, res, next) => {
  const postObject = { ...req.body };
  delete postObject.id;
  if (postObject.image_url) {
    postObject.image_url = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  Post.create({ ...postObject })
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

//CREATE - END

//READ - START

exports.findOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllPostsUser = (req, res, next) => {
  Post.findAll(
    {
      where: { userId: req.params.userId },
      include: [Comment],
    },
    {
      order: [["created_at", "DESC"]],
    }
  )
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.findAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};


//READ - END

//UPDATE - START

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

//DELETE - START

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



