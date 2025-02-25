import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ClientsPage } from "../../pages/ClientsPage";
import { BasePage } from "../../pages/BasePage";
import {DataGeneratorForSmoke} from "../../Fake_data_generator";


test.describe("Smoke Suite for Client Page", () => {

    // https://prospace-team.atlassian.net/browse/PSPR-3212
    test.only('Create Client', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await cp.open_dict()
        await cp.create_element(fakeData.client_name, fakeData.external_id, fakeData.parent, fakeData.client_type, fakeData.dispatch_start, fakeData.dispatch_end)
    });

    // https://prospace-team.atlassian.net/browse/PSPR-3212
    test('Read Client', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        await lp.authorization();
        await cp.open_dict()
        await cp.read_element()
    });

    test.only('Update Client', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await cp.open_dict()
        await cp.update_element(fakeData.client_name, fakeData.parent, fakeData.client_type, fakeData.dispatch_start, fakeData.dispatch_end)
    });

    test("Update Client's logo", async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        await lp.authorization();
        await cp.open_dict()
        await cp.update_element_logo()
    });

    test('Delete Client Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Client Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test.skip("Delete Product Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_dict()
        await bp.select_all_delete()
    });

    // BUG: Confirmation window is not appeared
    test.skip('Restore Product Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});