import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for Amazon India's sign-in flow. */
export class AmazonLoginPage extends BasePage {
    /** Account link shown in the Amazon header. */
    readonly accountLink: Locator;
    /** Sign-in link shown in the account menu after hovering over the header link. */
    readonly signInMenuLink: Locator;
    /** Mobile number or email field on the sign-in page. */
    readonly mobileNumberInput: Locator;
    /** Continue button on the identifier step. */
    readonly continueButton: Locator;
    /** Password field shown after the identifier is accepted. */
    readonly passwordInput: Locator;
    /** Sign-in button shown on the password step. */
    readonly submitButton: Locator;
    private readonly securityChallengeMessage: Locator;

    /** Creates locators for the supplied browser page. */
    constructor(page: Page) {
        super(page);
        this.accountLink = this.page.getByRole('link', { name: /Hello,/i });
        this.signInMenuLink = this.page.getByRole('link', { name: 'Sign in', exact: true }).last();
        this.mobileNumberInput = this.page.getByRole('textbox', { name: 'Enter mobile number or email' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.submitButton = this.page.getByRole('button', { name: 'Sign in' });
        this.securityChallengeMessage = this.page.getByText(
            /captcha|robot check|security check|solve.*puzzle/i,
        ).first();
    }

    /** Opens Amazon India. */
    async navigate(): Promise<void> {
        await super.navigate('/');
    }

    /** Waits until the account link is available in the page header. */
    async waitForReady(): Promise<void> {
        await this.accountLink.waitFor({ state: 'visible' });
    }

    /** Opens the sign-in page from the account menu link. */
    async openSignIn(): Promise<void> {
        await this.accountLink.hover();
        await this.signInMenuLink.waitFor({ state: 'visible' });
        await this.signInMenuLink.click();
        await this.mobileNumberInput.waitFor({ state: 'visible' });
    }

    /** Waits for either the password step or an Amazon security challenge. */
    async waitForPasswordOrChallenge(): Promise<void> {
        await expect.poll(async () =>
            (await this.passwordInput.isVisible()) || (await this.isSecurityChallengeVisible()),
        ).toBe(true);
        await this.throwIfSecurityChallenge();
    }

    /** Waits until a signed-in greeting or an Amazon security challenge appears. */
    async waitForCustomerGreetingOrChallenge(): Promise<void> {
        await expect.poll(async () =>
            (await this.getCustomerName()) !== null || (await this.isSecurityChallengeVisible()),
        ).toBe(true);
        await this.throwIfSecurityChallenge();
    }

    /** Returns the customer name from the header greeting, or null before sign-in. */
    async getCustomerName(): Promise<string | null> {
        if (!(await this.accountLink.isVisible())) {
            return null;
        }

        const linkText = await this.accountLink.innerText();
        const greeting = linkText
            .replace(/\s*Account\s*&\s*Lists.*$/i, '')
            .match(/Hello,\s*(.+)$/i)?.[1]
            .trim();

        if (!greeting || greeting.toLowerCase() === 'sign in') {
            return null;
        }

        return greeting;
    }

    private async isSecurityChallengeVisible(): Promise<boolean> {
        return this.page.url().toLowerCase().includes('captcha')
            || await this.securityChallengeMessage.isVisible();
    }

    private async throwIfSecurityChallenge(): Promise<void> {
        if (await this.isSecurityChallengeVisible()) {
            throw new Error(
                'Amazon presented a CAPTCHA or security puzzle. Resolve it manually, then rerun the test; this test will not solve security challenges.',
            );
        }
    }
}
