import {test} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import {BudgetTypesPage} from "../../pages/BudgetTypesPage";
import {BasePage} from "../../pages/BasePage";

test.describe("Smoke Suite for Budget Types Page", () => {

    test('Create Budget Type', async ({page}) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await budgetTypesPage.create_element()
    });

    test('Read Budget Type', async ({page}) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await budgetTypesPage.read_element()
    });

    test('Update Budget Type', async ({page}) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await budgetTypesPage.update_element()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Delete Budget Type Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Budget Type Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete Budget Type Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await bp.delete_using_card()
    });

    // Need seed
    test.skip('Select All Delete Budget Type', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_events_dict()
        await bp.select_all_delete()
    });

    test('Restore Budget Type Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });

    test.skip('Restore Budget Type Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await bp.restore_using_checkbox_grid()
    });

    test.skip('Restore Budget Type Using Card', async ({page}) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_dict()
        await bp.restore_using_card()
    });
});