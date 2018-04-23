const request = require('request');

let geocodeAddressByText = function (address, callback) {
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body)=>{
        if (error) {
            callback('Can\'t connect to GOOGLE servers');
        } else if (body.status === "ZERO_RESULTS") {
            callback("Google service could find no results");
        } else if (body.status === "OVER_QUERY_LIMIT") {
            callback("Google API rejects due to over query limit");
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }
    });
};

let geocodeAddressByIP = function (ip, callback) {
  
    request({
        url: `http://ip-api.com/json/${ip}`,
        json: true
    }, (error, response, body)=>{
        if (error) {
            callback('Can\'t connect to "ip-api.com" servers');
        } else if (body.status === 'fail') {
            callback(`Service "ip-api.com" returned fail status with message "${body.message}"`);
        } else if (body.status === 'success') {
            callback(undefined, {
                address: { 
                	country : body.country,
                	city : body.city 
                 },
                latitude: body.lat,
                longitude: body.lon
            });
        }
    });
};

module.exports = { geocodeAddressByText, geocodeAddressByIP};