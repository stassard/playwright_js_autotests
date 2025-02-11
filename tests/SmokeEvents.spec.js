import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {EventsPage} from "../pages/EventsPage";
import {BasePage} from "../pages/BasePage";

test.describe("Smoke Suite for Events Page", () => {

    // Требуется сид c большим количеством данных,для корректного тестирования
    test('Create Event', async ({page}) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        await lp.authorization();
        await eventsPage.open_events_dict()
        await eventsPage.create_event()
    });

    test('Read Event', async ({page}) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        await lp.authorization();
        await eventsPage.open_events_dict()
        await eventsPage.read_event()
    });

    test('Update Event', async ({page}) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        await lp.authorization();
        await eventsPage.open_events_dict()
        await eventsPage.update_event()
    });

    test('Delete Event Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_events_dict()
        await bp.delete_using_3_dots_grid()
    });

    test('Delete Event Using Checkbox Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_events_dict()
        await bp.delete_using_checkbox_grid()
    });

    test("Delete Event Using Card", async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_events_dict()
        await bp.delete_using_card()
    });

    // Small amount of data
    test.skip('Select All Delete Events', async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_events_dict()
        await bp.select_all_delete()
    });

    test.skip('Restore Event Using 3 Dots Grid', async ({ page }) => {
        const lp = new LoginPage(page);
        const eventsPage = new EventsPage(page)
        const bp = new BasePage(page)
        await lp.authorization();
        await eventsPage.open_events_dict()
        await bp.restore_using_3_dots_grid()
    });
});