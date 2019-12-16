'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    fullname: {type: String},
    roles: {type: String, enum: ['USER', 'MANAGER', 'ADMIN']},
    password: {type: String},
    register_date: {type: Date, default: Date.now},
    stations_registered: {},
    stations_maitenancing: {},
});

module.exports = mongoose.model('User', userSchema);