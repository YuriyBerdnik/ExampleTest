import { test, testResult } from "@lib/core/test";
import { clearCookies, deleteInputText, isElement } from "@lib/extension/index";
import { ResultCreateStatusEnum, ResultCreateStepsStatusEnum } from "qaseio/dist/src";
import { EnumProject } from "@lib/core/enums";
import testConfig from "@lib/config/test";
import { checkErrorMessage, checkFooterNameAndLinkButton, clickButtonName, enterNumber, factorial, generateRandomNumber } from "@lib/scenario/example";

test({ id: 1, name: "Test example", project: EnumProject.TEST }, async ({ runId, page }) => {

    let step_1;
    let step_2;
    let step_3;
    let step_4;
    let step_5;
    let step_6;
    let step_7;
    let step_8;
    let step_9;
    let step_10;
    let step_11;

    try {
        await clearCookies(page);
        await page.goto(testConfig.DOMAIN, { waitUntil: "domcontentloaded" });

        const currentUrl = await page.url();
        const expectedUrl = testConfig.DOMAIN;
        step_1 = { position: 1, status: currentUrl === expectedUrl ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        const ExpectedNameContent = "The greatest factorial calculator!";
        const checkCalculatorNameConten = await isElement.xpathVisible(page, `//\*[@class="margin-base-vertical text-center"][contains(text(),"${ExpectedNameContent}")]`);
        step_2 = { position: 2, status: checkCalculatorNameConten ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        const expectedPlaceholder = "Enter an integer";
        const checkInputFieldWithPlaceholder = await isElement.xpathVisible(page, `//input[@id="number"][@placeholder="${expectedPlaceholder}"]`);
        step_3 = { position: 3, status: checkInputFieldWithPlaceholder ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        const expectedTextButton = "Calculate!";
        const buttonElement = await page.waitForSelector("#getFactorial", { visible: true, timeout: 2000 });
        const buttonValue = await buttonElement.evaluate(el => el.textContent);
        step_4 = { position: 4, status: buttonValue === expectedTextButton ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        const firstExpectedButtonName = "Terms and Conditions";
        const firstExpectedAddressName = "/terms";
        const secondExpectedButtonName = "Privacy";
        const secondExpectedAddressName = "/privacy";
        const thirdExpectedButtonName = "Qxf2 Services";
        const thirdExpectedAddressName = "https://www.qxf2.com/?utm_source=qa-interview&utm_medium=click&utm_campaign=From%20QA%20Interview";
        const checkFirstExpectedButtonName = await checkFooterNameAndLinkButton(page, firstExpectedButtonName, firstExpectedAddressName);
        const checkSecondExpectedButtonName = await checkFooterNameAndLinkButton(page, secondExpectedButtonName, secondExpectedAddressName);
        const checkThirdExpectedButtonName = await checkFooterNameAndLinkButton(page, thirdExpectedButtonName, thirdExpectedAddressName);
        step_5 = { position: 5, status: checkFirstExpectedButtonName ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };
        step_6 = { position: 6, status: checkSecondExpectedButtonName ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };
        step_7 = { position: 7, status: checkThirdExpectedButtonName ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        const expectedMessage = "Please enter an integer";
        await clickButtonName(page, "Calculate!");
        const checkMessage = await checkErrorMessage(page, expectedMessage);
        step_8 = { position: 8, status: checkMessage ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        const checkErrorMessageColor = await isElement.xpathVisible(page, "//\*[@id=\"resultDiv\"][@style=\"color: rgb(255, 0, 0);\"]");
        const checkFrameColor = await isElement.xpathVisible(page, "//\*[@id=\"number\"][@style=\"border: 2px solid red;\"]");
        step_9 = { position: 9, status: checkErrorMessageColor && checkFrameColor ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        const randomNumber = await generateRandomNumber();
        const expectedResultForCalculate = await factorial(randomNumber);
        await enterNumber(page, randomNumber.toString());
        await clickButtonName(page, "Calculate!");
        const checkResult = await isElement.xpathVisible(page, `//\*[@id="resultDiv"][contains(text(),"The factorial of ${randomNumber.toString()} is: ${expectedResultForCalculate.toString()}")]`);
        step_10 = { position: 10, status: checkResult ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        await deleteInputText(page, "#number");
        await enterNumber(page, randomNumber.toString() + ",0");
        await clickButtonName(page, "Calculate!");
        const checkMessageForDouble = await checkErrorMessage(page, expectedMessage);
        step_11 = { position: 11, status: checkMessageForDouble ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED };

        await testResult({
            project: EnumProject.TEST,
            testId: 1,
            message: checkCalculatorNameConten && checkInputFieldWithPlaceholder && buttonValue === expectedTextButton && checkResult ? ResultCreateStatusEnum.PASSED : "Expected: Test example pass, but failed",
            status: checkCalculatorNameConten && checkInputFieldWithPlaceholder && buttonValue === expectedTextButton && checkResult ? ResultCreateStatusEnum.PASSED : ResultCreateStatusEnum.FAILED,
            runId,
            steps: [
                step_1,
                step_2,
                step_3,
                step_4,
                step_5,
                step_6,
                step_7,
                step_8,
                step_9,
                step_10,
                step_11
            ]
        })
    } catch (e) {
        await testResult({
            project: EnumProject.TEST,
            testId: 1,
            message: JSON.stringify(e.message),
            status: ResultCreateStatusEnum.FAILED,
            runId,
            steps: [
                step_1,
                step_2,
                step_3,
                step_4,
                step_5,
                step_6,
                step_7,
                step_8,
                step_9,
                step_10,
                step_11
            ]
        })
    }
});
