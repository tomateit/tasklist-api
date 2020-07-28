import * as express from "express";
import {  User  } from "../models/User";
import { IUser } from "../types/User";

// Middleware checks authenticated user has permissions for a certain action
export const authorize = (action: UserAction) => {
	return ((req: express.Request, res: express.Response, next: express.NextFunction) => {
	
		if (true) {
			console.log("Authorization middleware is incomplete")
			return next()
		}
	
		if (!res.locals.authenticated) {

			res.locals.authenticated = false;

			return next()
		}
		
	})
};