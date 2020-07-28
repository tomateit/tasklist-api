import { Document, Model, Schema, Types, model } from "mongoose";
import {IActivityObject} from "../types/Activity";

export interface IActivityDocument extends Document, IActivityObject {

}

interface IActivityModel extends Model<IActivityDocument> {

}

const ActivitySchema = new Schema<IActivityModel>({

})

export const Activity: IActivityModel = model<IActivityDocument, IActivityModel>("Activity", ActivitySchema, "activities");