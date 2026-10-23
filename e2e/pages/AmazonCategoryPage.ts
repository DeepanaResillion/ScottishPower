import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for Amazon India's category navigation. */
export class AmazonCategoryPage extends BasePage {
    /** Opens the full categories menu. */
    readonly allCategoriesButton: Locator;
    /** Opens the Mobiles, Computers category submenu. */
    readonly mobilesComputersButton: Locator;
    /** All Mobile Phones link; Amazon renders duplicate submenu panels during transitions. */
    readonly allMobilePhonesLink: Locator;
    /** Heading on the All Mobile Phones destination page. */
    readonly mobilePhonesPageHeading: Locator;
    private readonly digitalContentAndDevicesRegion: Locator;
    /** Fire TV category under Digital Content and Devices. */
    readonly fireTvButton: Locator;
    /** Amazon Prime Video item in the Digital Content and Devices menu. */
    readonly amazonPrimeVideoButton: Locator;

    /** Creates category navigation locators for the supplied browser page. */
    constructor(page: Page) {
        super(page);
        this.allCategoriesButton = this.page.getByRole('button', { name: 'Open All Categories Menu' });
        this.mobilesComputersButton = this.page.getByRole('button', { name: 'Mobiles, Computers', exact: true });
        this.allMobilePhonesLink = this.page.getByRole('link', { name: 'All Mobile Phones', exact: true }).last();
        this.mobilePhonesPageHeading = this.page.getByRole('heading', {
            name: 'Buy Mobile Phones Online at the Best Prices in India — Shop Smartphones on Amazon.in',
            level: 2,
        });
        this.digitalContentAndDevicesRegion = this.page.getByRole('region').filter({
            has: this.page.getByRole('heading', { name: 'Digital Content and Devices', exact: true }),
        });
        this.fireTvButton = this.digitalContentAndDevicesRegion.getByRole('button', {
            name: 'Fire TV',
            exact: true,
        });
        this.amazonPrimeVideoButton = this.digitalContentAndDevicesRegion.getByRole('button', {
            name: 'Amazon Prime Video',
            exact: true,
        });
    }

    /** Opens the configured application base URL. */
    async navigate(): Promise<void> {
        await super.navigate('/');
    }

    /** Waits until the Amazon header category menu control is available. */
    async waitForReady(): Promise<void> {
        await this.allCategoriesButton.waitFor({ state: 'visible' });
    }

    /** Opens the category menu and selects Mobiles, Computers. */
    async openMobilesComputers(): Promise<void> {
        await this.allCategoriesButton.click();
        await this.mobilesComputersButton.waitFor({ state: 'visible' });
        await this.mobilesComputersButton.scrollIntoViewIfNeeded();
        await this.mobilesComputersButton.click();
        await this.allMobilePhonesLink.waitFor({ state: 'visible' });
    }

    /** Opens All Mobile Phones and waits for the category page to load. */
    async openAllMobilePhones(): Promise<void> {
        await this.allMobilePhonesLink.scrollIntoViewIfNeeded();
        await this.allMobilePhonesLink.click();
        await this.mobilePhonesPageHeading.waitFor({ state: 'visible' });
    }

    /** Opens Fire TV, then Amazon Prime Video, from the category menu. */
    async openFireTvAmazonPrimeVideo(): Promise<void> {
        await this.allCategoriesButton.click();
        await this.digitalContentAndDevicesRegion.waitFor({ state: 'visible' });
        await this.fireTvButton.waitFor({ state: 'visible' });
        await this.fireTvButton.scrollIntoViewIfNeeded();
        await this.fireTvButton.click();
        await this.amazonPrimeVideoButton.waitFor({ state: 'visible' });
        await this.amazonPrimeVideoButton.scrollIntoViewIfNeeded();
        await this.amazonPrimeVideoButton.click();
        await this.page.waitForURL(/primevideo\.com/i);
    }
}
