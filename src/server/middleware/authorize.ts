import * as express from "express";
import { IUserModel, User, IUser } from "../models/user";
import { UserAction } from "../types/userActions";
import { IUserRole } from "../types/userRoles";
// import { IUser } from "../interfaces/user";

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