"use strict";

const fs = require("file-system");
const path = require("path");
const dbConfig = require("../config/db.config");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");
require("dotenv").config();

const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: process.env.DB_PORT,
  dialectOptions: {
    typeCast: function (field, next) {
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
  timezone: "+02:00",

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.posts = require("./post")(sequelize, Sequelize);
db.comments = require("./comment")(sequelize, Sequelize);

db.posts.belongsTo(db.users);

db.comments.belongsTo(db.users);
db.comments.belongsTo(db.posts);
db.comments.hasOne(db.comments);

db.users.hasMany(db.posts);
db.users.hasMany(db.comments);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à Sequelize est un succès");
  })
  .catch((error) => {
    console.error("Soucis de connexion à Sequelize = ", error);
  });

module.exports = db;
