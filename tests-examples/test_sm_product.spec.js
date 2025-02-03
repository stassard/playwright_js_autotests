import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from "../pages/ProductsPage";


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

    test.only('Delete Product Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.delete_product_using_3_dots_grid()
    });

    test('Delete Product Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.delete_product_using_checkbox_grid()
    });

    test("Delete Product Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.delete_product_using_card()
    });

    test('Select All Delete Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.select_all_delete_product()
    });

    test('Restore Product Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.restore_product_using_3_dots_grid()
    });


})
