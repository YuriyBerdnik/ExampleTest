import { Page } from "puppeteer";
import { isElement } from "@lib/extension/index";

export const enterNumber = async (page: Page, number: string) => {
    try {
        const numberInput = await page.waitForSelector("#number", { visible: true, timeout: 2000 });
        await numberInput.type(number, { delay: 15 });
        return true;
    } catch (e) {
        console.log("Error from enterNumber", e);
        return false;
    }
}

export const factorial = async (number: number) => {
    try {
        let result = 1;
        while (number) {
            result *= number--;
        }
        return result;
    } catch (e) {
        console.log("Error from factorial", e);
    }
}

export const generateRandomNumber = async () => {
    try {
        const result = Math.random() * (20 - 1) + 1
        return Math.floor(result)
    } catch (e) {
        console.log("Error from generateRandomNumber", e);
    }
}

export const checkErrorMessage = async (page: Page, expectedMessage: string) => {
    try {
        const element = await page.waitForXPath("//\*[@id=\"resultDiv\"]", { visible: true, timeout: 2000 });
        const value = await element.evaluate(el => el.textContent);
        return value === expectedMessage;
    } catch (e) {
        console.log("Error from checkErrorMessage", e);
        return false;
    }
}

export const clickButtonName = async (page: Page, buttonName: string) => {
    try {
        const buttonElement = await page.waitForXPath(`//button[contains(text(),\"${buttonName}\")]`, { visible: true, timeout: 3000 });
        await buttonElement.click();
        await page.waitForTimeout(500);
        return true;
    } catch (e) {
        console.log(`Button [${buttonName}] not found`, e);
        return false;
    }
}

export const checkFooterNameAndLinkButton = async (page: Page, expectedName: string, expectedLink: string) => {
    try {
        return await isElement.xpathVisible(page, `//\*[@class="row-fluid"]//\*[@href="${expectedLink}"][contains(text(),"${expectedName}")]`, 500);
    } catch (e) {
        console.log("Error from checkFooterNameButton", e);
        return false;
    }
}
