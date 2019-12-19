'use strict'

const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const error_types = require('./error_types');
const User = require('../models/user');

let controller = {
    register: (req, res, next) => {
        User.find({username: req.body.username}, (err, result) => {
           if (result.length > 0) { 
                next(new error_types.Error400("User already exists"));
            } else {
                let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                let user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    fullname: req.body.fullname,
                    roles: 'USER',
                    password: hash,
                    stations_registered: [],
                    stations_maitenancing: []
                });

                user.save((err, user) => {                    
                    if (err) next(new error_types.Error400(err.message));
                    res.status(201).json({  
                        id : user.id,
                        fullname : user.fullname,
                        username : user.username,
                        email : user.email
                    });
                });
            }
        })
    },
    login: (req, res, next) => {
        passport.authenticate("local", {session: false}, (error, user) => {
            if (error || !user) {
                next(new error_types.Error404("username or password not correct."))
            } else {
                const payload = {
                    sub: user.id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    username: user.username
                };
                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
                res.json({ 
                    username: user.username,
                    role: user.roles,
                    token: token
                });
            }
        })(req, res)
    },
    getUsers : async (req, res, next) => {
        console.log(req.user)

        try {
            let result = null;
            if (req.user.roles == "ADMIN") {
                result = await User.find({}, {_id: 1, username: 1, roles: 1}).exec();
            }else{
                res.send(401, "No tienes autorización")
            }
            res.status(200).json(result);
        } catch (error) {
            res.send(500, error.message);
        }
    }

}

module.exports = controller;
