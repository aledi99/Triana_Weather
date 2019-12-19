'use strict'

const bcrypt = require('bcryptjs');
const User = require('./models/user');
const MeteorologicData = require('./models/meteorologic_data');
const MeteorologicStation = require('./models/meteorologic_station');

//INSERTAMOS USUARIOS DE EJEMPLO
//Contraseña de todos los usuarios
let hash = bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS));

let userUser = new User({
    username: "usuarioUser",
    email: "usuarioUser@email.com",
    fullname: "usuarioUserFullname",
    roles: 'USER',
    password: hash,
    stations_registered: [],
    stations_maitenancing: []
});
let id_user;
userUser.save((err, user) => {
    id_user = user._id;
});

let userManager = new User({
    username: "usuarioManager",
    email: "usuarioManager@email.com",
    fullname: "usuarioManagerFullname",
    roles: 'MANAGER',
    password: hash,
    stations_registered: [],
    stations_maitenancing: []
});
let id_manager;
userManager.save((err, user) => {
    id_manager = user._id;
});

let userAdmin = new User({
    username: "usuarioAdmin",
    email: "usuarioAdmin@email.com",
    fullname: "usuarioAdminFullname",
    roles: 'ADMIN',
    password: hash,
    stations_registered: [],
    stations_maitenancing: []
});
let id_admin;
userAdmin.save((err, user) => {
    id_admin = user._id;
});

//INSERTAMOS ESTACIONES
let stationUser = new MeteorologicStation({
    latitude: 60.0762,
    longitude: -135.0278,
    name: "stationUser",
    registed_by: id_user,
    maitenanced_by: id_user
});
let id_station_user;
stationUser.save((err, station) => {
    id_station_user = station._id;
});
User.findByIdAndUpdate(id_user, {$push: {stations_maitenancing: id_station_user}});
User.findByIdAndUpdate(id_user, {$push: {stations_registered: id_station_user}});

let stationManager = new MeteorologicStation({
    latitude: 80.0762,
    longitude: -181.0278,
    name: "stationManager",
    registed_by: id_manager,
    maitenanced_by: id_manager
});
let id_station_manager;
stationManager.save((err, station) => {
    id_station_manager = station._id;
});
User.findByIdAndUpdate(id_manager, {$push: {stations_maitenancing: id_station_manager}});
User.findByIdAndUpdate(id_manager, {$push: {stations_registered: id_station_manager}});

let stationAdmin = new MeteorologicStation({
    latitude: -130.0762,
    longitude: 93.0278,
    name: "stationAdmin",
    registed_by: id_admin,
    maitenanced_by: id_admin
});
let id_station_admin;
stationAdmin.save((err, station) => {
    id_station_admin = station._id;
});
User.findByIdAndUpdate(id_admin, {$push: {stations_maitenancing: id_station_admin}});
User.findByIdAndUpdate(id_admin, {$push: {stations_registered: id_station_admin}});

//INSERTAMOS DATOS METEREOLOGICOS
let meteorologicDataUser = new MeteorologicData({
    rain: 16.3,
    wind_speed: 32,
    wind_direction: 163,
    temperature_ambient: 14.2,
    temperature_graund: 13.4,
    humidity: 70,
    air_quality: 52,
    pressure: 1023.12,
    station: id_station_user
});
meteorologicDataUser.save()

let meteorologicDataManager = new MeteorologicData({
    rain: 15,
    wind_speed: 35,
    wind_direction: 170,
    temperature_ambient: 20,
    temperature_graund: 18.5,
    humidity: 55,
    air_quality: 60,
    pressure: 1013.12,
    station: id_station_manager
});
meteorologicDataManager.save()

let meteorologicDataAdmin = new MeteorologicData({
    rain: 16,
    wind_speed: 40,
    wind_direction: 182,
    temperature_ambient: 24,
    temperature_graund: 22.6,
    humidity: 40,
    air_quality: 44,
    pressure: 1006.12,
    station: id_station_admin
});
meteorologicDataAdmin.save()