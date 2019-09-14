import { Schema, HookNextFunction, Types } from "mongoose";

// tslint:disable:object-literal-sort-keys
export const TodoSchema: Schema = new Schema({
    title: {
		minlength: 5,
		maxlength: 35,
		required: true,
		trim: true,
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
		required: true
	},
	author: {
        type: Types.ObjectId
    }
})
