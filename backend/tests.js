//Index

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const app = require("./app.js");
require("dotenv").config();

const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: process.env.DB_PORT,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);

module.exports = db;


// app.js

const { sequelize } = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Nouvelle table créée");
  })
  .finally(() => {
    sequelize.close();
  });

//models
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    email: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
    },
  });
  return User;
};

//routes

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get("/member", userCtrl.findAllUsers);

module.exports = router;

//controllers

const db = require("../models");
const User = db.users;
const Op = require("sequelize");

exports.findAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};