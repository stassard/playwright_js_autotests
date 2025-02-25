import {test} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import {EventsPage} from "../../pages/EventsPage";
import {BasePage} from "../../pages/BasePage";
import {DataGeneratorForSmoke} from "../../Fake_data_generator";

test.describe("Smoke Suite for Events Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    test('Create Event', async ({page}) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await eventsPage.open_dict()
        await eventsPage.create_element(fakeData.event_name, fakeData.description, fakeData.current_start_date, fakeData.random_end_date)
    });

    test('Read Event', async ({page}) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        await lp.authorization();
        await eventsPage.open_dict()
        await eventsPage.read_element()
    });

    test('Update Event', async ({page}) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const fakeData = new DataGeneratorForSmoke(page)
        await lp.authorization();
        await eventsPage.open_dict()
        await eventsPage.update_element(fakeData.event_name, fakeData.description, fakeData.random_start_date, fakeData.random_end_date)
    });

    test('Delete Event Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Event Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Event Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_dict()
        await bp.delete_using_card()
    });

    // Small amount of data
    test.skip('Select All Delete Events', async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_dict()
        await bp.select_all_delete()
    });

    test('Restore Event Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_dict()
        await bp.restore_using_3_dots_grid()
    });
});