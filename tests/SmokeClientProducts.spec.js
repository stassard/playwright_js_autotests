import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ClientProductsPage } from "../pages/ClientProductsPage.js";
import { BasePage } from "../pages/BasePage";


test.describe("Smoke Suite for Client Products Page", () => {
    test('Create Client Products', async ({ page }) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const cpp = new ClientProductsPage(page)
        await lp.authorization();
        await cpp.open_client_products_dict()
        await cpp.create_client_products()
    });

    test('Read Client Products', async ({ page }) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const cpp = new ClientProductsPage(page)
        await lp.authorization();
        await cpp.open_client_products_dict()
        await cpp.read_client_products()
    });

    test('Delete Client Products Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cpp = new ClientProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cpp.open_client_products_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Client Products Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cpp = new ClientProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cpp.open_client_products_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Client Products Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const cpp = new ClientProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cpp.open_client_products_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Client Products', async ({ page }) => {
        const lp = new LoginPage(page);
        const cpp = new ClientProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cpp.open_client_products_dict()
        await bp.select_all_delete()
    });

    test('Restore Client Products Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const cpp = new ClientProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await cpp.open_client_products_dict()
        await bp.restore_using_3_dots_grid()
    });
});