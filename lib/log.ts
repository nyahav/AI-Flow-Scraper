import { Log, LogColletor, LogFunction, LogLevel, LogLevels } from "@/types/log";
import { log } from "console";

export function createLogCollector() :LogColletor {

    const logs: Log[] = []
    const getAll = () => logs

    const logFunctions ={ } as Record<LogLevel,LogFunction>
    LogLevels.forEach((level) => logFunctions[level] = (message: string) => {
        logs.push({ level: level, message: message, timestamp : new Date() })
    })
    return {
        getAll,
        ...logFunctions,
    }
}