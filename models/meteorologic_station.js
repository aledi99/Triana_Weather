'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mStationSchema = new mongoose.Schema({
    latitude: {type: Number},
    longitude: {type: Number},
    name: { type: String},
    registed_at: {type: Date, default: Date.now},
    registed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    maitenanced_by: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('MeteorologicStation', mStationSchema);