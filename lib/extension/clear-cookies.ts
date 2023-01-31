import {Page} from "puppeteer";

const clearCookies = async (page: Page): Promise<boolean> => {
    try {
        await page.waitForTimeout(500);
        const client = await page.target().createCDPSession();
        await client.send("Network.clearBrowserCookies");
        await client.send("Storage.clearCookies");
        return true;
    } catch (e) {
        console.log("Error from clearCookie", e);
        return false
    }
}

export default clearCookies;
