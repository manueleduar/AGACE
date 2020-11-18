require('dotenv').config();
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
const apiAdministraciones = require('./api/administraciones/administraciones');
const apiInsumos = require('./api/insumos/insumos');
const apiMediosRecepcion = require('./api/mediosrecepcion/mediosRecepcion');
const session = require('express-session');
var busboy = require('connect-busboy'); 

function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

db.init();


/**
 * Application middlewares
 */

app.use(session({
    secret: process.env.SECRET_SESSION_TOKEN,
    resave: false,    
    saveUninitialized: false
}))

app.use(express.json());
app.use(busboy());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicDirectory));

app.use("/", auth);
app.use('/api/denuncias', ensureAuthenticated, apidenuncias);
app.use('/api/temas', ensureAuthenticated, apitemas);
app.use('/api/reportes', ensureAuthenticated,  apiReportes);
app.use('/api/administraciones', ensureAuthenticated,  apiAdministraciones);
app.use('/api/insumos', ensureAuthenticated,  apiInsumos);
app.use('/api/medios_recepcion', ensureAuthenticated,  apiMediosRecepcion);

app.get("/", (req, res) => {
  if (req.isAuthenticated()){
    res.redirect("/seguimiento");
  } else {
    res.redirect("/login");
  } 
})

// TODO: Move to separate router, see "routes/"
app.get('/seguimiento', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(publicDirectory, "seguimiento.html"));
});

app.get('/denuncias', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(publicDirectory, "denuncias.html"));
  });
    
app.get('/catalogos', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(publicDirectory, "catalogos.html"));
});

app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`);
})