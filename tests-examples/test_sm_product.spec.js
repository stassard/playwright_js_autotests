import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from "../pages/ProductsPage";


test.describe("Smoke Suite for Product Page", () => {})
    test('Create Product', async ({ page }) => {

        //Login
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_products_dict()
        await pp.create_product()
});