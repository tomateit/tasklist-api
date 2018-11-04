const request = require('request');

let geocodeAddressByText = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_TOKEN}&location=${encodedAddress}`,
        json: true
        }, (error, response, body)=>{
            if (error) {
                reject({message:'Can\'t connect to GOOGLE servers'});
            } else if (response.statusCode === 403) {
                reject({message: "MapQuest API key seems to be invalid"});
            } else if (body.info.statuscode === 0) {
                resolve({
                    address: {
                        city: body.results[0].locations[0].adminArea5 
                            || body.results[0].locations[0].adminArea4 
                            || body.results[0].locations[0].adminArea3,
                        country: body.results[0].locations[0].adminArea1
                    },
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });  
    });
};

let geocodeAddressByIP = (ip) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://ip-api.com/json/${ip}`,
            json: true
            }, (error, response, body)=>{
                if (error) {
                    reject({message: 'Can\'t connect to "ip-api.com" servers'});
                } else if (body.status === 'fail') {
                    reject({message: `Service "ip-api.com" returned fail status with message "${body.message}"`});
                } else if (body.status === 'success') {
                    resolve({
                        address: { 
                            country : body.country,
                            city : body.city 
                        },
                        latitude: body.lat,
                        longitude: body.lon
                    });
                }
            });
    });
};

module.exports = { geocodeAddressByText, geocodeAddressByIP};