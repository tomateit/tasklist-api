import { Schema, HookNextFunction } from "mongoose";
import jwt = require("jsonwebtoken");
import * as bcrypt from "bcrypt";
import { promisify } from "util";
import * as Tt from "telegram-typings";
import { IAuthenticationRequestBody } from "../interfaces/authenticationRequestBody";
import { ISignupRequestBody } from "../interfaces/signupRequestBody";
import { IUserModel, IUser, User } from "../models/user";
import { IUserDocument, IUserObject } from "../interfaces/user";
import { throwStatement } from "babel-types";

// const bcrypt = {
// 	genSalt: promisify(bcryptmod.genSalt),
// 	hash: promisify(bcryptmod.hash)
// };

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
	telegramId: {
		type : Number,
	},
	email: {
		minlength: 5,
		required: true,
		trim: true,
		type: String,
		unique: true,
	},
	password: {
		type : String,
		minlength: 6,
	},
	authorizedOnWebVersion: {
		type: Boolean,
		default: true,
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
		enum: ["User", "Administrator"],
		default: "User"
	}
})

UserSchema.methods.toJSON = function (): IUserObject {
	const user = this;
	const userObject = user.toObject();
    const { email, username } = userObject;
	return ({ email, username });
};

UserSchema.methods.generateAuthToken = async function (): Promise<string> {
	const access = 'auth';
	const token = jwt.sign({_id: this._id.toHexString(), access}, jwtSecret).toString();

	this.tokens.push({
		access,
		token
	});

	await this.save();
	return token;
};

UserSchema.methods.removeToken = function (token: string) {
	
	return this.update({
		$pull: {
			tokens: {token}
		}
	})
}

UserSchema.statics.findByToken = async function (token: string): Promise<IUserDocument>{

	let decoded: any;

	try {
		decoded = jwt.verify(token, jwtSecret);
		console.log("AUTHENTICATION ATTEMPT");
	} catch (e) {
		console.log('USER JWT ERRER');
		return Promise.reject(e);
	}

	return this.findOne({
		"_id": decoded._id,
		"tokens.access": "auth",
		"tokens.token": token,
  	});
};


UserSchema.statics.authenticateUser = async function (authRequest: IAuthenticationRequestBody): Promise<string> {
	const { username, password } = authRequest;
	const UserModel = this;
	
	const searchResult: IUser | null = await UserModel.findOne({username});

	if (searchResult === null) {
		return Promise.reject(new Error("USERNOTFOUND"));
	}
	
	const passwordMatches: boolean = await searchResult.comparePasswords(password)

	if (!passwordMatches) {
		return Promise.reject(new Error("PASSWORDNOTMATCH"))
	}

	const token = await searchResult.generateAuthToken();

	return Promise.resolve(token)

}

UserSchema.statics.authenticateFromTelegram = async function (userInfo: Tt.User): Promise<IUser> {
	const UserModel = await this.updateOne({ telegramId: userInfo.id}, { telegramId: userInfo.id, username: userInfo.username }, {new: true, upsert: true});
	if (!UserModel.password) {
		UserModel.authorizedOnWebVersion = false;
	}

	return UserModel;
}

UserSchema.methods.hashPassword = async function () {
	const user = this;
	const hashedPassword = await getSaltedHash(user.password);
	
	user.password = hashedPassword;	

}

UserSchema.statics.createNewUser = async function(payload: ISignupRequestBody) {
	 const user = await this.create(payload);
	 await user.hashPassword();
	 return user.generateAuthToken();

}

UserSchema.methods.comparePasswords = async function(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, this.password)
}

async function getSaltedHash(password: string):Promise<string> {
	return bcrypt
	.genSalt()
	.then((salt) => {
		return bcrypt.hash(password, salt)
		},
		(error) => {
		return Promise.reject(error);
	})
}

// UserSchema.pre('save', function(next: HookNextFunction) {

// 	const user: any = this;
// 	if (user.isModified('password')) {

// 		bcrypt.genSalt(10, (err, salt) => {
// 			if(err) {
// 				console.error("Generating salt failed", err);
// 				return next(err);
// 			}
// 			bcrypt.hash(user.password, salt, (error, hash) => {
// 				if(error) {
// 					console.error("Hashing failed: ", error);
// 					return next(error);
// 				}
// 				user.password = hash;
// 				next();
// 			})
// 		})

// 	} else {
// 		next();
// 	}

// })