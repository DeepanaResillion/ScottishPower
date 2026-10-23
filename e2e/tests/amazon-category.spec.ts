import { test, expect } from '../fixtures/page.fixtures';

test('should open the All Mobile Phones category after signing in', async ({
    amazonCategoryPage,
    amazonLoginPage,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'Run the live Amazon category flow only once in Chromium.');

    const env = (globalThis as typeof globalThis & {
        process?: { env?: Record<string, string | undefined> };
    }).process?.env;
    const mobileNumber = env?.MOBILENUMBER;
    const password = env?.PASSWORD;

    if (!mobileNumber || !password) {
        throw new Error('Set MOBILENUMBER and PASSWORD before running this test.');
    }

    await test.step('Open Amazon India', async () => {
        await amazonCategoryPage.navigate();
        await amazonCategoryPage.waitForReady();
    });

    await test.step('Open the sign-in page', async () => {
        await amazonLoginPage.openSignIn();
        await expect(amazonLoginPage.mobileNumberInput).toBeVisible();
    });

    await test.step('Enter the mobile number', async () => {
        await amazonLoginPage.mobileNumberInput.fill(mobileNumber);
    });

    await test.step('Continue to the password step', async () => {
        await amazonLoginPage.continueButton.click();
        await amazonLoginPage.waitForPasswordOrChallenge();
        await expect(amazonLoginPage.passwordInput).toBeVisible();
    });

    await test.step('Enter the password', async () => {
        await amazonLoginPage.passwordInput.fill(password);
    });

    await test.step('Submit the sign-in form', async () => {
        await amazonLoginPage.submitButton.click();
        await amazonLoginPage.waitForCustomerGreetingOrChallenge();
    });

    await test.step('Verify and print the signed-in customer name', async () => {
        const customerName = await amazonLoginPage.getCustomerName();
        expect(customerName).not.toBeNull();
        console.log(`Amazon customer name: ${customerName}`);
    });

    await test.step('Open the All Categories menu and select Mobiles, Computers', async () => {
        await amazonCategoryPage.openMobilesComputers();
    });

    await test.step('Open All Mobile Phones', async () => {
        await amazonCategoryPage.openAllMobilePhones();
        await expect(amazonCategoryPage.mobilePhonesPageHeading).toBeVisible();
    });
});
