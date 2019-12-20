'use strict'

const bcrypt = require('bcryptjs');
const User = require('./models/user');
const MeteorologicData = require('./models/meteorologic_data');
const MeteorologicStation = require('./models/meteorologic_station');

//INSERTAMOS USUARIOS DE EJEMPLO
//Contraseña de todos los usuarios
let hash = bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS));

let userUser = new User({
    _id: "5df9196f13b3a71be8c45de1",
    username: "usuarioUser",
    email: "usuarioUser@email.com",
    fullname: "usuarioUserFullname",
    roles: 'USER',
    password: hash,
    stations_registered: ["5df915387853105891baf7a9"],
    stations_maitenancing: ["5df915387853105891baf7a9"]
});
userUser.save();

let userManager = new User({
    _id: "5df919997853105891baf7af",
    username: "usuarioManager",
    email: "usuarioManager@email.com",
    fullname: "usuarioManagerFullname",
    roles: 'MANAGER',
    password: hash,
    stations_registered: ["5df915387853105891baf7aa"],
    stations_maitenancing: ["5df915387853105891baf7aa"]
});
userManager.save();

let userAdmin = new User({
    _id: "5df919997853105891baf7b0",
    username: "usuarioAdmin",
    email: "usuarioAdmin@email.com",
    fullname: "usuarioAdminFullname",
    roles: 'ADMIN',
    password: hash,
    stations_registered: ["5df915387853105891baf7ab"],
    stations_maitenancing: ["5df915387853105891baf7ab"]
});
userAdmin.save();

//INSERTAMOS ESTACIONES
let stationUser = new MeteorologicStation({
    _id: "5df915387853105891baf7a9",
    latitude: 60.0762,
    longitude: -135.0278,
    name: "stationUser",
    registed_by: "5df9196f13b3a71be8c45de1",
    maitenanced_by: "5df9196f13b3a71be8c45de1"
});
stationUser.save();

let stationManager = new MeteorologicStation({
    _id: "5df915387853105891baf7aa",
    latitude: 80.0762,
    longitude: -181.0278,
    name: "stationManager",
    registed_by: "5df919997853105891baf7af",
    maitenanced_by: "5df919997853105891baf7af"
});
stationManager.save();

let stationAdmin = new MeteorologicStation({
    _id: "5df915387853105891baf7ab",
    latitude: -130.0762,
    longitude: 93.0278,
    name: "stationAdmin",
    registed_by: "5df919997853105891baf7b0",
    maitenanced_by: "5df919997853105891baf7b0"
});
stationAdmin.save();

//INSERTAMOS DATOS METEREOLOGICOS
let meteorologicDataUser = new MeteorologicData({
    _id: "5dfa862e87a57227bce8e347",
    rain: 16.3,
    wind_speed: 32,
    wind_direction: 163,
    temperature_ambient: 14.2,
    temperature_graund: 13.4,
    humidity: 70,
    air_quality: 52,
    pressure: 1023.12,
    station: "5df915387853105891baf7a9"
});
meteorologicDataUser.save()

let meteorologicDataManager = new MeteorologicData({
    _id: "5dfa868287a57227bce8e348",
    rain: 15,
    wind_speed: 35,
    wind_direction: 170,
    temperature_ambient: 20,
    temperature_graund: 18.5,
    humidity: 55,
    air_quality: 60,
    pressure: 1013.12,
    station: "5df915387853105891baf7aa"
});
meteorologicDataManager.save()

let meteorologicDataAdmin = new MeteorologicData({
    _id: "5dfa86ba3084013d68b9665d",
    rain: 16,
    wind_speed: 40,
    wind_direction: 182,
    temperature_ambient: 24,
    temperature_graund: 22.6,
    humidity: 40,
    air_quality: 44,
    pressure: 1006.12,
    station: "5df915387853105891baf7ab"
});
meteorologicDataAdmin.save()