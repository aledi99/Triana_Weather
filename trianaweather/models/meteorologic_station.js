'use strict'

const mongoose = require('mongoose');

const mStationSchema = new mongoose.Schema({
    rain: {type: Number},
    wind_speed: {type: Number},
    wind_direction: {type: Number},
    temperature: {type: Number},
    humidity: {type: Number},
    air_quality: {type: Number},
    pressure: {type: Number}
});

module.exports = mongoose.model('MeteorologicStation', mStationSchema);