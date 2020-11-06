const express = require("express");
const app = express();
const passport = require('passport');
const port  = process.env.PORT || 3000;
const db = require('./db/setup');
const path = require('path');
const auth = require('./routes/auth');
const publicDirectory = path.resolve('./public');
const apidenuncias = require('./api/denuncias/denuncias');
const apitemas = require('./api/temas/temas');
const apiReportes = require('./api/reportes/reportes');
var busboy = require('connect-busboy'); 

require('dotenv').config();
require('express-session')({
    secret: process.env.SECRET_SESSION_TOKEN,
    resave: false,
    saveUninitialized: false
});

db.init();


/**
 * Application middlewares
 */
app.use(express.json());
app.use(busboy());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicDirectory));

app.use("/", auth);
app.use('/api/denuncias',apidenuncias);
app.use('/api/temas',apitemas);
app.use('/api/reportes', apiReportes);

app.get("/", (req, res) => {
    res.sendFile(path.join(publicDirectory, "index.html"));
})

// TODO: Move to separate router, see "routes/"
app.get('/seguimiento', (req, res) => {
  res.sendFile(path.join(publicDirectory, "seguimiento.html"));
});

app.get('/denuncias', (req, res) => {
    res.sendFile(path.join(publicDirectory, "denuncias.html"));
  });
    
  

app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`);
})