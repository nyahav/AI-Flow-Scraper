import { Browser } from "puppeteer"
import { WorkFlowTask } from "./workflow";


export type Environment = {
    browser?: Browser;
    phases: Record<string, {
        inputs: Record<string, string>;
        outputs: Record<string, string>;
    }>;
}

export type ExecutionEnvironment<T extends WorkFlowTask> = {
    getInput(name: T["inputs"][number]["name"]): string ;
    getBrowser(): Browser | undefined;
    setBrowser(browser: Browser): void;
}