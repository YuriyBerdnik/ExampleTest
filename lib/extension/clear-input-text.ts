import { Page } from "puppeteer";

const clearInputText = async (page: Page, selector: string) => {
    try {
        await page.waitForSelector(".react-tel-input > input", { visible: true });
        await page.waitForTimeout(300);
        await page.$eval(selector, (el) => (el as HTMLInputElement).value = "");
        await page.waitForTimeout(200);
        return true;
    } catch (e) {
        console.log("Error from clearInputText", e);
        return false;
    }
}

export default clearInputText;
