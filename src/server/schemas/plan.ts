import { Schema, HookNextFunction, Types } from "mongoose";
import { GoalSchema } from "./goal";
import { IPlan, IPlanModel } from "../models/plan";
import { IPlanDocument } from "../interfaces/plan";
// tslint:disable:object-literal-sort-keys
export const PlanSchema: Schema = new Schema({
    name: {
        minlength: 5,
        maxlength: 35,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    slug: {
        minlength: 5,
        maxlength: 35,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    // theme: ["cozy", "business"],
    //
	description: {
		maxlength: 500,
		trim: true,
		type: String,
    },
    attributes: [{
        type: String,
        enum: ["schedule", "checklist"]  
    }],
	createdAt: {
		type: Date,
		default: new Date
    },
    dueTo: {
		type: Date,
		required: true
    },
    completed: {
        type: Boolean,
		default: false
    },
	author: {
        type: Types.ObjectId
    },
    goals: [{
        goalType: {
            type: String,
            enum: ["fixed", "shuffle"],
            required: true,
            default: "fixed"
        },
        identifier: {
            type: Schema.Types.ObjectId,
            ref: "Goal"
        },
        className: [{
            type: String
        }]
    }]
})


PlanSchema.statics.findWholePlanById = async function (planId: string): Promise<IPlan>{

	return this.findOneById(planId).then((plan: IPlanDocument) => {
        if (!plan) {
            return Promise.reject(new Error("Invalid plan _id"))
        }
        return plan.populate({
            path: 'goals'
        });
    });
};
