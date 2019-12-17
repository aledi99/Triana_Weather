'use strict'

const error_types = require('./error_types');
const _ = require('lodash');

module.exports = {

    newStation: async (req, res) => {
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

        station.save((err, station) => {
            if (err) res.send(500, err.message);
            res.status(201).json(station);
        })
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
    }
}