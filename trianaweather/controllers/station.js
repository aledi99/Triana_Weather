'use strict'

const error_types = require('./error_types');
const _ = require('lodash');
const MeteorologicStation = require('../models/meteorologic_station');

module.exports = {

    newStation: (req, res) => {
        let station = new MeteorologicStation({
            rain: req.body.rain,
            wind_speed: req.body.wind_speed,
            wind_direction: req.body.wind_direction,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            air_quality: req.body.air_quality,
            pressure: req.body.pressure,
            registed_by: req.user,
            maitenanced_by: req.user
        });
        station.save()
            .then(s => s.populate('registed_by').execPopulate())
            .then(s => s.populate('maintenanced_by').execPopulate())
            .then(s => res.status(201).json(s))
            .catch(err => res.send(500).json(err.message));
    },
    getStation: async (req, res) => {
        try {
            let result = null;

            if (req.user.roles == "MANAGER") {
                result = await MeteorologicStation.find().exec();
            } else {
                res.send(401, "No tienes autorización")
            }
            res.status(200).json(result);
        } catch (error) {
            res.send(500, error.message);
        }
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
                    rain: req.body.rain,
                    wind_speed: req.body.wind_speed,
                    wind_direction: req.body.wind_direction,
                    temperature: req.body.temperature,
                    humidity: req.body.humidity,
                    air_quality: req.body.air_quality,
                    pressure: req.body.pressure,
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
                            rain: x.rain,
                            wind_speed: x.wind_speed,
                            wind_direction: x.wind_direction,
                            temperature: x.temperature,
                            humidity: x.humidity,
                            air_quality: x.air_quality,
                            pressure: x.pressure,
                            registed_name : x.registed_by.fullname,
                            registed_email: x.registed_by.email,
                            maitenanced_name: x.maitenanced_by.fullname,
                            maitenanced_email: x.maitenanced_by.email
                        }))
                        .catch(err => res.send(500).json(err.message))
                }
            });
    }
}