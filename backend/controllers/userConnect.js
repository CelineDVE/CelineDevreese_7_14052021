const bcrypt        = require("bcrypt");
const jwt           = require("jsonwebtoken");
const db            = require("../models");
const User          = db.users;

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hash
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            UserId:     user.id,
            role:       user.isAdmin,
            username:   user.username,
            email:      user.email,
            imageUrl:   user.imageUrl,
            token:      jwt.sign({ userId: user.id }, process.env.KEY_JWT, {
            expiresIn:  "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};