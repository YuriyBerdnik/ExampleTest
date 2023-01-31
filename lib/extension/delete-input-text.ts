import { Page } from "puppeteer";

const deleteInputText = async (page: Page, selector: string) => {
    try {
        const field = await page.waitForSelector(selector, { visible: true, timeout: 5000 });
        await page.waitForTimeout(300);
        await field.click();
        await page.waitForTimeout(200);
        await page.keyboard.down("Control");
        await page.keyboard.press("A");
        await page.keyboard.up("Control");
        await page.keyboard.press("Delete");
        return true;
    } catch (e) {
        console.log("Error from deleteInputText", e);
        return false;
    }
}

export default deleteInputText;
