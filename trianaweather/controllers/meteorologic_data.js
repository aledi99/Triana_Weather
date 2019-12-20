'use strict'

const MeteorologicData = require('../models/meteorologic_data');
const mongoose = require('mongoose');
var now = new Date();
var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

module.exports = {
    nuevaData: async (req, res) => {
        let meteorologicData = new MeteorologicData({
            rain: req.body.rain,
            wind_speed: req.body.wind_speed,
            wind_direction: req.body.wind_direction,
            temperature_ambient: req.body.temperature_ambient,
            temperature_graund: req.body.temperature_graund,
            humidity: req.body.humidity,
            air_quality: req.body.air_quality,
            pressure: req.body.pressure,
            station: req.body.station
        });
        await meteorologicData.save()
            .then(d => d.populate({
                path:'station',
                model: 'MeteorologicStation',
                populate: {
                    path: 'registed_by maitenanced_by',
                    model: 'User',
                    select: 'fullname email'
            }}).execPopulate())
            .then(d => res.status(201).json(d))
            .catch(err => res.send(500, err.message));
    },
    getDataById: (req, res) => {
        MeteorologicData.findById(req.params.id)
            .exec()
            .then(d => d.populate({
                path:'station',
                model: 'MeteorologicStation',
                populate: {
                    path: 'registed_by maitenanced_by',
                    model: 'User',
                    select: 'fullname email'
            }}).execPopulate())
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    },
    getDataByStationId: (req, res) => {
        MeteorologicData.find({ "station": req.params.id })
            .populate({path:'station',
                model: 'MeteorologicStation',
                populate: {
                    path: 'registed_by maitenanced_by',
                    path: 'User',
                    select: 'fullname email'
                }})
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
            .populate({path:'station',
                model: 'MeteorologicStation',
                populate: {
                    path: 'registed_by maitenanced_by',
                    path: 'User',
                    select: 'fullname email'
                }})
            .exec()
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    },
    getDataFromToday: (req, res) => {
        let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        MeteorologicData.find({ "registered_at": {$gte: startOfToday}})
            .populate({
                path:'station',
                model: 'MeteorologicStation',
                populate: {
                    path: 'registed_by maitenanced_by',
                    path: 'User',
                    select: 'fullname email'
            }})
            .exec()
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    },
    getDataFromTwoDates: (req, res) => {
        MeteorologicData.find({
            "registed_at": { $gte: req.params.from, $lt: req.params.to}
        })
            .populate({path:'station',
                model: 'MeteorologicStation',
                populate: {
                    path: 'registed_by maitenanced_by',
                    path: 'User',
                    select: 'fullname email'
            }})
            .exec()
            .then(d => res.status(200).json(d))
            .catch(err => res.status(500).send(err.message));
    }/* ,
    getSummary: async (req, res) => {
        console.log(req.params.id)
        await MeteorologicData.aggregate([
        {
        "$match": {
            station: {$in: mongoose.Types.ObjectId(req.params.id)},
            
        },
        "$match": {
            registed_at: {$gte: startOfToday} 
        }
         , 
        "$group": {
            _id: '$id',
            maxTemperatureAmbient: {$max: '$temperature_ambient'},
            minTemperatureAmbient: {$min: '$temperature_ambient'},
            averageTemperatureAmbient: {$avg: '$temperature_ambient'},
            maxTemperatureGround: {$max: '$temperature_ground'},
            minTemperatureGround: {$min: '$temperature_ground'},
            averageTemperatureGround: {$avg: '$temperature_ground'},
            totalRain: {$sum: '$rain'},
            averageHumidity: {$avg: '$humidity'},
            averageAirQuality: {$avg: '$air_quality'}                
        } 
         .group(
            {
                _id: 'hola',
                maxTemperatureAmbient: {$max: '$temperature_ambient'},
                minTemperatureAmbient: {$min: '$temperature_ambient'},
                averageTemperatureAmbient: {$avg: '$temperature_ambient'},
                maxTemperatureGround: {$max: '$temperature_ground'},
                minTemperatureGround: {$min: '$temperature_ground'},
                averageTemperatureGround: {$avg: '$temperature_ground'},
                totalRain: {$sum: '$rain'},
                averageHumidity: {$avg: '$humidity'},
                averageAirQuality: {$avg: '$air_quality'}                
                }) 
                .exec()
                .then(d => res.status(200).json(d))
                .catch(error => {res.status(500).send(err.message)});
    } */

}