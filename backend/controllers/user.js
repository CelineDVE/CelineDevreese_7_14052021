const db = require("../models");
const User = db.users;
const Op = require("sequelize");

exports.createUser = (req, res, next) => {
};

exports.deleteUser = (req, res, next) => {
    User
        .findOne({ _id: req.params.id })
        .then(user => {
            
        })
};

exports.findOneUser = (req, res, next) => {
  User
    .findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllUsers = (req, res, next) => {
  User
    .findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
