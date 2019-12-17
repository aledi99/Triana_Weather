'use strict'

const mongoose = require('mongoose');

const mStationSchema = new mongoose.Schema({
    rain: {type: Number},
    wind_speed: {type: Number},
    wind_direction: {type: Number},
    temperature: {type: Number},
    humidity: {type: Number},
    air_quality: {type: Number},
    pressure: {type: Number},
    registed_at: {type: Date, default: Date.now},
    registed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    maitenanced_by: { type: Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('MeteorologicStation', mStationSchema);