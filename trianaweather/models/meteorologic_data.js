'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mDataSchema = new mongoose.Schema({
    rain: {type: Number},
    wind_speed: {type: Number},
    wind_direction: {type: Number},
    temperature_ambient: {type: Number},
    temperature_graund: {type: Number},
    humidity: {type: Number},
    air_quality: {type: Number},
    pressure: {type: Number},
    registed_at: {type: Date, default: Date.now},
    station: { type: Schema.Types.ObjectId, ref: 'MeteorologicStation' }
});


module.exports = mongoose.model('MeteorologicData', mDataSchema);