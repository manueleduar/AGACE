const express = require("express");
const app = express();
const port  = process.env.PORT || 3000;
const passport = require('passport');
const db = require('./db/setup');
const path = require('path');
const auth = require('./routes/auth');
const publicDirectory = path.resolve('./public');


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
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicDirectory));

app.use("/", auth);

app.get("/", (req, res) => {
    res.sendFile(path.join(publicDirectory, "index.html"));
})


app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`);
})