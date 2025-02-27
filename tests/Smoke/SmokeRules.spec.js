import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from "../../pages/BasePage";
import {RulesPage} from "../../pages/RulesPage";
import {DataGeneratorForSmoke} from "../../Fake_data_generator";


test.describe("Smoke Suite for Rules Page", () => {
    test.beforeEach('Create Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await rulesPage.open_dict()
        await rulesPage.create_element(fakeData.rule_name, fakeData.value)
    });

    test('Create Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        // await lp.authorization();
        // await rulesPage.open_dict()
        await rulesPage.create_element(fakeData.rule_name, fakeData.value)
    });

    test.skip('Read Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        // await lp.authorization();
        // await rulesPage.open_dict()
        await rulesPage.read_element()
    });

    test('Update Rule', async ({page}) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        // await lp.authorization();
        // await rulesPage.open_dict()
        await rulesPage.update_element(fakeData.rule_name, fakeData.value)
    });

    // BUG: Confirmation window is not appeared
    test('Delete Rule Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await rulesPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Rule Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await rulesPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test("Delete Rule Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await rulesPage.open_dict()
        await bp.delete_using_card()
    });

    // Need Seed
    test.skip('Select All Delete Rules', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await rulesPage.open_dict()
        await bp.select_all_delete()
    });

    test('Restore Rule Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const rulesPage = new RulesPage(page)
        const bp = new BasePage(page)
        // await lp.authorization();
        // await rulesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});