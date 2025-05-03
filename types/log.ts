export const LogLevels = ["info","error","warning"] as const;
export type LogLevel =(typeof LogLevels)[number];


export type LogFunction = (message: string) => void
export type Log = {
    message: string;
    level:LogLevel;
    timestamp: Date;
}

export type LogColletor = {
    getAll(): Log[]
} & {
    [k in LogLevel]: LogFunction
}