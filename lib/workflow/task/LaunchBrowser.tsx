import { TaskParamType, TaskType } from "@/types/task";
import { GlobeIcon, LucideIcon } from "lucide-react";

export const LaunchBrowserTask ={
    type: TaskType.LAUNCH_BROWSER,
    label:"Launch browser",
    icon : (props: LucideIcon) => (
        <GlobeIcon className="stroke-pink-400" {...props} />
    ),
    isEntryPoint: true,
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
}