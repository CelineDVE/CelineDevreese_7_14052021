require("dotenv").config({ path: "./config/.env" });
const express               = require("express");
const bodyParser            = require("body-parser");
const path                  = require("path");
const helmet                = require("helmet");
const xss                   = require("xss-clean");
const db                    = require("./models");
const app                   = express();

const userRoutes            = require("./routes/user");
const userConnectRoutes     = require("./routes/userConnect");
const postRoutes            = require("./routes/post");
const commentRoutes         = require("./routes/comment");

app.use(helmet()); //Sécuriser les headers

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(xss());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

db.sequelize.sync();

app.use("/reseau_social/member",   userRoutes);
app.use("/reseau_social",          userConnectRoutes);
app.use("/reseau_social/post",     postRoutes);
app.use("/reseau_social/comments", commentRoutes);

module.exports = app;
