'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const authMiddleware = require('./middleware/auth');

const User = require('./models/user');
const user_routes = require('./routes/users')
const station_routes = require('./routes/station')
const meteorologic_data_routes = require('./routes/meteorologic_data')

//Insertar datos de ejemplo descomentar y ejecutar para insertarlos
require('./example_data');

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected!')
});

passport.use(new LocalStrategy((username, password, done) => {
    let busqueda = (username.includes('@')) ? { email: username } : { username: username };
    User.findOne(busqueda, (err, user) => {
        if (err) return done(null, false);
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.sub, (err, user) => {
        if (err) return done(null, false);
        else return done(null, user);
    });
}));

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/', user_routes);
app.use('/api/', station_routes);
app.use('/api/', meteorologic_data_routes);

app.use(authMiddleware.errorHandler);
app.use(authMiddleware.notFoundHandler);

module.exports = app
