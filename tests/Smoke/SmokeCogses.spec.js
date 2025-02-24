import {test} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import {CogsesPage} from "../../pages/CogsesPage";
import {BasePage} from "../../pages/BasePage";

test.describe("Smoke Suite for Cogses Page", () => {


    test('Create Cogs', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        await lp.authorization();
        await cogsesPage.open_dict()
        await cogsesPage.create_element()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3583
    test.skip('Read Cogs', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        await lp.authorization();
        await cogsesPage.open_dict()
        await cogsesPage.read_element()
    });

    test('Update Cogs', async ({page}) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        await lp.authorization();
        await cogsesPage.open_dict()
        await cogsesPage.update_element()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Delete Cogs Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Cogs Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete Cogs Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_dict()
        await bp.delete_using_card()
    });

    // Small amount of data
    test.skip('Select All Delete Cogs', async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_dict()
        await bp.select_all_delete()
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3614
    // BUG: Confirmation window is not appeared
    test.skip('Restore Cogs Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});