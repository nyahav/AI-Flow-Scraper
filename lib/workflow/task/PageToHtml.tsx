import { TaskParamType, TaskType } from "@/types/task";
import { WorkFlowTask } from "@/types/workflow";
import { CodeIcon,  LucideIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask ={
    type: TaskType.PAGE_TO_HTML,
    label:"Get HTML from page",
    icon: (props: LucideProps) => <CodeIcon className="stroke-rose-400" {...props} />,
    isEntryPoint: false,
    credits: 2,
    inputs:[{
        name:"Web page",
        type: TaskParamType.BROWSER_INSTANCE,
        required : true,
    }] as const,
    outputs :[
        {
            name: "Html",
            type: TaskParamType.STRING
        },
        {
            name :"Web page",
            type: TaskParamType.BROWSER_INSTANCE
        }
    ] as const,
} satisfies WorkFlowTask