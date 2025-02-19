import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {MarketingBudgetsPage} from "../pages/MarketingBudgetsPage";
import {BasePage} from "../pages/BasePage";

test.describe("Smoke Suite for Marketing Budgets Page", () => {
    test('Create Manual Marketing Budget', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await marketingBudgetPage.create_manual_marketing_budget()
    });

    test('Create Auto Marketing Budget', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await marketingBudgetPage.create_auto_marketing_budget()
    });

    test.describe('Add Promo to Manual Marketing Budget',() => {
        test.beforeEach('Create Manual Marketing Budget',async ({ page }) => {
            test.setTimeout(120_000)
            const lp = new LoginPage(page);
            const marketingBudgetPage = new MarketingBudgetsPage(page)
            await lp.authorization();
            await marketingBudgetPage.open_marketing_budgets_dict()
            await marketingBudgetPage.create_manual_marketing_budget()
        });
        test('Add Promo to Manual Marketing Budget', async ({page}) => {
            test.setTimeout(120_000)
            const marketingBudgetPage = new MarketingBudgetsPage(page)
            await marketingBudgetPage.add_promo_to_manual_marketing_budget()
        });
    })

    test.describe.only('Add Promo to Auto Marketing Budget',() => {
        test.beforeEach('Create Auto Marketing Budget', async ({page}) => {
            test.setTimeout(120_000)
            const lp = new LoginPage(page);
            const marketingBudgetPage = new MarketingBudgetsPage(page)
            await lp.authorization();
            await marketingBudgetPage.open_marketing_budgets_dict()
            await marketingBudgetPage.create_auto_marketing_budget()
        });
        test('Add Promo to Auto Marketing Budget', async ({page}) => {
            test.setTimeout(120_000)
            const marketingBudgetPage = new MarketingBudgetsPage(page)
            await marketingBudgetPage.add_promo_to_auto_marketing_budget()
        });
    })

    test('Read Marketing Budget', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await marketingBudgetPage.read_markering_budget()
    });

    test('Delete Marketing Budget Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Marketing Budget Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Marketing Budget Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Marketing Budget', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await bp.select_all_delete()
    });

    test('Restore Marketing Budget Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await bp.restore_using_3_dots_grid()
    });

    test('Restore Marketing Budget Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await bp.restore_using_checkbox_grid()
    });

    // BUG: PSPR-3768
    test('Restore Marketing Budget Using Card', async ({page}) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_marketing_budgets_dict()
        await bp.restore_using_card()
    });
});