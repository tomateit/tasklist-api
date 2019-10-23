import { Types, Document } from "mongoose";
import { IPlanElement } from "./planElement";

export interface IPlanObject {
    name: string,
    slug: string,
    description: string,
    attributes: "schedule"|"checklist",
    createdAt?: string,
    dueTo? :string,
    completed: boolean,
    author: Types.ObjectId | string,
    goals: IPlanElement[],
}

export interface IPlanDocument extends IPlanObject, Document {

}