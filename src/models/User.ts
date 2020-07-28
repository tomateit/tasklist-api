import { Document, Model, Schema, Types, model } from "mongoose";
import {IUserObject} from "../types/User";

export interface IUserDocument extends Document, IUserObject {

}

interface IUserModel extends Model<IUserDocument> {
    findByToken(token: string): IUserDocument | null;
}  

const UserSchema = new Schema<IUserModel>({

})

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema, "activities");