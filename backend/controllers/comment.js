const db        = require("../models");
const fs        = require("file-system");
const user      = require("../models/user");
const User      = db.users;
const Post      = db.posts;
const Comment   = db.comments;

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    userId: req.body.userId,
    postId: req.body.postId,
    message: req.body.message,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
  //}
};;

exports.updateComment = (req, res, next) => {

};

exports.deleteComment = (req, res, next) => {

};

exports.findOneComment = (req, res, next) => {
    Comment.findAll({
      where: {
        CommentId: req.params.Commentid,
      },
      include: {
        model: user,
        required: true,
        attributes: ["username"],
      },
    })
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((error) => res.status(404).json({ error }));
};

exports.findAllComments = (req, res, next) => {
    Comment.findAll()
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((error) => res.status(400).json({ error }));
};