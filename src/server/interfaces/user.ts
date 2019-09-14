import { Types } from "mongoose";

export interface IUser {
    email: string,
    username: string,
    createdAt?: string,
    password? :string
}