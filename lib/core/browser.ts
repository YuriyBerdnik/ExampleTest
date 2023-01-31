import puppeteer, {Browser, Page} from "puppeteer";

interface browserResponse {
    browser: Browser;
    page: Page;
}

const browser = async (): Promise<browserResponse> => {
    const browser = await puppeteer.launch({
        headless: process.env.NODE_ENV === "production",
        args: ["--start-maximized"],
        defaultViewport: null
    });
    const page = await browser.newPage();

    return {
        browser,
        page
    }
}

export default browser;
