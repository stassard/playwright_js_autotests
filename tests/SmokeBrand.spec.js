import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from "../pages/BasePage";
import { BrandPage } from "../pages/BrandsPage";


test.describe("Smoke Suite for Brands Page", () => {

    // https://prospace-team.atlassian.net/browse/PSPR-3460
    test.skip('Create Brand', async ({page}) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        await lp.authorization();
        await brandPage.open_dict()
        await brandPage.create_element()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3460
    test.skip('Read Brand', async ({page}) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        await lp.authorization();
        await brandPage.open_dict()
        await brandPage.read_element()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3460
    test.skip('Update Brand', async ({page}) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        await lp.authorization();
        await brandPage.open_dict()
        await brandPage.update_element()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Delete Brand Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Brand Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete Brand Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_dict()
        await bp.delete_using_card()
    });

    // Need seed
    test.skip('Select All Delete Brand', async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_dict()
        await bp.select_all_delete()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Restore Brand Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });


});