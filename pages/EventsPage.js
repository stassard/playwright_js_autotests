import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';

exports.EventsPage = class EventsPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.input_name_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Name input
        this.input_description_card = "(//input[contains(@data-pc-name,'inputtext')])[4]"  // Description input
        this.selector_type_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Type
        this.list_of_type_card = `//li[@aria-posinset='${[getRandomInt(1, 2)]}']`  // List of Types
        this.customer_type_selector = "//li[@aria-posinset='1']"  // Customer Type Selector
        this.national_type_selector = "//li[@aria-posinset='2']"  // National Type Selector
        this.selector_color_id_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Color
        this.list_color_id_card = `//li[@aria-posinset='${[getRandomInt(1, 9)]}']`  // List of Color
        this.input_start_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Start Date input
        this.input_end_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[2]"  // End Date input

        // Grid
        this.last_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[2]"  // Grid last ID
        this.last_start_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[6]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[7]"  // Grid last End Date

        this.any_id_in_grid = `(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 15)]}]`  // Grid any ID


        // Created form
        this.x_icon_inside_start_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[1]"   // X icon in the Start Date input
        this.x_icon_inside_end_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[2]"     // X icon in the End Date input
    }

    async open_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_events).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Events")
    }

    async create_element(name, description, start_date, end_date){
        // Create New Event
        const bp = new BasePage();
        let count_of_items_before
        if (await this.page.locator(bp.count_items_in_footer_grid).isVisible()){
            count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
            await this.page.locator(bp.button_create_new).click()
        }
        if (await this.page.locator(bp.nothing_to_show_icon).isVisible()){
            await this.page.locator(bp.button_create_new).click()
            count_of_items_before = "0"
        }
        await this.page.fill(this.input_name_card, name)
        await this.page.fill(this.input_description_card, description)
        await this.page.locator(this.selector_type_card).click()
        await this.page.locator(this.list_of_type_card).click()
        await this.page.locator(this.selector_color_id_card).click()
        await this.page.locator(this.list_color_id_card).click()
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");

        // Get Info From Card
        // const card_name = await this.page.locator(this.input_name_card).inputValue()
        // const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        // const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_name = await this.page.locator(bp.first_item_name).textContent();
        // const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()


        // Check Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        // Find Any Event
        const bp = new BasePage()
        
        // Get Info From Grid
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.first_item_name).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click()

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

    async update_element(name, description, start_date, end_date){
        // Get Last Event Info from Grid Before Update
        const bp = new BasePage()
        // const id_before = await this.page.locator(this.last_id_in_grid).textContent();
        const name_before = await this.page.locator(bp.first_item_name).textContent();
        // const start_date_before = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const end_date_before = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click();

        // Update Last Event
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_name_card).clear()
        await this.page.fill(this.input_name_card, name)
        await this.page.locator(this.input_description_card).clear()
        await this.page.fill(this.input_description_card, description)
        if (await this.page.locator(this.selector_type_card).getAttribute("model-value-prop") === "Customer") {
            await this.page.locator(this.selector_type_card).click();
            await this.page.locator(this.national_type_selector).click();
        }
        else {
            await this.page.locator(this.selector_type_card).click();
            await this.page.locator(this.customer_type_selector).click();
        }
        await this.page.locator(this.selector_color_id_card).click();
        for (const item of await this.page.locator("//li").all()){
            let el = await item.first().getAttribute("aria-selected")
            if (el === "false") {
                await item.click()
                break
            }
        }
        await this.page.locator(this.x_icon_inside_start_date_input).click();
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.x_icon_inside_end_date_input).click();
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last Cogs Info from Grid After Update
        // const id_after = await this.page.locator(this.last_id_in_grid).textContent();
        const name_after = await this.page.locator(bp.first_item_name).textContent();
        // const start_date_after = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const end_date_after = await this.page.locator(this.last_end_date_in_grid).textContent();

        // Check the Matching of Grid and Card Info
        await expect.soft(name_before, "Event Name is not changed").not.toBe(name_after)

    }


}