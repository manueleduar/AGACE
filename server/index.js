const express = require("express");
const app = express();
const port  = process.env.PORT || 3000;
const passport = require('passport');
const db = require('./db/setup');
const path = require('path');

require('dotenv').config();
require('express-session')({
    secret: process.env.SECRET_SESSION_TOKEN,
    resave: false,
    saveUninitialized: false
});

db.init();
const User = require('./models/User');
const apidenuncias = require('./api/denuncias/denuncias');


/**
 * Application middlewares
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/denuncias',apidenuncias);

app.get("/", (req, res) => {
    res.send("¡Hola, mundo!")
})

// TODO: Move to separate router for better maintainability
app.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.redirect('/login?info=' + info);
      }
  
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
  
        return res.redirect('/');
      });
  
    })(req, res, next);
  });
  
  // TODO: This will be moved once the front-end is pushed
  app.get('/login',
    (req, res) => res.sendFile('public/login.html',
    { root: __dirname })
  );
  app.get('/seguimiento',
  (req, res) => res.sendFile('public/seguimiento.html',
  { root: __dirname }));

  app.get('/registro',
  (req, res) => res.sendFile('public/registro.html',
  { root: __dirname }));

  

app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`);
})
