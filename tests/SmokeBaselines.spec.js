import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from "../pages/BasePage";
import { BaselinesPage } from "../pages/BaselinesPage";


test.describe("Smoke Suite for Baselines Page", () => {
    test('Create Baseline', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await baselinesPage.create_baseline()
    });

    test('Read Baseline', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await baselinesPage.read_baseline()
    });

    test('Update Baseline', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await baselinesPage.update_baseline()
    });

    // BUG: Confirmation window is not appeared
    test('Delete Baseline Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Baseline Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Baseline Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Baselines', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await bp.select_all_delete()
    });

    test('Restore Baseline Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await bp.restore_using_3_dots_grid()
    });
});