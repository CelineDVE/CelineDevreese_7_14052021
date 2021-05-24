const db        = require("../models");
const fs        = require("file-system");
const User      = db.users;

exports.updateUser = (req, res, next) => {
  User
    .update(req.body, { where: { id: req.params.id } })
    .then((user) => {
      if (user.imageUrl !== null) {
        const userObject = req.file
          ? {
              ...JSON.parse(req.body.user),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
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

exports.deleteUser = (req, res, next) => {
    User
        .findOne({ where: { id: req.params.id } })
        .then((user) => {
          if(user.imageUrl !== null) {
            const filename = user.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                User.destroy({ where: { id: req.params.id } })
                  .then(() =>
                    res.status(200).json({ message: "Membre supprimé avec la photo de profil !" })
                  )
                  .catch((error) => res.status(400).json({ error }));
            });
          } else {
            User.destroy({ where: { id: req.params.id } })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Member supprimé !" })
              )
              .catch((error) =>
                res.status(400).json({ error })
              );
          }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.findOneUser = (req, res, next) => {
  User
    .findOne({ where: {id: req.params.id} })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllUsers = (req, res, next) => {
  User
    .findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
