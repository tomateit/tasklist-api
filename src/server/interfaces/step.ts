import { Types, Document } from "mongoose";

export interface IStepObject {
    name: string,
    slug: string,
    class: string,

    description: string,
    completed: boolean,
    dueTo: string,
}