'use strict'

const MeteorologicData = require('../models/meteorologic_data');
const User = require('../models/user');
const Station = require('../models/meteorologic_station');

module.exports = {
    nuevaData: (req, res) => {

        let meteorologicData = new MeteorologicData({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            //registed_at: Date.now,
            registed_by: req.user,
            maitenanced_by: req.body.maitenanced_by,
            station: req.body.station
        });
        meteorologicData.save()
            .then(d => {console.log(d)
                d.populate('registed_by', {fullname: 1, email: 1}).execPopulate()})
            .then(d => d.populate('maitenanced_by', {fullname: 1, email: 1}).execPopulate())
            .then(d => d.populate('station').execPopulate())
            .then(d => res.status(200).json(d))
            .catch( err => res.send(500, err.message));
    },
    getDataById: (req, res) => {
        /* MeteorologicData.findOne({"_id": req.params.id}, (err, data) => {
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
        }); */
        MeteorologicData.findOne({"_id": req.params.id})
            .then(d => {console.log(d)
                d.populate('registed_by', {fullname: 1, email: 1}).execPopulate()})
            .then(d => d.populate('maitenanced_by', {fullname: 1, email: 1}).execPopulate())
            .then(d => d.populate('station').execPopulate())
            .then(d => res.status(200).json(d))
            .catch( err => res.status(500).send(err.message));
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