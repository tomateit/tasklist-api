import { Document, Model, Schema, Types, model } from "mongoose";
import {IZoneObject} from "../types/Zone";

export interface IZoneDocument extends Document, IZoneObject {

}

interface IZoneModel extends Model<IZoneDocument> {

}

const ZoneSchema = new Schema<IZoneModel>({

})

export const Zone: IZoneModel = model<IZoneDocument, IZoneModel>("Zone", ZoneSchema, "activities");