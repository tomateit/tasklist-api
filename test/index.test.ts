import jest = require("jest");
import path = require("path");
import dotenv = require("dotenv");
import mongoose = require("mongoose");
import { IUser } from "../src/server/interfaces/user";
import { IUserModel } from "../src/server/models/user";
import { UserSchema } from "../src/server/schemas/user";

dotenv.config();
const connection: mongoose.Connection = mongoose.createConnection(
  String(process.env.TEST_MONGODB_URI),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const User: mongoose.Model<IUserModel> = connection.model<IUserModel>(
  "User",
  UserSchema
);

describe("My work", () => {
  test("works", () => {
    expect(2).toEqual(2);
  });
});

const myBool: boolean = true;
expect(myBool).not.toBe(false);
//   .toEqual(true)
//   .toBeTruthy()

describe("User", () => {
  it("Should create a new User", async () => {
    const user: IUser = {
      email: "adfu@hfjh.dk",
      username: "USERTEST",
      password: "pwdpwdpwd"
    };

    const result = await new User(user).save();

    expect(result).toHaveProperty("_id");
    expect(result.email).toMatch("adfu@hfjh.dk");
    expect(result.username).toMatch("USERTEST");
    expect(result).toHaveProperty("password");
    expect(result.password).not.toMatch("pwdpwdpwd");
  });
});
