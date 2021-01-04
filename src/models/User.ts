import { Document, Model, Schema, Types, model } from "mongoose";
import { IUserObject } from "../types/User";

export interface IUserDocument extends Document, IUserObject {

}

interface IUserModel extends Model<IUserDocument> {
    findByToken(token: string): Promise<IUserDocument | null>;
    authenticateUser(creds: object): Promise<string>;
    createNewUser(creds: object): Promise<string>
}  

const UserSchema = new Schema<IUserModel>({

})

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema, "activities");