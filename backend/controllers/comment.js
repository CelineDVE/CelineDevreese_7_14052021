const db        = require("../models");
const User      = db.users;
const Post      = db.posts;
const Comment   = db.comments;


//CREATE - BEGIN
exports.createComment = (req, res, next) => {
  const comment = new Comment({
    UserId: req.body.UserId,
    PostId: req.body.PostId,
    message: req.body.message
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
  //}
};;

//CREATE - END

// READ - BEGIN

exports.findCommentsUser = (req, res, next) => {
    Comment.findAll({
      where: {
        PostId: req.params.Postid,
      },
      include: {
        model: User,
        required: true,
        attributes: ["username"],
      },
    })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((error) => res.status(404).json({ error }));
};

//READ - END

//UPDATE - BEGIN

exports.updateComment = (req, res, next) => {

};

//UPDATE - END

//DELETE - BEGIN

exports.deleteComment = (req, res, next) => {
    Comment
        .findOne({ where: { id: req.params.id } })
        .then(() => {
                Comment
                    .destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
                    .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

//DELETE - END