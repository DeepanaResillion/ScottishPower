import { test as base } from '@playwright/test';
import { AmazonCategoryPage } from '../pages/AmazonCategoryPage';
import { AmazonLoginPage } from '../pages/AmazonLoginPage';
import { LoginPage } from '../pages/LoginPage';

export interface PageFixtures {
    amazonCategoryPage: AmazonCategoryPage;
    amazonLoginPage: AmazonLoginPage;
    loginPage: LoginPage;
}

export const test = base.extend<PageFixtures>({
    amazonCategoryPage: async ({ page }, use) => {
        await use(new AmazonCategoryPage(page));
    },
    amazonLoginPage: async ({ page }, use) => {
        await use(new AmazonLoginPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export { expect } from '@playwright/test';