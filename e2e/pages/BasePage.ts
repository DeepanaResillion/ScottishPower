import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async type(locator: Locator, text: string) {
        await locator.fill(text);
    }

    async getText(locator: Locator) {
        return await locator.textContent();
    }

    async isVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
}