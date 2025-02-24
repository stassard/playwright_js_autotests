import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from "../../pages/BasePage";
import { ClientProductPricesPage } from "../../pages/ClientProductPricesPage";


test.describe("Smoke Suite for Client Product Prices Page", () => {
    test('Create Client Product Price', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const cppp = new ClientProductPricesPage(page)
        await lp.authorization();
        await cppp.open_dict()
        await cppp.create_element()
    });

    test('Read Client Product Prices', async ({page}) => {
        const lp = new LoginPage(page);
        const cppp = new ClientProductPricesPage(page)
        await lp.authorization();
        await cppp.open_dict()
        await cppp.read_element()
    });

    test('Update Client Product Prices', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const cppp = new ClientProductPricesPage(page)
        await lp.authorization();
        await cppp.open_dict()
        await cppp.update_element()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Delete Client Product Prices Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cppp = new ClientProductPricesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cppp.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Client Product Prices Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cppp = new ClientProductPricesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cppp.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test("Delete Client Product Prices Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const cppp = new ClientProductPricesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cppp.open_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Client Product Prices', async ({ page }) => {
        const lp = new LoginPage(page);
        const cppp = new ClientProductPricesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cppp.open_dict()
        await bp.select_all_delete()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3895
    test.skip('Restore Client Product Prices Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cppp = new ClientProductPricesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cppp.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});