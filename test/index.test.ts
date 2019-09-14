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
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const User: mongoose.Model<IUserModel> = connection.model<IUserModel>(
  "User",
  UserSchema
);

// beforeAll(async () => {
//   return ;
// })

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
  const email = "adfu2@hfjh.dk";
  const password = "pwdpwdpwd";
  const username = "USERNAME_TEST";

  it("Should create a new User", async () => {
    const user: IUser = {
      email,
      password,
      username
    };

    const result = await new User(user).save();

    expect(result).toHaveProperty("_id");
    expect(result).toHaveProperty("email", email);
    expect(result).toHaveProperty("username", username);
    expect(result).toHaveProperty("password");
    expect(result).toHaveProperty("createdAt");
    expect(result.password).not.toMatch(password);
  });

  const updatedEmail = "tested2@updatedmail.com";

  it("Should update the User", async () => {
    const RetrievedUser = await User.findOneAndUpdate(
      { email },
      { $set: { email: updatedEmail } },
      { new: true }
    );
    expect(RetrievedUser).toHaveProperty("_id");
    expect(RetrievedUser).toHaveProperty("email", updatedEmail);
  });

  afterAll(async () => {
    await User.deleteMany({});
  });
});

afterAll(async () => {
  await connection.close();
});
