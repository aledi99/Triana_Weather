'use strict'

const MeteorologicStation = require('../models/meteorologic_station');

module.exports = {

    newStation: (req, res) => {
        let station = new MeteorologicStation({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            registed_by: req.user._id,
            maitenanced_by: req.user._id
        });
        station.save()
            .then(s => s.populate('registed_by', { fullname: 1, email: 1 }).execPopulate())
            .then(s => s.populate('maintenanced_by', { fullname: 1, email: 1 }).execPopulate())
            .then(s => res.status(201).json(s))
            .catch(err => res.send(500).json(err.message));
    },
    getStation: (req, res) => {
        MeteorologicStation.find()
            .populate('registed_by', { fullname: 1, email: 1 })
            .populate('maintenanced_by', { fullname: 1, email: 1 })
            .exec()
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).send(error.message));
    },

    delStation: (req, res) => {
        MeteorologicStation.findByIdAndDelete(req.params.id)
            .exec()
            .then(res.send(204))
            .catch(res, status(404).send("Estación no encontrada"))
    },
    updateStation: (req, res) => {
        MeteorologicStation.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    name: req.body.name,
                }
            }, { new: true }, (err, station) => {
                if (station == null) {
                    res.status(404).send("No se ha encontrado ningúna estación con ese ID")
                }
                else {
                    MeteorologicStation.findById(station._id)
                        .exec()
                        .then(x => x.populate('registed_by').execPopulate())
                        .then(x => x.populate('maitenanced_by').execPopulate())
                        .then(x => res.status(200).json({
                            latitude: x.latitude,
                            longitude: x.longitude,
                            name: x.name,
                            registed_name: x.registed_by.fullname,
                            registed_email: x.registed_by.email,
                            maitenanced_name: x.maitenanced_by.fullname,
                            maitenanced_email: x.maitenanced_by.email
                        }))
                        .catch(err => res.send(500).json(err.message))
                }
            });
    },
    getStationById: (req, res) => {
        MeteorologicStation.findById(req.params.id)
            .exec()
            .then(d => d.populate('registed_by', { fullname: 1, email: 1 }).execPopulate())
            .then(d => d.populate('maitenanced_by', { fullname: 1, email: 1 }).execPopulate())
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    }
}