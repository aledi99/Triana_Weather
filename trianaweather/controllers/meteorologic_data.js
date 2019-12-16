'use strict'

const MeteorologicData = require('../models/meteorologic_data');
const User = require('../models/user');
const Station = require('../models/meteorologic_station');

module.exports = {
    nuevaData: (req, res) => {
        let maitenanced_user;
        User.findOne({"stations_maitenancing": req.body.station}, (err, user) => {
            if(err) res.send(500, err.message);
            maitenanced_user = user;
        });

        let station_of_data;
        Station.findOne({"_id": req.body.station}, (err, station) => {
            if(err) res.send(500, err.message);
            station_of_data = station;
        });

        let meteorologicData = new MeteorologicData({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            //registed_at: Date.now,
            registed_by: req.user,
            maitenanced_by: maitenanced_user,
            station: station_of_data
        });
        meteorologicData.save((err, meteorologicData) => {
            if(err) res.send(500, err.message);
            res.status(201).json(meteorologicData);
        });
    },
    getDataById: (req, res) => {
        MeteorologicData.findOne({"_id": req.params.id}, (err, data) => {
            if(err) res.send(500, err.message);
            User.populate(data, {path: "registed_by"},(err, data) =>{
                if(err) res.send(500, err.message);
                User.populate(data, {path: "maitenanced_by"},(err, data) =>{
                    if(err) res.send(500, err.message);
                    Station.populate(data, {path: "station"},(err, data) =>{
                        if(err) res.send(500, err.message);
                        res.status(200).json(data);
                    });
                });
            });
        });
    },
    getDataByStationId: (req, res) => {
        MeteorologicData.find({"station": req.params.id}, (err, data) => {
            if(err) res.send(500, err.message);
            User.populate(data, {path: "registed_by"},(err, data) =>{
                if(err) res.send(500, err.message);
                User.populate(data, {path: "maitenanced_by"},(err, data) =>{
                    if(err) res.send(500, err.message);
                    Station.populate(data, {path: "station"},(err, data) =>{
                        if(err) res.send(500, err.message);
                        res.status(200).json(data);
                    });
                });
            });
        });
    },
    getDataFromStationFromDate1ToDate2: (req, res) => {
        MeteorologicData.find({"station": req.params.id, "registed_at": {
            $gte: req.params.from,
            $lt: req.params.to
        }}, (err, data) => {
                if(err) res.send(500, err.message);
                User.populate(data, {path: "registed_by"},(err, data) =>{
                    if(err) res.send(500, err.message);
                    User.populate(data, {path: "maitenanced_by"},(err, data) =>{
                        if(err) res.send(500, err.message);
                        Station.populate(data, {path: "station"},(err, data) =>{
                            if(err) res.send(500, err.message);
                            res.status(200).json(data);
                        });
                    });
                });
            });
    }

}