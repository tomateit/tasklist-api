"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;
const UserSchema = new mongoose_1.Schema({
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
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    const { email, username } = userObject;
    return ({ email, username });
};
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jsonwebtoken_1.default.sign({ _id: user._id.toHexString(), access }, jwtSecret).toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token;
    });
};
UserSchema.methods.removeToken = function (token) {
    let user = this;
    return user.update({
        $pull: {
            tokens: { token }
        }
    });
};
UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;
    //! WTF????
    try {
        decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log(JSON.stringify(decoded));
    }
    catch (e) {
        console.log('USER JWT ERRER');
        return Promise.reject();
    }
    return User.findOne({
        "_id": decoded._id,
        "tokens.access": "auth",
        "tokens.token": token,
    });
};
UserSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt_1.default.genSalt(10, (err, salt) => {
            bcrypt_1.default.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
//# sourceMappingURL=userSchema.js.map