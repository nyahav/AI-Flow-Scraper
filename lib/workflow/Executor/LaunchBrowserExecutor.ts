import { waitFor } from "@/lib/helper/waitFor"
import puppeteer from "puppeteer"

export async function LaunchBrowserExecutor() :Promise<boolean>{
   try{
        const browser = await puppeteer.launch({
            headless: false,
   })
   await waitFor(3000)
   await browser.close()
   return true
}
   catch(e){
       console.error(e)
       return false
   }
}