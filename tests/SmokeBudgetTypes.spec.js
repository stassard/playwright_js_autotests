import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {BudgetTypesPage} from "../pages/BudgetTypesPage";
import {BasePage} from "../pages/BasePage";
import {MarketingBudgetsPage} from "../pages/MarketingBudgetsPage";

test.describe("Smoke Suite for Budget Types Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    test('Create Budget Type', async ({page}) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await budgetTypesPage.create_budget_type()
    });

    test('Read Budget Type', async ({page}) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await budgetTypesPage.read_budget_type()
    });

    test('Update Budget Type', async ({page}) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await budgetTypesPage.update_budget_type()
    });

    // TODO: Needs classes on the button inside card
    test('Delete Budget Type Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await bp.delete_using_3_dots_grid()
    });

    test.skip('Delete Budget Type Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await bp.delete_using_checkbox_grid()
    });

    test.skip("Delete Budget Type Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await bp.delete_using_card()
    });

    test.skip('Select All Delete Budget Type', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_events_dict()
        await bp.select_all_delete()
    });

    test.skip('Restore Budget Type Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await bp.restore_using_3_dots_grid()
    });

    test.skip('Restore Budget Type Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await bp.restore_using_checkbox_grid()
    });

    test.skip('Restore Budget Type Using Card', async ({page}) => {
        const lp = new LoginPage(page);
        const budgetTypesPage = new BudgetTypesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await budgetTypesPage.open_budget_types_dict()
        await bp.restore_using_card()
    });
});