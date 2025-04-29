import { waitFor } from "@/lib/helper/waitFor"
import { Environment, ExecutionEnvironment } from "@/types/executor"
import puppeteer from "puppeteer"
import { LaunchBrowserTask } from "../task/LaunchBrowser"

export async function LaunchBrowserExecutor(enviroment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
    try {
        const websiteUrl = enviroment.getInput("Website Url")
        console.log("Launching browser for url: ", websiteUrl)
        const browser = await puppeteer.launch({
            headless: false,
        })
        const page = await browser.newPage();

        await page.goto("https://www.google.com");
        await waitFor(3000);
        await browser.close();
        await browser.close()
        return true
    }
    catch (e) {
        console.error(e)
        return false
    }
}