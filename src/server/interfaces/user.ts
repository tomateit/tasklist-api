import { Types, Document } from "mongoose";

export interface IUserObject {
    email: string,
    username: string,
    createdAt?: string,
    password? :string
}

export interface IUserDocument extends Document, IUserObject{
    
}