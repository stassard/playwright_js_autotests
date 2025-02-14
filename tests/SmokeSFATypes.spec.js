import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SFATypesPage } from "../pages/SFATypesPage";
import { BasePage } from "../pages/BasePage";


test.describe("Smoke Suite for SFA Types Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    test('Create SFA Type', async ({page}) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        await lp.authorization();
        await sfaTypesPage.open_sfa_types_dict()
        await sfaTypesPage.create_sfa_type()
    });

    test('Read SFA Type', async ({page}) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        await lp.authorization();
        await sfaTypesPage.open_sfa_types_dict()
        await sfaTypesPage.read_sfa_type()
    });

    test('Update SFA Type', async ({page}) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        await lp.authorization();
        await sfaTypesPage.open_sfa_types_dict()
        await sfaTypesPage.update_sfa_type()
    });

    test('Delete SFA Type Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_sfa_types_dict()
        await bp.delete_using_3_dots_grid()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
    test.skip('Delete SFA Type Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_sfa_types_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete SFA Type Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_sfa_types_dict()
        await bp.delete_using_card()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
    // Small amount of data
    test.skip('Select All Delete SFA Types', async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_sfa_types_dict()
        await bp.select_all_delete()
    });

    test.skip('Restore SFA Type Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const sfaTypesPage = new SFATypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await sfaTypesPage.open_sfa_types_dict()
        await bp.restore_using_3_dots_grid()
    });
});