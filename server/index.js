const express = require("express");
const app = express();
const port  = process.env.PORT || 3000;
const passport = require('passport');
const db = require('./db/setup');
const path = require('path');

const publicDirectory = path.resolve('./public');

require('dotenv').config();
require('express-session')({
    secret: process.env.SECRET_SESSION_TOKEN,
    resave: false,
    saveUninitialized: false
});

db.init();

const User = require('./models/User');



/**
 * Application middlewares
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicDirectory));



passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
    res.sendFile(path.join(publicDirectory, "index.html"));
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
  app.get('/login', (req, res) => {
    res.sendFile(path.join(publicDirectory, "index.html"));
  });
  
  app.get('/register', (req, res) => {
    res.sendFile(path.join(publicDirectory, "/pages/registro.html"));
  });

  app.post('/register', (req, res, next) => {
    let data = req.body;
    if (!data.firstName || !data.lastName || !data.email || !data.password || !data.username) 
      return res.redirect('/register?error=missingData'); 
    
    if (!validateEmail(data.email)) return res.redirect('/register?error=wrongEmail'); 
    User.register({
      username:data.username, 
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.lastName,
      active: true
    }, data.password).then((acc, err) => {
      if (err) {
        console.log("Error:", err)
        return next(err);
      }
      return res.redirect("/")
      
    });
    
  });
  

app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`);
})


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}