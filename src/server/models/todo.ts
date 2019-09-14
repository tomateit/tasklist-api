import { Document } from "mongoose";
import { ITodo } from "../interfaces/todo";


export interface ITodoModel extends ITodo, Document {

}

