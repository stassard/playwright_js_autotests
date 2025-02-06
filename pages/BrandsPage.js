import {BasePage, getRandomInt } from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';


exports.BrandPage = class BrandPage {

    constructor(page) {
        this.page = page;
        // Creation form
        this.input_brand_code_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Brand code input
        this.input_segment_code_card = "(//input[contains(@data-pc-name,'inputtext')])[4]"  // Segment code input
        this.input_segment_name_card = "(//input[contains(@data-pc-name,'inputtext')])[5]"  // Segment name input

        // Grid
        // this.last_brand_code_in_grid = "(//span[text()='Brand code']/following-sibling::div[contains(@class,'relative inline-block')])[1]"   // Grid last Brand code
        this.last_segment_code_in_grid = "(//span[text()='Segment code']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Segment code
        this.last_segment_name_in_grid = "(//span[text()='Segment name']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Segment name
        // this.any_brand_code_in_grid = `(//span[text()='Brand code']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Brand code
        this.any_segment_code_in_grid = `(//span[text()='Segment code']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Segment code
        this.any_segment_name_in_grid = `(//span[text()='Segment name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Segment name
    }

    async open_brands_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_brands).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Brands")
    }

    async create_brand(){
        // Create New Brand
        const bp = new BasePage();
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_brand_code_card, String(faker.number.int(1000)))
        await this.page.fill(this.input_segment_code_card, String(faker.number.int(1000)))
        await this.page.fill(this.input_segment_name_card, faker.commerce.department())

        // Get Info From Card
        const card_brand_code = await this.page.locator(this.input_brand_code_card).inputValue()
        const card_segment_code = await this.page.locator(this.input_segment_code_card).inputValue()
        const card_segment_name = await this.page.locator(this.input_segment_name_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_brand_code = await this.page.locator(bp.last_item_name).textContent();
        const grid_segment_code = await this.page.locator(this.last_segment_code_in_grid).textContent();
        const grid_segment_name = await this.page.locator(this.last_segment_name_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(card_brand_code, "Brand Code is not match").toBe(grid_brand_code)
        await expect.soft(card_segment_code, "Segment Code is not match").toBe(grid_segment_code)
        await expect.soft(card_segment_name, "Segment Name is not match").toBe(grid_segment_name)
    }

    async read_brand(){
        // Find Any Brand
        const bp = new BasePage()
        const any_id = await this.page.locator(bp.any_item_name).textContent();
        await this.page.fill(bp.input_search_grid, any_id);
        await this.page.keyboard.press("Enter");

        let count = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count++;
            if (count === 10){
                break;
            }
        }

        // Get Info From Grid
        const grid_brand_code = await this.page.locator(bp.last_item_name).textContent();
        const grid_segment_code = await this.page.locator(this.last_segment_code_in_grid).textContent();
        const grid_segment_name = await this.page.locator(this.last_segment_name_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_brand_code = await this.page.locator(this.input_brand_code_card).inputValue()
        const card_segment_code = await this.page.locator(this.input_segment_code_card).inputValue()
        const card_segment_name = await this.page.locator(this.input_segment_name_card).inputValue()


        // Check the Matching of Grid and Card Info
        await expect.soft(card_brand_code, "Brand Code is not match").toBe(grid_brand_code)
        await expect.soft(card_segment_code, "Segment Code is not match").toBe(grid_segment_code)
        await expect.soft(card_segment_name, "Segment Name is not match").toBe(grid_segment_name)

    }

    async update_brand(){
        // Get Last Brand Info from Grid Before Update
        const bp = new BasePage()
        const brand_code_before = await this.page.locator(bp.last_item_name).textContent();
        const segment_code_before = await this.page.locator(this.last_segment_code_in_grid).textContent();
        const segment_name_before = await this.page.locator(this.last_segment_name_in_grid).textContent();

        // Update Last Brand
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_brand_code_card).clear();
        await this.page.fill(this.input_brand_code_card, String(faker.number.int(1000)));
        await this.page.locator(this.input_segment_code_card).clear();
        await this.page.fill(this.input_segment_code_card, String(faker.number.int(1000)));
        await this.page.locator(this.input_segment_name_card).clear();
        await this.page.fill(this.input_segment_name_card, faker.commerce.department());
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // Get Last Brand Info from Grid After Update
        await this.page.locator(bp.x_icon).click()
        await this.page.reload()
        const brand_code_after = await this.page.locator(bp.last_item_name).textContent();
        const segment_code_after = await this.page.locator(this.last_segment_code_in_grid).textContent();
        const segment_name_after = await this.page.locator(this.last_segment_name_in_grid).textContent();

        // Check Update
        await expect.soft(brand_code_before, "Brand Code is not changed").not.toBe(brand_code_after)
        await expect.soft(segment_code_before, "Segment Code is not changed").not.toBe(segment_code_after)
        await expect.soft(segment_name_before, "Segment Name is not changed").not.toBe(segment_name_after)

    }
}