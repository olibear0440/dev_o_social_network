//import package express
const express = require("express");

//import variable d'environnement
require("dotenv").config();

//import morgan
const morgan = require("morgan");

//creation de l'application express
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    next();
  });


app.use(morgan("dev"));

//export de l'application
module.exports = app;
