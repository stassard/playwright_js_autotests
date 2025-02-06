import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from "../pages/BasePage";
import { BrandPage } from "../pages/BrandsPage";


test.describe("Smoke Suite for Brands Page", () => {

    // Требуется сид для справочника для корректной работы
    // TODO: Remove .skip after added seed
    test('Create Brand', async ({page}) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        await lp.authorization();
        await brandPage.open_brands_dict()
        await brandPage.create_brand()
    });

    test.skip('Read Brand', async ({page}) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        await lp.authorization();
        await brandPage.open_brands_dict()
        await brandPage.read_brand()
    });

    test('Update Brand', async ({page}) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        await lp.authorization();
        await brandPage.open_brands_dict()
        await brandPage.update_brand()
    });

    test.skip('Delete Brand Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_brands_dict()
        await bp.delete_using_3_dots_grid()
    });

    test.skip('Delete Brand Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_brands_dict()
        await bp.delete_using_checkbox_grid()
    });

    test.skip("Delete Brand Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_brands_dict()
        await bp.delete_using_card()
    });

    test.skip('Select All Delete Brand', async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_brands_dict()
        await bp.select_all_delete()
    });

    test.skip('Restore Brand Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const brandPage = new BrandPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await brandPage.open_brands_dict()
        await bp.restore_using_3_dots_grid()
    });


});