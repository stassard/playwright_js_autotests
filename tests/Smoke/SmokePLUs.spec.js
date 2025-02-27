import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { PLUsPage } from "../../pages/PLUsPage";
import { BasePage } from "../../pages/BasePage";
import {DataGeneratorForSmoke} from "../../Fake_data_generator";


test.describe("Smoke Suite for PLUs Page", () => {
    test.beforeEach('Create PLU', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await plusPage.open_dict()
        await plusPage.create_element(bp.random_dropdown_element, bp.random_dropdown_element, fakeData.plu)
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3829
    test('Create PLU', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        // await lp.authorization();
        // await plusPage.open_dict()
        await plusPage.create_element(bp.random_dropdown_element, bp.random_dropdown_element, fakeData.plu)
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3829
    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.skip('Read PLU', async ({page}) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        // await lp.authorization();
        // await plusPage.open_dict()
        await plusPage.read_element()
    });

    test('Update PLU', async ({page}) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        // await lp.authorization();
        // await plusPage.open_dict()
        await plusPage.update_element(fakeData.plu)
    });

    // Confirmation window is not appeared
    test('Delete PLU Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await plusPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
    test.fail('Delete PLU Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await plusPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test("Delete PLU Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await plusPage.open_dict()
        await bp.delete_using_card()
    });

    // Need seed
    test.skip('Select All Delete PLUs', async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await plusPage.open_dict()
        await bp.select_all_delete()
    });

    // BUG: Confirmation window is not appeared
    test('Restore PLU Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await plusPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});