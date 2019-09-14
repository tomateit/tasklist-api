"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
    },
    password: {
        type: String,
        requred: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
});
userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    let { email, username } = userObject;
    return ({ email, username });
};
//# sourceMappingURL=userSchema.js.map