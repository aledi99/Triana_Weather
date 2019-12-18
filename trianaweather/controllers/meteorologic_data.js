'use strict'

const MeteorologicData = require('../models/meteorologic_data');
const User = require('../models/user');
const Station = require('../models/meteorologic_station');

module.exports = {
    nuevaData: async (req, res) => {
        let meteorologicData = new MeteorologicData({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            registed_by: req.body.registed_by,
            maitenanced_by: req.body.maitenanced_by,
            station: req.body.station
        });
        await meteorologicData.save()
            .then(d => d.populate('registed_by', { fullname: 1, email: 1 }).execPopulate())
            .then(d => d.populate('maitenanced_by', { fullname: 1, email: 1 }).execPopulate())
            .then(d => d.populate('station').execPopulate())
            .then(d => res.status(201).json(d))
            .catch(err => res.send(500, err.message));
    },
    getDataById: (req, res) => {
        MeteorologicData.findById(req.params.id)
            .exec()
            .then(d => d.populate('registed_by', { fullname: 1, email: 1 }).execPopulate())
            .then(d => d.populate('maitenanced_by', { fullname: 1, email: 1 }).execPopulate())
            .then(d => d.populate('station').execPopulate())
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    },
    getDataByStationId: (req, res) => {
        MeteorologicData.find({ "station": req.params.id })
            .populate('registed_by', { fullname: 1, email: 1 })
            .populate('maitenanced_by', { fullname: 1, email: 1 })
            .populate('station')
            .exec()
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    },
    getDataFromStationFromDate1ToDate2: (req, res) => {
        MeteorologicData.find({
            "station": req.params.id, "registed_at": {
                $gte: req.params.from,
                $lt: req.params.to
            }
        })
            .populate('registed_by', { fullname: 1, email: 1 })
            .populate('maitenanced_by', { fullname: 1, email: 1 })
            .populate('station')
            .exec()
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    },
    getDataFromToday: (req, res) => {
        MeteorologicData.find({ "registered_at": Date.now })
            .populate('registed_by', { fullname: 1, email: 1 })
            .populate('maitenanced_by', { fullname: 1, email: 1 })
            .populate('station')
            .exec()
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    },
    getDataFromTwoDates: (req, res) => {
        MeteorologicData.find({
            "registed_at": { $gte: req.params.from, $lt: req.params.to}
        })
            .populate('registed_by', { fullname: 1, email: 1 })
            .populate('maitenanced_by', { fullname: 1, email: 1 })
            .populate('station')
            .exec()
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    }

}