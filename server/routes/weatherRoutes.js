const Router = require('express').Router();

const {geocodeAddressByIP} = require('../middleware/geocode/geocode.js');
const {getWeatherWithIP} = require('../middleware/weather/weather.js')


Router.get('/', (req, res) => {

	
	/*let ip = req.ip.slice(7)*/;
	let ip = req.headers['x-forwarded-for'] || req.ip;
	console.log("GET WEATHER requested");
	geocodeAddressByIP(ip, (err, data) => {

		if (err) {
			return res.render(__dirname + '/views/error.hbs',{
		        PageTitle: 'Oops, some error',
		        errMainText: 'We tried to detect you location based by IP, but had some problems',
		        errWhy: 'Maybe you are running this app on localhost, or some your\'s or your IPS\'s proxy settings set up wrong headers',
		        errCode: 502,
		        errBody: err
			})
		} 
		getWeatherWithIP(data, (err, obj) => {
			console.log("getWeatherWithIP was invoked")
			if (err){
				return res.render(__dirname + '/views/error.hbs',{
		        PageTitle: 'Oops, some error',
		        errMainText: 'We tried to detect your local weather based by IP location, but had some problems',
		        errWhy: 'Maybe there\'s some weather service fault',
		        errCode: 502,
		        errBody: err
			})
			}

			return res.render(__dirname + '/views/weather.hbs',{
		        pageTitle: 'PROJ3 Weather',
		        mainText: 'Here you will be able to find your local forecast , based on your IP',
		        weather: obj
			})

		})
	});
	 
});

module.exports = Router;