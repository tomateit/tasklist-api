import { Schema, HookNextFunction, Types } from "mongoose";
import slugify from "slugify";
import { StepSchema } from "./step";
// tslint:disable:object-literal-sort-keys
export const GoalSchema: Schema = new Schema({
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
		type: String,
		unique: true,
    },
	class: {
		type: String,
		minlength: 5,
		maxlength: 35,
	},
	goalType: {
		enum: ["recurring", "single"]
	},
	description: {
		maxlength: 500,
		trim: true,
		type: String,
	},
	createdAt: {
		type: Date,
		default: new Date
    },
    dueTo: {
		type: Date,
		required: true
	},
	steps: [{
		type: StepSchema
	}],
	completed: {
		type: Boolean,
		default: false
	}
})

GoalSchema.pre("save", function(next: HookNextFunction) {
	const Goal: any = this;
	Goal.slug = slugify(Goal.name);
	next()
})
