//import package express
const express = require("express");

//import variable d'environnement
require("dotenv").config();

//import morgan
const morgan = require("morgan");

//creation de l'application express
const app = express();

app.use(morgan("dev"));

//export de l'application
module.exports = app;
