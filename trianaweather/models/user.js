'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    fullname: {type: String},
    roles: {type: String, enum: ['USER', 'MANAGER', 'ADMIN']},
    password: {type: String},
    register_date: {type: Date, default: Date.now},
    stations_registered: [{ type: Schema.Types.ObjectId, ref: 'MeteorologicStation' }],
    stations_maitenancing: [{ type: Schema.Types.ObjectId, ref: 'MeteorologicStation' }]
});

module.exports = mongoose.model('User', userSchema);