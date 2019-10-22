import { Schema, HookNextFunction } from "mongoose";
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");

import { IAuthenticationRequestBody } from "../interfaces/authenticationRequestBody";
import { IUserModel, IUser } from "../models/user";
import { IUserDocument, IUserObject } from "../interfaces/user";
const jwtSecretEnv: string | undefined = process.env.JWT_SECRET;
const jwtSecret: jwt.Secret = String(jwtSecretEnv);
// tslint:disable:object-literal-sort-keys
export const UserSchema: Schema = new Schema({
    username: {
		minlength: 5,
		required: true,
		trim: true,
		type: String,
		unique: true,
	},
	email: {
		minlength: 5,
		required: true,
		trim: true,
		type: String,
		unique: true,
	},
	password: {
		minlength: 6,
		requred: true,
		type : String,
	},
	createdAt: {
		type: Date,
		default: new Date
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}],
	role: {
		type: String,
		enum: ["User", "Administrator"]
	}
})

UserSchema.methods.toJSON = function (): IUserObject {
	const user = this;
	const userObject = user.toObject();
    const { email, username } = userObject;
	return ({ email, username });
};

UserSchema.methods.generateAuthToken = async function (): Promise<string> {
	const User = this;
	const access = 'auth';
	const token = jwt.sign({_id: User._id.toHexString(), access}, jwtSecret).toString();

	User.tokens.push({
		access,
		token
	});

	await User.save();
	return token;
};

UserSchema.methods.removeToken = function (token: string) {
	const User = this;

	return User.update({
		$pull: {
			tokens: {token}
		}
	})
}

UserSchema.statics.findByToken = async function (token: string): Promise<IUserDocument>{

	const User = this;
	let decoded: any;

	//! WTF????
	try {
		decoded = jwt.verify(token, jwtSecret);
		console.log(JSON.stringify(decoded));
	} catch (e) {
		console.log('USER JWT ERRER');
		return Promise.reject(e);
	}


	return User.findOne({
		"_id": decoded._id,
		"tokens.access": "auth",
		"tokens.token": token,
  	});
};


UserSchema.statics.authenticateUser = async function (authRequest: IAuthenticationRequestBody): Promise<string> {
	const { username, password } = authRequest;
	const UserModel = this;
	
	//! Storing plaintext passwords in development purposes
	const searchResult: IUser | null = await UserModel.findOne({username, password});

	if (searchResult === null) {
		return Promise.reject(new Error("USERNOTFOUND"));
	}

	const token = await searchResult.generateAuthToken();

	return Promise.resolve(token)

}


UserSchema.pre('save', function(next: HookNextFunction) {

	const user: any = this;
	if (user.isModified('password')) {

		bcrypt.genSalt(10, (err, salt) => {
			if(err) {
				console.error("Generating salt failed", err);
				return next(err);
			}
			bcrypt.hash(user.password, salt, (error, hash) => {
				if(error) {
					console.error("Hashing failed: ", error);
					return next(error);
				}
				user.password = hash;
				next();
			})
		})

	} else {
		next();
	}

})