import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {ProductGroupsPage} from "../pages/ProductGroupsPage";
import {BasePage} from "../pages/BasePage";

test.describe("Smoke Suite for Product Groups Page", () => {
    test('Create Auto Product Group', async ({page}) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await productGroupsPage.create_auto_product_group()
    });

    test('Create Manual Product Group', async ({page}) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await productGroupsPage.create_manual_product_group()
    });

    test('Read Product Group', async ({page}) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await productGroupsPage.read_product_group()
    });

    test('Update Auto Product Group', async ({page}) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await productGroupsPage.update_auto_product_group()
    });

    test('Update Manual Product Group', async ({page}) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await productGroupsPage.update_manual_product_group()
    });

    test('Delete Product Group Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Product Group Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Product Group Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await bp.delete_using_card()
    });

    test.skip('Select All Delete Product Groups', async ({ page }) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await bp.select_all_delete()
    });

    test('Restore Product Group Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const productGroupsPage = new ProductGroupsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await productGroupsPage.open_product_groups_dict()
        await bp.restore_using_3_dots_grid()
    });
});