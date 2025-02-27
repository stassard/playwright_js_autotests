import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from "../../pages/BasePage";
import { UserClientsPage } from "../../pages/UserClientsPage";


test.describe("Smoke Suite for User Clients Page", () => {

    // https://prospace-team.atlassian.net/browse/PSPR-3952
    test('Create User Client', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const userClientsPage = new UserClientsPage(page)
        await lp.authorization();
        await userClientsPage.open_dict()
        await userClientsPage.create_element()
    });

    test.skip('Read User Client', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const userClientsPage = new UserClientsPage(page)
        await lp.authorization();
        await userClientsPage.open_dict()
        await userClientsPage.read_element()
    });

    test.describe("Delete User Client Using 3 Dots Grid", async () => {
        test.beforeEach('Create User Client', async ({page}) => {
            test.setTimeout(120_000)
            const lp = new LoginPage(page);
            const userClientsPage = new UserClientsPage(page)
            await lp.authorization();
            await userClientsPage.open_dict()
            await userClientsPage.create_element()
        });

        // BUG: Confirmation window is not appeared
        test('Delete User Client Using 3 Dots Grid', async ({ page }) => {
            const lp = new LoginPage(page);
            const userClientsPage = new UserClientsPage(page)
            const bp = new BasePage(page)
            // await lp.authorization();
            // await userClientsPage.open_dict()
            await bp.delete_using_3_dots_grid()
        });
    })

    test.describe("Delete User Client Using Checkbox Grid", async () => {
        test.beforeEach('Create User Client', async ({page}) => {
            test.setTimeout(120_000)
            const lp = new LoginPage(page);
            const userClientsPage = new UserClientsPage(page)
            await lp.authorization();
            await userClientsPage.open_dict()
            await userClientsPage.create_element()
        });

        // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
        test('Delete User Client Using Checkbox Grid', async ({ page }) => {
            const lp = new LoginPage(page);
            const userClientsPage = new UserClientsPage(page)
            const bp = new BasePage(page)
            // await lp.authorization();
            // await userClientsPage.open_dict()
            await bp.delete_using_checkbox_grid()
        });
    })

    test.describe("Delete User Client Using Card", async () => {
        test.beforeEach('Create User Client', async ({page}) => {
            test.setTimeout(120_000)
            const lp = new LoginPage(page);
            const userClientsPage = new UserClientsPage(page)
            await lp.authorization();
            await userClientsPage.open_dict()
            await userClientsPage.create_element()
        });

        // BUG: Confirmation window is not appeared
        test("Delete User Client Using Card", async ({ page }) => {
            const lp = new LoginPage(page);
            const userClientsPage = new UserClientsPage(page)
            const bp = new BasePage(page)
            // await lp.authorization();
            // await userClientsPage.open_dict()
            await bp.delete_using_card()
        });
    })

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-3853
    // Need Seed
    test.skip('Select All Delete User Client', async ({ page }) => {
        const lp = new LoginPage(page);
        const userClientsPage = new UserClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await userClientsPage.open_dict()
        await bp.select_all_delete()
    });

    test.describe("Restore User Client Using 3 Dots Grid", async () => {
        test.beforeEach('Delete User Client Using 3 Dots Grid', async ({ page }) => {
            const lp = new LoginPage(page);
            const userClientsPage = new UserClientsPage(page)
            const bp = new BasePage(page)
            await lp.authorization();
            await userClientsPage.open_dict()
            await bp.delete_using_3_dots_grid()
        });

        // BUG: Confirmation window is not appeared
        // https://prospace-team.atlassian.net/browse/PSPR-3951
        test('Restore User Client Using 3 Dots Grid', async ({ page }) => {
            const lp = new LoginPage(page);
            const userClientsPage = new UserClientsPage(page)
            const bp = new BasePage(page)
            // await lp.authorization();
            // await userClientsPage.open_dict()
            await bp.restore_using_3_dots_grid()
        });
    })
});