import { Types } from "mongoose";

export interface ITodo {
    title: string,
    description: string,
    createdAt?: string,
    completed: boolean,
    dueTo? :string,
    author: Types.ObjectId | string,
}