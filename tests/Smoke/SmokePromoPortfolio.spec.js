import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from "../../pages/BasePage";
import {PromoPortfolioPage} from "../../pages/PromoPortfolioPage";
import {DataGeneratorForSmoke} from "../../Fake_data_generator";


test.describe("Smoke Suite for Promo Portfolio Page", () => {
    test.beforeEach('Create Promo', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await promoPortfolioPage.create_tpr_promo(bp.random_dropdown_element)
    });

    test('Create Promo', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await promoPortfolioPage.create_tpr_promo(bp.random_dropdown_element)
    });

    test.skip('Read Promo', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await promoPortfolioPage.read_element()
    });

    test('Update Promo', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await promoPortfolioPage.update_element()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-2424
    test('Delete Promo Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-2424
    test('Delete Promo Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    // BUG: https://prospace-team.atlassian.net/browse/PSPR-2424
    // TODO: Need class for 3 dots in the Promo Card
    test("Delete Promo Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await bp.delete_using_card()
    });

    // Can't delete Promo using Select All because there are different status promos in the grid
    test.skip('Select All Delete Promo', async ({ page }) => {
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await bp.select_all_delete()
    });

    // Inconsistent data (restore button)
    test('Restore Promo Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const promoPortfolioPage = new PromoPortfolioPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await promoPortfolioPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});