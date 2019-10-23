import { Schema, HookNextFunction, Types } from "mongoose";
import slugify from "slugify";
// tslint:disable:object-literal-sort-keys
export const StepSchema: Schema = new Schema({
    name: {
		minlength: 5,
		maxlength: 35,
		required: true,
		trim: true,
		type: String,
		unique: true,
    },
    slug: {
		type: String,
		unique: true,
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
    },
    completed: {
        type: Boolean,
        default: false
    }
})

StepSchema.pre("save", function(next: HookNextFunction) {
	const Step: any = this;
	Step.slug = slugify(Step.name);
	next()
})