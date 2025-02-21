import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from "../pages/BasePage";
import { TechnologiesPage } from "../pages/TechnologiesPage";


test.describe("Smoke Suite for Technologies Page", () => {

    test('Create Technology', async ({page}) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await technologiesPage.create_element()
    });

    test('Read Technology', async ({page}) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await technologiesPage.read_element()
    });

    test('Update Technology', async ({page}) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await technologiesPage.update_element()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Delete Technology Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Technology Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete Technology Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await bp.delete_using_card()
    });

    // Need seed
    test.skip('Select All Delete Technologies', async ({ page }) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await bp.select_all_delete()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Restore Technology Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });


});