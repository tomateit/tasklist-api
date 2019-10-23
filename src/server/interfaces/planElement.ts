import { Types } from  "mongoose";

export interface IPlanElement {
    goalType: "fixed" | "shuffle",
    identifier?: Types.ObjectId | string,
    className?: string
}