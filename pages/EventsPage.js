import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';

exports.EventsPage = class EventsPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.input_name_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Name input
        this.selector_color_id_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Color
        this.list_color_id_card = `//li[@aria-posinset='${[getRandomInt(1, 9)]}']`  // List of Color
        this.input_start_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Start Date input
        this.input_end_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[2]"  // End Date input

        // Grid
        this.last_id_in_grid = "(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last ID
        this.last_start_date_in_grid = "(//span[text()='Start Date']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//span[text()='End Date']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last End Date

        this.any_id_in_grid = `(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 15)]}]`  // Grid any ID


        // Created form
        this.x_icon_inside_start_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[1]"   // X icon in the Start Date input
        this.x_icon_inside_end_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[2]"     // X icon in the End Date input
    }

    async open_events_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_events).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Events")
    }

    async create_event(){
        // Create New Event
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_name_card, faker.location.city())
        await this.page.locator(this.selector_color_id_card).click()
        await this.page.locator(this.list_color_id_card).click()
        await this.page.fill(this.input_start_date_card, currentDate)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, random_end_date)
        await this.page.keyboard.press("Enter");

        // Get Info From Card
        const card_name = await this.page.locator(this.input_name_card).inputValue()
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()


        // Check Matching of Grid and Card Info
        await expect.soft(card_name, "Event Name is not match").toBe(grid_name)
        await expect.soft(card_start_date, "Start Date is not match").toBe(grid_start_date)
        await expect.soft(card_end_date, "End Date is not match").toBe(grid_end_date)
        await expect.soft(Number(count_of_items_after), "Element is not created").toEqual(Number(count_of_items_before) + 1)
    }

    async read_event(){
        // Find Any Event
        const bp = new BasePage()
        
        // Get Info From Grid
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_name = await this.page.locator(this.input_name_card).inputValue()
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        // Check Matching of Grid and Card Info
        await expect.soft(card_id, "Event ID is not match").toBe(grid_id)
        await expect.soft(grid_name, "Event Name [Grid and Card] is not match").toBe(card_name)
        await expect.soft(grid_start_date, "Start Date is not match").toBe(card_start_date)
        await expect.soft(grid_end_date, "End Date is not match").toBe(card_end_date)

    }

    async update_event(){
        // Get Last Event Info from Grid Before Update
        const bp = new BasePage()
        const id_before = await this.page.locator(this.last_id_in_grid).textContent();
        const name_before = await this.page.locator(bp.last_item_name).textContent();
        const start_date_before = await this.page.locator(this.last_start_date_in_grid).textContent();
        const end_date_before = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click();

        // Update Last Cogs
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.fill(this.input_name_card, faker.location.city())
        await this.page.locator(this.selector_color_id_card).click();
        for (const item of await this.page.locator("//li").all()){
            let el = await item.first().getAttribute("aria-selected")
            if (el === "false") {
                await item.click()
                break
            }
        }
        await this.page.locator(this.x_icon_inside_start_date_input).click();
        await this.page.fill(this.input_start_date_card, random_start_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.x_icon_inside_end_date_input).click();
        await this.page.fill(this.input_end_date_card, random_end_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last Cogs Info from Grid After Update
        const id_after = await this.page.locator(this.last_id_in_grid).textContent();
        const name_after = await this.page.locator(bp.last_item_name).textContent();
        const start_date_after = await this.page.locator(this.last_start_date_in_grid).textContent();
        const end_date_after = await this.page.locator(this.last_end_date_in_grid).textContent();

        // Check the Matching of Grid and Card Info
        await expect.soft(id_before, "Event ID is changed").toBe(id_after)
        await expect.soft(name_before, "Event Name is not changed").not.toBe(name_after)
        await expect.soft(start_date_before, "Start Date is not changed").not.toBe(start_date_after)
        await expect.soft(end_date_before, "End Date is not changed").not.toBe(end_date_after)

    }


}