import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PLUsPage } from "../pages/PLUsPage";
import { BasePage } from "../pages/BasePage";


test.describe("Smoke Suite for PLUs Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    test('Create PLU', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        await lp.authorization();
        await plusPage.open_plus_dict()
        await plusPage.create_plu()
    });

    test('Read PLU', async ({page}) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        await lp.authorization();
        await plusPage.open_plus_dict()
        await plusPage.read_plu()
    });

    test('Update PLU', async ({page}) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        await lp.authorization();
        await plusPage.open_plus_dict()
        await plusPage.update_plu()
    });

    test('Delete PLU Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await plusPage.open_plus_dict()
        await bp.delete_using_3_dots_grid()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
    test.skip('Delete PLU Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await plusPage.open_plus_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete PLU Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await plusPage.open_plus_dict()
        await bp.delete_using_card()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
    // Small amount of data
    test.skip('Select All Delete PLUs', async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await plusPage.open_plus_dict()
        await bp.select_all_delete()
    });

    test.skip('Restore Event Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const plusPage = new PLUsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await plusPage.open_plus_dict()
        await bp.restore_using_3_dots_grid()
    });
});