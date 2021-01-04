import { mongodbConnect } from "./mongodb";

export async function dbConnect() {
    await mongodbConnect();
}
// this.model.user = connection.model<IUserModel>("User", UserSchema);