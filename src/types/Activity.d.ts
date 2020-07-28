export interface IActivityObject {
    name: string,
    author: string,
    // description:
    complete: boolean,
    zones: string[],
    blocked: string[],
    parent: string[]| null,
    children: string[]| null,
} 