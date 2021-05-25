require("dotenv").config({ path: "./config/.env" });
const express               = require("express");
const bodyParser            = require("body-parser");
const path                  = require("path");
const helmet                = require("helmet");
const xss                   = require("xss-clean");
const db                    = require("./models/index");
const cors                  = require("cors");
const app                   = express();
const corsOptions           = {origin: "http://localhost:3306"};

const userRoutes            = require("./routes/user");
const userConnectRoutes     = require("./routes/userConnect");
const postRoutes            = require("./routes/post"); 

app.use(cors(corsOptions));
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

app.use(bodyParser.json());
app.use(xss());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

db.sequelize.sync();

app.use("/reseau_social/member", userRoutes);
app.use("/reseau_social", userConnectRoutes);
app.use("/reseau_social/post", postRoutes);

module.exports = app;
