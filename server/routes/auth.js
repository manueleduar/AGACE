const express = require('express');
const app = express.Router();
const passport = require('passport');
const path = require('path');
const publicDirectory = path.resolve('./public');


const User = require('../db/models/User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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
      let userId = user._id
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({userId});
        return res.redirect('/seguimiento');
      });
  
    })(req, res, next);
  });
  
  // TODO: This will be moved once the front-end is pushed
  app.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/seguimiento");
    res.sendFile(path.join(publicDirectory, "login.html"));
  });
  
  app.get('/register', (req, res) => {
    res.sendFile(path.join(publicDirectory, "/registro.html"));
  });

  app.post('/register', (req, res, next) => {
    let data = req.body;
    if (!data.firstName || !data.lastName || !data.email || !data.password || !data.username || !data.profile) 
      return res.redirect('/register?error=missingData'); 
    
    if (!validateEmail(data.email)) return res.redirect('/register?error=wrongEmail'); 
    User.register({
      username:data.username, 
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.lastName,
      profile: data.profile,
      active: true
    }, data.password).then((acc, err) => {
      if (err) {
        console.log("Error:", err)
        return next(err);
      }
      return res.redirect("/")
      
    });
    
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  module.exports = app;
  