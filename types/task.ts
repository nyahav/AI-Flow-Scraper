export enum TaskType{
    LAUNCH_BROWSER = "LAUNCH_BROWSER"
}

export enum TaskParamType{
    STRING ="STRING"
}

export interface TaskParams{
    name: string;
    type: TaskParamType;
    helperText?: string;
    required?:boolean;
    hideHandle?:boolean;
    value?:string;
    [key:string]:any
}