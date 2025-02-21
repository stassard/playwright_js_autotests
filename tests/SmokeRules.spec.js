import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from "../pages/BasePage";
import {RulesPage} from "../pages/RulesPage";


test.describe("Smoke Suite for Rules Page", () => {

    test('Create Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await rulesPage.create_element()
    });

    test('Read Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await rulesPage.read_element()
    });

    test('Update Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await rulesPage.update_element()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Delete Rule Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Rule Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete Rule Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await bp.delete_using_card()
    });

    // Need Seed
    test.skip('Select All Delete Rules', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await bp.select_all_delete()
    });

    test('Restore Rule Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});