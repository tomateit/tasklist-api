import { Types, Document } from "mongoose";
import { IStepObject } from "./step";
export interface IGoalObject {
    id?: any,
    name: string,
    slug: string,
    class: string,
    goalType: "recurring" | "single",
    description: string,
    createdAt: string,
    dueTo: string,
    steps: IStepObject[]
}

export interface IGoalDocument extends IGoalObject, Document {
    _id: Types.ObjectId
}