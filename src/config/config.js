let env = process.env.NODE_ENV || 'development';

console.log("----------------CONFIG ACTIVATED----------------------")


if (env === 'development'){
		let keys = require('./keys.js');
		process.env.WEATHER_TOKEN = keys.weatherToken;
		process.env.GEOCODE_TOKEN = keys.geocodeToken;
		process.env.MONGODB_URI = keys.mongoDbURI;
		process.env.PORT = 3000;
		process.env.JWT_SECRET = "wrdjahdfiuewhuhy3763ehfh376r67!@#$#%%&ggtftfre$#@#%fgtrffd$#$$%";
		
} else {
	

}