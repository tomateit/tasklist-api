 
interface IActivityItem {
    activity: string
    importance: number
}

export interface IZoneObject {
    name: string,
    author: string,
    items: IActivityItem[]
}