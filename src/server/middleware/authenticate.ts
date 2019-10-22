import * as express from "express";
import { IUserModel, User } from "../models/user";

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	
	const token = req.header('x-auth');
	if (!token) {
		res.locals.authenticated = false
		return next()
	}
	User.findByToken(token).then((user: IUserModel ) => {


		res.locals.authenticated = true;
		res.locals.user = user;
		res.locals.token = token;
		next();
		
	}).catch((error: Error) => {
		console.error(error);
		res.status(401).send();
	})

};

module.exports = {authenticate};		