import { Document, model, Model } from "mongoose";
import { IUserDocument } from "../interfaces/user";
import { IAuthenticationRequestBody } from "../interfaces/authenticationRequestBody";
import { UserSchema } from "../schemas/user";

export interface IUser extends IUserDocument {
    hashPassword(plaintexPassword: string): string
    generateAuthToken(): Promise<string>,
    toJSON(): IUserDocument
}

export interface IUserModel extends Model<IUser> {
    findByToken(token: string): Promise<IUser>,

    authenticateUser(authRequest: IAuthenticationRequestBody): Promise<string>
}

export const User = model<IUser, IUserModel>("User", UserSchema);

