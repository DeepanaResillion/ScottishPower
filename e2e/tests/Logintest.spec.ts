import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login Test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate('https://test.com');

    await loginPage.login('admin', 'password');

});