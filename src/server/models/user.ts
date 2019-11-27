import { Document, model, Model, Types } from "mongoose";
import { IUserDocument, IUserObject } from "../interfaces/user";
import { IAuthenticationRequestBody } from "../interfaces/authenticationRequestBody";
import { ISignupRequestBody } from "../interfaces/signupRequestBody";
import { UserSchema } from "../schemas/user";
import * as Tt from "telegram-typings";

export interface IUser extends IUserDocument {
    hashPassword(plaintexPassword: string): string
    generateAuthToken(): Promise<string>,
    toJSON(): IUserObject,
    comparePasswords(password: string): Promise<boolean>,
}

export interface IUserModel extends Model<IUser> {
    _id: Types.ObjectId,
    findByToken(token: string): Promise<IUser>,
    createNewUser(payload: ISignupRequestBody): Promise<string>,
    authenticateUser(authRequest: IAuthenticationRequestBody): Promise<string>,
    authenticateFromTelegram(userInfo: Tt.User): Promise<IUser>,
}

export const User = model<IUser, IUserModel>("User", UserSchema);

