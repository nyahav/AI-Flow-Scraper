import { intervalToDuration } from "date-fns"

export function DatesToDurationString(end:Date | null | undefined, start:Date | null | undefined) {
    if (!end || !start) {
        return null
    }
    const timeElapsed = end.getTime() - start.getTime()
    if (timeElapsed < 1000) {
        return `${timeElapsed}ms`
    }
    const duration =  intervalToDuration({start:0,end:timeElapsed})
    return ` ${duration.minutes || 0}m ${duration.seconds || 0}s`
}

// export function DatesToDurationString(end: Date | string | null | undefined, start: Date | string | null | undefined) {
//     if (!start) return null;
    
//     const startDate = typeof start === 'string' ? new Date(start) : start;
    
//     //  If end is missing, means execution still running => return null (or loader)
//     if (!end) {
//         return null;
//     }
    
//     const endDate = typeof end === 'string' ? new Date(end) : end;
//     const timeElapsed = endDate.getTime() - startDate.getTime();
    
//     if (timeElapsed < 1000) {
//         return `${timeElapsed}ms`;
//     }
    
//     const duration = intervalToDuration({start: 0, end: timeElapsed});
//     return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
// }
