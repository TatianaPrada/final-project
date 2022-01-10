// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

require("./config")(app);

const path = require('path')
app.use(express.static(path.join(__dirname, "public"))) // MIDDLEWARE DE CONFIGURACIÓN


// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes");
app.use("/api", allRoutes);

app.use((req, res) => res.sendFile(__dirname + "/public/index.html")); // MIDDLEWARE DE ENVÍO AL HTML




module.exports = app;
