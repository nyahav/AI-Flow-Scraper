
import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";


type RegistryType = {
    [k in TaskType]:any
}
export const ExecutorRegistry : RegistryType = {
    LAUNCH_BROWSER : LaunchBrowserExecutor,
    PAGE_TO_HTML : PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT : () => Promise.resolve(true),
}
