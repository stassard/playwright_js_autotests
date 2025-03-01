import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from "../../pages/ProductsPage";
import { BasePage } from "../../pages/BasePage";
import { DataGeneratorForSmoke } from "../../Fake_data_generator";


test.describe("Smoke Suite for Product Page", () => {
    test('Create Product', async ({ page }) => {
        test.setTimeout(180_000)
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await pp.open_dict()
        await pp.create_element(fakeData.product_name, fakeData.ean_case, fakeData.ean_pc, fakeData.category, fakeData.technology, fakeData.brand, fakeData.unit)
    });

    test.skip('Read Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        await lp.authorization();
        await pp.open_dict()
        await pp.read_element()
    });

    test('Update Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await pp.open_dict()
        await pp.update_element(fakeData.product_name, fakeData.ean_case, fakeData.category, fakeData.technology, fakeData.brand, fakeData.unit)
    });

    // BUG: Confirmation window is not appeared
    test('Delete Product Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Product Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: Confirmation window is not appeared
    test("Delete Product Using Card", async ({ page }) => {
        test.setTimeout(180_000)
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_dict()
        await bp.delete_using_card()
    });

    test.skip('Select All Delete Product', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_dict()
        await bp.select_all_delete()
    });
    
    test('Restore Product Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const pp = new ProductsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await pp.open_dict()
        await bp.restore_using_3_dots_grid()
    });


})
