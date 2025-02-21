import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {BasePage} from "../pages/BasePage";
import {BaseTisPage} from "../pages/BaseTIsPage";

test.describe("Smoke Suite for BaseTis Page", () => {
    test('Create BaseTi', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        await lp.authorization();
        await baseTisPage.open_dict()
        await baseTisPage.create_element()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.skip('Read BaseTi', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        await lp.authorization();
        await baseTisPage.open_dict()
        await baseTisPage.read_element()
    });

    test('Update BaseTi', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        await lp.authorization();
        await baseTisPage.open_dict()
        await baseTisPage.update_element()
    });

    test('Delete BaseTi Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete BaseTi Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete BaseTi Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_dict()
        await bp.delete_using_card()
    });

    // Need seed
    test.skip('Select All Delete BaseTis', async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_dict()
        await bp.select_all_delete()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Restore BaseTi Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});