import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from "../../pages/BasePage";
import { BaselinesPage } from "../../pages/BaselinesPage";
import {DataGeneratorForSmoke} from "../../Fake_data_generator";


test.describe("Smoke Suite for Baselines Page", () => {
    test('Create Baseline', async ({page}) => {
        test.setTimeout(180_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await baselinesPage.create_element(bp.random_dropdown_element, bp.random_dropdown_element, fakeData.qty, fakeData.current_start_date, fakeData.random_end_date)
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
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await baselinesPage.update_element(fakeData.qty, fakeData.current_start_date, fakeData.random_end_date)
    });

    // BUG: Confirmation window is not appeared
    test('Delete Baseline Using 3 Dots Grid', async ({ page }) => {
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
    test("Delete Baseline Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await bp.delete_using_card()
    });

    test.skip('Select All Delete Baselines', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await bp.select_all_delete()
    });

    // BUG: Confirmation window is not appeared
    test('Restore Baseline Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baselinesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});