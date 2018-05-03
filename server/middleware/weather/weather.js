const request = require('request');
const token = process.env.WEATHER_TOKEN;
var getWeatherWithIP = (obj, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${token}/${obj.latitude},${obj.longitude}?lang=en&units=auto&exclude=minutely,hourly,daily`,
        json: true
    }, (error,response, body) => {
        if (error) {
            callback('Weather forecast service cannot be reached');
        } else if (body.code === 400) {
            callback(body.error);
        } else {
        	let response = Object.assign(obj, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                summary: body.currently.summary});
        	callback(undefined, response);
        }
            
    })
}

module.exports.getWeatherWithIP = getWeatherWithIP;