import { TaskParamType, TaskType } from "@/types/task";
import { CodeIcon,  LucideIcon } from "lucide-react";

export const PageToHtmlTask ={
    type: TaskType.PAGE_TO_HTML,
    label:"Get HTML from page",
    icon : (props: LucideIcon) => (
        <CodeIcon className="stroke-rose-400" {...props} />
    ),
    isEntryPoint: false,
    inputs:[{
        name:"Web page",
        type: TaskParamType.BROWSER_INSTANCE,
        required : true,
    }],
    outputs :[
        {
            name: "Html",
            type: TaskParamType.STRING
        },
        {
            name :"Web page",
            task: TaskParamType.BROWSER_INSTANCE
        }
    ]
}