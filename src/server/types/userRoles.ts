import { UserAction } from "./userActions";
type UserRoleName = "Anonymous" | "User" | "Administrator";

export interface IUserRole {
    name: UserRoleName,
    canDo: [UserAction],
}



