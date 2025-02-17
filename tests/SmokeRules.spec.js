import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from "../pages/BasePage";
import {RulesPage} from "../pages/RulesPage";


test.describe("Smoke Suite for Rules Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    test('Create Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        await lp.authorization();
        await rulesPage.open_rules_dict()
        await rulesPage.create_rule()
    });

    test('Read Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        await lp.authorization();
        await rulesPage.open_rules_dict()
        await rulesPage.read_rule()
    });

    test('Update Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        await lp.authorization();
        await rulesPage.open_rules_dict()
        await rulesPage.update_rule()
    });

    // BUG: Confirmation window is not appeared
    test('Delete Rule Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_rules_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Rule Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_rules_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Rule Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_rules_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Rules', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_rules_dict()
        await bp.select_all_delete()
    });

    test('Restore Rule Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await rulesPage.open_rules_dict()
        await bp.restore_using_3_dots_grid()
    });
});