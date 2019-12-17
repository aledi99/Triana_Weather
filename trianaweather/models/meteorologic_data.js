'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mDataSchema = new mongoose.Schema({
    latitude: {type: Number},
    longitude: {type: Number},
    name: { type: String},
    registed_at: {type: Date, default: Date.now},
    registed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    maitenanced_by: { type: Schema.Types.ObjectId, ref: 'User' },
    station: { type: Schema.Types.ObjectId, ref: 'MeteorologicStation' }
});

module.exports = mongoose.model('MeteorologicData', mDataSchema);