import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from "../pages/ProductsPage";
import { BasePage } from "../pages/BasePage";


test.describe("Smoke Suite for Product Page", () => {
    test('Create Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.create_product()
    });

    test('Read Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.read_product()
    });

    test('Update Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.update_product()
    });

    test('Delete Product Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Product Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Product Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await bp.delete_using_card()
    });

    test('Select All Delete Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await bp.select_all_delete()
    });

    test('Restore Product Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await bp.restore_using_3_dots_grid()
    });


})
