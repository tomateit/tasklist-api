const Router = require('express').Router();

const {geocodeAddressByIP , geocodeAddressByText} = require('../middleware/geocode/');
const {getWeatherWithIP} = require('../middleware/weather/')

Router.get('/', (req, res) => {
	let ip = req.headers['x-forwarded-for'] || req.ip;
	console.log("GET WEATHER requested");
	console.log(req.ip);
	geocodeAddressByIP(ip).then((address) => {
		getWeatherWithIP(address).then((weather) => {
			res.render('weather',{
		        pageTitle: 'Weather',
		        mainText: 'Here you will be able to find your local forecast , based on your IP',
			weather,
			address
			})
		})
	}).catch((error) => {
		res.render('error',{
		        pageTitle: 'Error',
		        mainText: error.message,
			})
	})
});

Router.get('/:address', (req, res) => {
	console.log(`GET CUSTOM WEATHER requested for ${req.params.address}`);
	geocodeAddressByText(req.params.address).then((address) => {
		getWeatherWithIP(address).then((weather) => {
			res.render('weather',{
		        pageTitle: 'Weather',
		        mainText: 'Here you will be able to find your local forecast , based on your IP',
		        weather
			})
		})
	}).catch((error) => {
		res.render('error',{
		        pageTitle: 'Error',
		        mainText: error.message,
			})
	})
});

module.exports = Router;