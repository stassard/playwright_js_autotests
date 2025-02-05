import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ClientsPage } from "../pages/ClientsPage";
import { BasePage } from "../pages/BasePage";


test.describe("Smoke Suite for Client Page", () => {
    test('Create Client', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await cp.create_client()
    });

    test('Read Client', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await cp.read_client()
    });

    test('Update Client', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await cp.update_client()
    });

    test("Update Client's logo", async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await cp.update_client_logo()
    });
    test('Delete Client Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Client Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Product Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await bp.select_all_delete()
    });

    test('Restore Product Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cp = new ClientsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cp.open_clients_dict()
        await bp.restore_using_3_dots_grid()
    });
});