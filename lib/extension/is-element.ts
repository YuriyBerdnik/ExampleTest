import { Page } from "puppeteer";

const exist = async (page: Page, selector: string, timeout = 5000): Promise<boolean> => {
    try {
        await page.waitForSelector(selector, { timeout })
        return true;
    } catch (error) {
        return false;
    }
}

const visible = async (page: Page, selector: string, timeout = 5000): Promise<boolean> => {
    try {
        await page.waitForSelector(selector, { timeout, visible: true })
        return true;
    } catch (error) {
        return false;
    }
}

const xpathExist = async (page: Page, xpath: string, timeout = 5000): Promise<boolean> => {
    try {
        await page.waitForXPath(xpath, { timeout })
        return true;
    } catch (error) {
        return false;
    }
}

const xpathVisible = async (page: Page, xpath: string, timeout = 5000): Promise<boolean> => {
    try {
        await page.waitForXPath(xpath, { timeout, visible: true })
        return true;
    } catch (error) {
        return false;
    }
}

export default {
    exist,
    visible,
    xpathExist,
    xpathVisible
}
