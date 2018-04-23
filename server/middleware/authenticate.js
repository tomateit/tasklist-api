// Is used in usersRoutes.js 


const {User} = require('./../models/user');

let authenticate = (req, res, next) => {
	let token = req.header('x-auth');
	
	User.findByToken(token).then((user) => {

		if (!user) {
			// For case if token is valid but findByToken cant find anything
			return Promise.reject();
		}



		req.user = user;
		req.token = token;
		next();
	}).catch((e) => {
		res.status(401).send();
	})

};

module.exports = {authenticate};		