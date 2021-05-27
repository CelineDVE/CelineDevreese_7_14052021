const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
require("dotenv").config();

const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: process.env.DB_PORT,
  dialectOptions: {
     typeCast: function (field, next) {
        if (field.type === 'DATETIME') {
            return field.string()
        }
        return next()
     },
  },
  timezone: '+02:00',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.posts = require("./post")(sequelize, Sequelize);
db.comments = require("./comment")(sequelize, Sequelize);

module.exports = db;