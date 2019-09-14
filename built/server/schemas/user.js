"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecretEnv = process.env.JWT_SECRET;
const jwtSecret = String(jwtSecretEnv);
// tslint:disable:object-literal-sort-keys
exports.UserSchema = new mongoose_1.Schema({
    username: {
        minlength: 5,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    email: {
        minlength: 5,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    password: {
        minlength: 6,
        requred: true,
        type: String,
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
exports.UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    const { email, username } = userObject;
    return ({ email, username });
};
exports.UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id.toHexString(), access }, jwtSecret).toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token;
    });
};
exports.UserSchema.methods.removeToken = function (token) {
    const user = this;
    return user.update({
        $pull: {
            tokens: { token }
        }
    });
};
exports.UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    //! WTF????
    try {
        decoded = jwt.verify(token, jwtSecret);
        console.log(JSON.stringify(decoded));
    }
    catch (e) {
        console.log('USER JWT ERRER');
        return Promise.reject(e);
    }
    return User.findOne({
        "_id": decoded._id,
        "tokens.access": "auth",
        "tokens.token": token,
    });
};
exports.UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error("Generating salt failed", err);
                return next(err);
            }
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) {
                    console.error("Hashing failed: ", error);
                    return next(error);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
//# sourceMappingURL=user.js.map