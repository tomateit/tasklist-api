export interface IUserObject {
    username: string,
    password: string,
}

export enum UserAction {
    "getUser",
    "getAllUsers",
    "createUser",
    "updateUser",
    "deleteUser",

    "getActivity",
    "getAllActivities",
    "createActivity",
    "updateActivity",
    "deleteActivity",

    "getZone",
    "getAllZones",
    "createZone",
    "updateZone",
    "deleteZone",
}