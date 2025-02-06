import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from "../pages/BasePage";
import { BaselinesPage } from "../pages/BaselinesPage";


test.describe("Smoke Suite for Baselines Page", () => {
    test('Create Baseline', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await baselinesPage.create_baseline()
    });

    test('Read Baseline', async ({page}) => {
        test.setTimeout(120_000)
        const lp = new LoginPage(page);
        const baselinesPage = new BaselinesPage(page)
        await lp.authorization();
        await baselinesPage.open_baselines_dict()
        await baselinesPage.read_baseline()
    });
});