const db        = require("../models");
const fs        = require("file-system");
const User      = db.users;
const Post      = db.posts;
const Comment   = db.comments;
const { Op }    = require("sequelize");

//CREATE -BEGIN

// CF userConnect.js => Signup

//CREATE - END

//READ - BEGIN

exports.findOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      const infos =  Object.assign({
          Userid:     user.id,
          username:   user.username,
          email:      user.email,
          imageUrl:   user.imageUrl,
          createdAt:  user.createdAt
        });
      res.status(200).json({ infos })
    })   
    .catch((error) => res.status(404).json({ error }));

};

exports.findAllUsers = (req, res, next) => {
  User
    .findAll({ where: {id: { [Op.gt]: 0 }}})
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

//READ - END

//UPDATE - BEGIN

exports.updateUser = (req, res, next) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then((user) => {
      if (user.image_url !== null) {
        const userObject = req.file
          ? {
              ...JSON.parse(req.body.user),
              image_url: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };

        User.update(
          { where: { id: req.params.id } },
          { ...userObject, where: { id: req.params.id } }
        )
          .then(() => res.status(200).json({ message: "User modifié !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//UPDATE - END

//DELETE - BEGIN

exports.deleteOneUser = (req, res, next) => {
  if (req.query.isAdmin) {
    Post    .destroy({ where: { UserId: req.query.userid } });    
    Comment .destroy({ where: { UserId: req.query.userid } });
    User    .destroy({ where: { id: req.query.userid } })
      .then((res) => {res.status(200).json({ message: "Les éléments sont supprimés." })})
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({ message: "Non autorisé" });
  }
};

exports.deleteMyProfile = (req, res, next) => {
    Post      .destroy({ where: { userId: req.params.id } });      
    Comment   .destroy({ where: { userId: req.params.id } });
    User      .destroy({ where: { id: req.params.id } })   
      .then(() => res.status(200).json({ message: "Compte supprimé" }))
      .catch((error) => console.log(error));
};
//DELETE - END
