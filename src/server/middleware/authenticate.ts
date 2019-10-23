import * as express from "express";
import { IUserModel, User, IUser } from "../models/user";
import { isUndefined } from "util";
// import { IUser } from "../interfaces/user";

// Middleware tries to identify the author of the incoming request
export const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    console.log("Incomplete authentication middleware")
    // return next();

	const token = req.header('x-auth');
	if (isUndefined(token)) {
        res.locals.authenticated = false;
        res.locals.anonymous = true;
		return next()
	}

	User.findByToken(token).then((user: IUser ) => {

		res.locals.authenticated = true;
		res.locals.user = user;
		res.locals.token = token;
		next();
		
	}).catch((error: Error) => {
		console.error(error);
		res.status(401).send();
	})

};