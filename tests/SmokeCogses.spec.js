import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {CogsesPage} from "../pages/CogsesPage";
import {BasePage} from "../pages/BasePage";

test.describe("Smoke Suite for Cogses Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    test('Create Cogs', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        await lp.authorization();
        await cogsesPage.open_cogses_dict()
        await cogsesPage.create_cogs()
    });

    test.only('Read Cogs', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        await lp.authorization();
        await cogsesPage.open_cogses_dict()
        await cogsesPage.read_cogs()
    });

    test('Update Cogs', async ({page}) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        await lp.authorization();
        await cogsesPage.open_cogses_dict()
        await cogsesPage.update_cogs()
    });

    // BUG: Confirmation window is not appeared
    test('Delete Cogs Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_cogses_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Cogs Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_cogses_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Cogs Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_cogses_dict()
        await bp.delete_using_card()
    });

    // Small amount of data
    test.skip('Select All Delete Cogs', async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_cogses_dict()
        await bp.select_all_delete()
    });

    // BUG: 500 Error in some cases  (PSPR-3614)
    test.skip('Restore Cogs Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cogsesPage = new CogsesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cogsesPage.open_cogses_dict()
        await bp.restore_using_3_dots_grid()
    });
});