import { Page } from "puppeteer";

const scrollToBottom = async (page: Page): Promise<any> => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve(null);
                }
            }, 100);
        });
    });
}

export default scrollToBottom;

export const scrollToHeader = async (page: Page) => {
    await page.evaluate(async () => {
        window.scrollTo(0, 0);
    });
}
