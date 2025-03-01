import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from "../../pages/BasePage";
import {RolesPage} from "../../pages/RolesPage";
import {DataGeneratorForSmoke} from "../../Fake_data_generator";


test.describe("Smoke Suite for Roles Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    // All deletion operation is off because of superadmin role deletion possibility
    test('Create Role', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const rolesPage = new RolesPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await rolesPage.open_dict()
        await rolesPage.create_element(fakeData.role_name, fakeData.description)
    });

    test.skip('Read Role', async ({page}) => {
        const lp = new LoginPage(page);
        const rolesPage = new RolesPage(page)
        await lp.authorization();
        await rolesPage.open_dict()
        await rolesPage.read_element()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3884
    test('Update Role', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const rolesPage = new RolesPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await rolesPage.open_dict()
        await rolesPage.update_element(fakeData.role_name, fakeData.description)
    });

    // BUG: Confirmation window is not appeared
    test('Delete Role Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rolesPage = new RolesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rolesPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3435
    test('Delete Role Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rolesPage = new RolesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rolesPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Role Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const rolesPage = new RolesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rolesPage.open_dict()
        await bp.delete_using_card()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3888
    test.skip('Select All Delete Roles', async ({ page }) => {
        const lp = new LoginPage(page);
        const rolesPage = new RolesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rolesPage.open_dict()
        await bp.select_all_delete()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3435
    test('Restore Role Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rolesPage = new RolesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rolesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});