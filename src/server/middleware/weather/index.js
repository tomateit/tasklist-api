const request = require('request');
const token = process.env.WEATHER_TOKEN;
var getWeatherWithIP = (obj) => {
    return new Promise((resolve, reject) => {
        request({
        url: `https://api.darksky.net/forecast/${token}/${obj.latitude},${obj.longitude}?lang=en&units=auto&exclude=minutely,hourly,daily`,
        json: true
        }, (error,response, body) => {
            if (error) {
                reject({message: 'Weather forecast service cannot be reached'});
            } else if (body.code === 400) {
                reject({message: body.error});
            } else {
                let response = Object.assign(obj, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature,
                    summary: body.currently.summary});
                resolve(response);
            }  
        })
    })
    
}

module.exports.getWeatherWithIP = getWeatherWithIP;