import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from "../../pages/BasePage";
import { TechnologiesPage } from "../../pages/TechnologiesPage";
import {DataGeneratorForSmoke} from "../../Fake_data_generator";


test.describe("Smoke Suite for Technologies Page", () => {

    test('Create Technology', async ({page}) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await technologiesPage.create_element(fakeData.technology_name, fakeData.tech_code, fakeData.technology_ru)
    });

    test.skip('Read Technology', async ({page}) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await technologiesPage.read_element()
    });

    test.describe("Update Technology", async () => {
        test.beforeEach('Create Technology', async ({page}) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const fakeData = new DataGeneratorForSmoke(page)
            await lp.authorization();
            await technologiesPage.open_dict()
            await technologiesPage.create_element(fakeData.technology_name, fakeData.tech_code, fakeData.technology_ru)
        });

        test('Update Technology', async ({page}) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const fakeData = new DataGeneratorForSmoke(page)
            // await lp.authorization();
            // await technologiesPage.open_dict()
            await technologiesPage.update_element(fakeData.technology_name, fakeData.tech_code, fakeData.technology_ru)
        });
    })

    test.describe("Delete Technology Using 3 Dots Grid", async () => {
        test.beforeEach('Create Technology', async ({page}) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const fakeData = new DataGeneratorForSmoke(page)
            await lp.authorization();
            await technologiesPage.open_dict()
            await technologiesPage.create_element(fakeData.technology_name, fakeData.tech_code, fakeData.technology_ru)
        });

        // BUG: Confirmation window is not appeared
        test('Delete Technology Using 3 Dots Grid', async ({ page }) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const bp = new BasePage(page)
            // await lp.authorization();
            // await technologiesPage.open_dict()
            await bp.delete_using_3_dots_grid()
        });
    })


    test.describe("Delete Technology Using Checkbox Grid", async () => {
        test.beforeEach('Create Technology', async ({page}) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const fakeData = new DataGeneratorForSmoke(page)
            await lp.authorization();
            await technologiesPage.open_dict()
            await technologiesPage.create_element(fakeData.technology_name, fakeData.tech_code, fakeData.technology_ru)
        });

        test('Delete Technology Using Checkbox Grid', async ({ page }) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const bp = new BasePage(page)
            // await lp.authorization();
            // await technologiesPage.open_dict()
            await bp.delete_using_checkbox_grid()
        });
    })

    test.describe("Delete Technology Using Card", async () => {
        test.beforeEach('Create Technology', async ({page}) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const fakeData = new DataGeneratorForSmoke(page)
            await lp.authorization();
            await technologiesPage.open_dict()
            await technologiesPage.create_element(fakeData.technology_name, fakeData.tech_code, fakeData.technology_ru)
        });

        // BUG: Confirmation window is not appeared
        test("Delete Technology Using Card", async ({ page }) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const bp = new BasePage(page)
            // await lp.authorization();
            // await technologiesPage.open_dict()
            await bp.delete_using_card()
        });
    })

    // Need seed
    test.skip('Select All Delete Technologies', async ({ page }) => {
        const lp = new LoginPage(page);
        const technologiesPage = new TechnologiesPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await technologiesPage.open_dict()
        await bp.select_all_delete()
    });

    test.describe("Restore Technology Using 3 Dots Grid", async () => {
        test.beforeEach('Delete Technology Using 3 Dots Grid', async ({ page }) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const bp = new BasePage(page)
            await lp.authorization();
            await technologiesPage.open_dict()
            await bp.delete_using_3_dots_grid()
        });

        // BUG: Confirmation window is not appeared
        test('Restore Technology Using 3 Dots Grid', async ({ page }) => {
            const lp = new LoginPage(page);
            const technologiesPage = new TechnologiesPage(page)
            const bp = new BasePage(page)
            // await lp.authorization();
            // await technologiesPage.open_dict()
            await bp.restore_using_3_dots_grid()
        });
        });
});