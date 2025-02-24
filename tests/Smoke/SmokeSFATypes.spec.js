import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { SFATypesPage } from "../../pages/SFATypesPage";
import { BasePage } from "../../pages/BasePage";


test.describe("Smoke Suite for SFA Types Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    test('Create SFA Type', async ({page}) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        await lp.authorization();
        await sfaTypesPage.open_dict()
        await sfaTypesPage.create_element()
    });

    test('Read SFA Type', async ({page}) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        await lp.authorization();
        await sfaTypesPage.open_dict()
        await sfaTypesPage.read_element()
    });

    test('Update SFA Type', async ({page}) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        await lp.authorization();
        await sfaTypesPage.open_dict()
        await sfaTypesPage.update_element()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Delete SFA Type Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
    test.skip('Delete SFA Type Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete SFA Type Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_dict()
        await bp.delete_using_card()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
    // Need Seed
    test.skip('Select All Delete SFA Types', async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_dict()
        await bp.select_all_delete()
    });

    // BUG: Confirmation window is not appeared
    test.skip(' Restore SFA Type Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});