import { TaskParamType, TaskType } from "@/types/task";
import { WorkFlowTask } from "@/types/workflow";
import { GlobeIcon, LucideIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask ={
    type: TaskType.LAUNCH_BROWSER,
    label:"Launch browser",
    icon: (props: LucideProps) => <GlobeIcon className="stroke-rose-400" {...props} />,
    isEntryPoint: true,
    credits :5, 
    inputs:[{
        name:"Website Url",
        type: TaskParamType.STRING,
        //type: "STRING",
        helperText: "eg: https://www.google.com",
        required : true,
        hideHandle: true,
    }],
    outputs :[
        {name : "Web page",type :TaskParamType.BROWSER_INSTANCE}
    ],
} satisfies WorkFlowTask