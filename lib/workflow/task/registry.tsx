import { TaskType } from "@/types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromHtml";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { WorkFlowTask } from "@/types/workflow";

type Registry = {
    [K in TaskType]: WorkFlowTask & { type: K }
}
export const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHtmlTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
}

