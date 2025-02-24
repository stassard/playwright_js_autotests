import {test} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import {MarketingBudgetsPage} from "../../pages/MarketingBudgetsPage";
import {BasePage} from "../../pages/BasePage";

test.describe("Smoke Suite for Marketing Budgets Page", () => {

    // https://prospace-team.atlassian.net/browse/PSPR-3514
    // https://prospace-team.atlassian.net/browse/PSPR-3488
    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.skip('Create Manual Marketing Budget', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await marketingBudgetPage.create_manual_type_budget()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3514
    // https://prospace-team.atlassian.net/browse/PSPR-3488
    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.skip('Create Auto Marketing Budget', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await marketingBudgetPage.create_auto_type_budget()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3514
    // https://prospace-team.atlassian.net/browse/PSPR-3488
    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.describe.skip('Add Promo to Manual Marketing Budget',() => {
        test.beforeEach('Create Manual Marketing Budget',async ({ page }) => {
            test.setTimeout(120_000)
            const lp = new LoginPage(page);
            const marketingBudgetPage = new MarketingBudgetsPage(page)
            await lp.authorization();
            await marketingBudgetPage.open_dict()
            await marketingBudgetPage.create_manual_type_budget()
        });
        test('Add Promo to Manual Marketing Budget', async ({page}) => {
            test.setTimeout(120_000)
            const marketingBudgetPage = new MarketingBudgetsPage(page)
            await marketingBudgetPage.add_promo_to_manual_marketing_budget()
        });
    })

    // https://prospace-team.atlassian.net/browse/PSPR-3514
    // https://prospace-team.atlassian.net/browse/PSPR-3488
    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.describe.skip('Add Promo to Auto Marketing Budget',() => {
        test.beforeEach('Create Auto Marketing Budget', async ({page}) => {
            test.setTimeout(120_000)
            const lp = new LoginPage(page);
            const marketingBudgetPage = new MarketingBudgetsPage(page)
            await lp.authorization();
            await marketingBudgetPage.open_dict()
            await marketingBudgetPage.create_auto_type_budget()
        });
        test('Add Promo to Auto Marketing Budget', async ({page}) => {
            test.setTimeout(120_000)
            const marketingBudgetPage = new MarketingBudgetsPage(page)
            await marketingBudgetPage.add_promo_to_auto_marketing_budget()
        });
    })

    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.skip('Read Marketing Budget', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await marketingBudgetPage.read_element()
    });

    test('Delete Marketing Budget Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Marketing Budget Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete Marketing Budget Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await bp.delete_using_card()
    });

    // Need seed
    test.skip('Select All Delete Marketing Budget', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await bp.select_all_delete()
    });

    test('Restore Marketing Budget Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });

    test('Restore Marketing Budget Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await bp.restore_using_checkbox_grid()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3768
    test.skip('Restore Marketing Budget Using Card', async ({page}) => {
        const lp = new LoginPage(page);
        const marketingBudgetPage = new MarketingBudgetsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await marketingBudgetPage.open_dict()
        await bp.restore_using_card()
    });
});