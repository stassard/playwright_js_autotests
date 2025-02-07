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
        await baseTisPage.open_basetis_dict()
        await baseTisPage.create_basetis()
    });

    test('Read BaseTi', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        await lp.authorization();
        await baseTisPage.open_basetis_dict()
        await baseTisPage.read_baseti()
    });

    test('Update BaseTi', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        await lp.authorization();
        await baseTisPage.open_basetis_dict()
        await baseTisPage.update_baseti()
    });

    test('Delete BaseTi Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_basetis_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete BaseTi Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_basetis_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete BaseTi Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_basetis_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete BaseTis', async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_basetis_dict()
        await bp.select_all_delete()
    });

    test('Restore BaseTi Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const baseTisPage = new BaseTisPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await baseTisPage.open_basetis_dict()
        await bp.restore_using_3_dots_grid()
    });
});