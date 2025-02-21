import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from "../pages/BasePage";
import { BaselinesPage } from "../pages/BaselinesPage";


test.describe("Smoke Suite for Baselines Page", () => {
    test('Create Baseline', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await baselinesPage.create_element()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.skip('Read Baseline', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await baselinesPage.read_element()
    });

    test('Update Baseline', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await baselinesPage.update_element()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Delete Baseline Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Baseline Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete Baseline Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Baselines', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await bp.select_all_delete()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Restore Baseline Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});