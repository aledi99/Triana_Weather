'use strict'

const MeteorologicData = require('../models/meteorologic_data');
const User = require('../models/user');

module.exports = {
    nuevaData: (req, res) => {
        let maitenanced_user;
        User.findOne({"stations_maitenancing": req.body.station}, (err, user) => {
            if(err) res.send(500, err.message);
            maitenanced_user = user;
        });

        let meteorologicData = new MeteorologicData({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            registed_by: req.user._id,
            maitenanced_by: maitenanced_user._id,
            station: req.body.station
        });
        meteorologicData.save((err, meteorologicData) => {
            if(err) res.send(500, err.message);
            res.status(201).json(meteorologicData);
        });
    }

}