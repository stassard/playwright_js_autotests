import {BasePage, getRandomInt} from './BasePage.js';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';


exports.SFATypesPage = class SFATypesPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.input_sfa_type_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // SFA Type input

        // Grid
        this.last_sfa_type_in_grid = "(//span[text()='SFA Type']/following-sibling::div[contains(@class,'relative inline-block')])[1]" // Grid last SFA Type

        this.any_sfa_type_in_grid = `(//span[text()='Product ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any SFA Type

    }

    async open_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_sfa_types).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("SFA types")
    }

    async create_element() {
        // Create New SFA Type
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_sfa_type_card, faker.location.city() + " SFA type")

        // Get Info From Card
        const card_sfa_type = await this.page.locator(this.input_sfa_type_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_sfa_type = await this.page.locator(this.last_sfa_type_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check Matching of Grid and Card Info
        await expect.soft(card_sfa_type, "SFA type is not match").toBe(grid_sfa_type)
        await expect.soft(Number(count_of_items_after), "Element is not created or created more than 1 product").toBe(Number(count_of_items_before) + 1)
    }

    async read_element(){
        const bp = new BasePage()

        // Get Info From Grid
        const grid_id = await this.page.locator(bp.last_item_name).textContent();
        const grid_sfa_type = await this.page.locator(this.last_sfa_type_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_sfa_type = await this.page.locator(this.input_sfa_type_card).inputValue()

        // Check Matching of Grid and Card Info
        await expect.soft(grid_id, "SFA type ID is not match").toBe(card_id)
        await expect.soft(grid_sfa_type, "SFA type is not match").toBe(card_sfa_type)
    }

    async update_element(){
        // Get Last SFA Type Info from Grid Before Update
        const bp = new BasePage()
        const id_before = await this.page.locator(bp.last_item_name).textContent();
        const sfa_type_before = await this.page.locator(this.last_sfa_type_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click();

        // Update Last Client Product Prices
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_sfa_type_card).clear();
        await this.page.fill(this.input_sfa_type_card, faker.location.city() + " SFA type");
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last SFA Type Info from Grid After Update
        const id_after = await this.page.locator(bp.last_item_name).textContent();
        const sfa_type_after = await this.page.locator(this.last_sfa_type_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(id_before, "SFA Type ID is changed").toBe(id_after)
        await expect.soft(sfa_type_before, "SFA Type is not changed").not.toBe(sfa_type_after)
    }
}