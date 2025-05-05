
import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { WorkFlowTask } from "@/types/workflow";
import { ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";


type ExecutionFn<T extends WorkFlowTask> = (environment:ExecutionEnvironment<T>) => Promise<boolean>;

type RegistryType = {
    [k in TaskType]:ExecutionFn<WorkFlowTask & { type: k }> 
}
export const ExecutorRegistry : RegistryType = {
    LAUNCH_BROWSER : LaunchBrowserExecutor,
    PAGE_TO_HTML : PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT : ExtractTextFromElementExecutor,
}
