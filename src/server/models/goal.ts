import { Document, model,  Model } from "mongoose";
import { IGoalDocument, IGoalObject} from "../interfaces/goal";
import { GoalSchema } from "../schemas/goal";


export interface IGoal extends  IGoalDocument {
    toJSON(): IGoalObject
}

export interface IGoalModel extends Model<IGoal> {

}

export const Goal = model<IGoal, IGoalModel>("Goal", GoalSchema);