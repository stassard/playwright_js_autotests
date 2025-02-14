import {BasePage, getRandomInt } from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';


exports.TechnologiesPage = class TechnologiesPage {

    constructor(page) {
        this.page = page;
        // Creation form
        this.input_technology_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Technology input
        this.input_technology_ru_card = "(//input[contains(@data-pc-name,'inputtext')])[4]"  // Technology RU    input
        this.input_tech_code_card = "(//input[contains(@data-pc-name,'inputtext')])[5]"  // Tech Code input
        this.selector_sub_brand_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Sub Brand
        this.selector_sub_brand_code_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Sub Brand Code
        this.spittable_swither_card = "//div[@data-test='block-row']/div/div/div/input[@role='switch']"  // Selector Sub Brand Code

        // Grid
        this.last_technology_in_grid = "(//span[text()='Technology']/following-sibling::div[contains(@class,'relative inline-block')])[1]"   // Grid last Technology
        this.last_tech_code_in_grid = "(//span[text()='Tech Code']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Tech code
        this.last_sub_brand_in_grid = "(//span[text()='Sub Brand']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Sub Brand
        this.last_sub_brand_code_in_grid = "(//span[text()='Sub Brand Code']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Sub Brand Code

        this.any_technology_in_grid = `(//span[text()='Technology']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Technology
        this.any_tech_code_in_grid = `(//span[text()='Tech Code']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Tech code
        this.any_sub_brand_in_grid = `(//span[text()='Sub Brand']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Sub Brand
        this.any_sub_brand_code_in_grid = `(//span[text()='Sub Brand Code']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Sub Brand Code
    }

    async open_technologies_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_technologies).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Technologies")
    }

    async create_technology() {
        // Create New Technology
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_technology_card, faker.location.city() + " Technology")
        await this.page.fill(this.input_technology_ru_card, faker.location.city())
        await this.page.fill(this.input_tech_code_card, String(faker.number.int(1000)))
        await this.page.locator(this.spittable_swither_card).click()

        // Get Info From Card
        const card_technology = await this.page.locator(this.input_technology_card).inputValue()
        const card_tech_code = await this.page.locator(this.input_tech_code_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_technology = await this.page.locator(this.last_technology_in_grid).textContent();
        const grid_tech_code = await this.page.locator(this.last_tech_code_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check Matching of Grid and Card Info
        await expect.soft(card_technology, "Technology is not match").toBe(grid_technology)
        await expect.soft(card_tech_code, "Tech Code is not match").toBe(grid_tech_code)
        await expect.soft(Number(count_of_items_after), "Element is not created").toEqual(Number(count_of_items_before) + 1)
    }

    async read_technology(){
        // Find Any Technology
        const bp = new BasePage()

        // Get Info From Grid
        const grid_technology = await this.page.locator(this.last_technology_in_grid).textContent();
        const grid_tech_code = await this.page.locator(this.last_tech_code_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_technology = await this.page.locator(this.input_technology_card).inputValue()
        const card_tech_code = await this.page.locator(this.input_tech_code_card).inputValue()


        // Check the Matching of Grid and Card Info
        await expect.soft(card_technology, "Technology is not match").toBe(grid_technology)
        await expect.soft(card_tech_code, "Tech Code is not match").toBe(grid_tech_code)

    }

    async update_technology(){
        // Get Last Technology Info from Grid Before Update
        const bp = new BasePage()
        const id_before = await this.page.locator(bp.last_item_name).textContent();
        const technology_before = await this.page.locator(this.last_technology_in_grid).textContent();
        const tech_code_before = await this.page.locator(this.last_tech_code_in_grid).textContent();

        // Update Last Technology
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_technology_card).clear();
        await this.page.fill(this.input_technology_card, faker.location.city() + " Technology");
        await this.page.locator(this.input_technology_ru_card).clear();
        await this.page.fill(this.input_technology_ru_card, faker.location.city());
        await this.page.locator(this.input_tech_code_card).clear();
        await this.page.fill(this.input_tech_code_card, String(faker.number.int(1000)));
        await this.page.locator(this.spittable_swither_card).click()

        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // Get Last Brand Info from Grid After Update
        await this.page.locator(bp.x_icon).click()
        await this.page.reload()
        const id_after = await this.page.locator(bp.last_item_name).textContent();
        const technology_after = await this.page.locator(this.last_technology_in_grid).textContent();
        const tech_code_after = await this.page.locator(this.last_tech_code_in_grid).textContent();

        // Check Update
        await expect.soft(id_before, "Technology ID is changed").toBe(id_after)
        await expect.soft(technology_before, "Technology is not changed").not.toBe(technology_after)
        await expect.soft(tech_code_before, "Tech Code is not changed").not.toBe(tech_code_after)

    }
}
