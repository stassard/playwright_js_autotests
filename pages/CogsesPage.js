import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import {ProductsPage} from "./ProductsPage";
import playwright from "playwright";


exports.CogsesPage = class CogsesPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Product
        this.list_product_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Product
        this.input_start_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Start Date input
        this.input_end_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[2]"  // End Date input
        this.input_cogs_card = "(//span[contains(@data-pc-name,'inputnumber')]/input[contains(@data-pc-name,'pcinput')])"  // Cogs input

        // Grid
        this.last_product_id_in_grid = "(//span[text()='Product ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Product ID
        this.last_sku_name_in_grid = "(//span[text()='SKU Name']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last SKU Name
        this.last_cogs_in_grid = "(//span[text()='Cogs']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Cogs
        this.last_start_date_in_grid = "(//span[text()='Start date']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//span[text()='End date']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last End Date

        this.any_product_id_in_grid = `(//span[text()='Product ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Product ID
        this.any_sku_name_in_grid = `(//span[text()='SKU Name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any SKU Name
        this.any_cogs_in_grid = `(//span[text()='Cogs']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Cogs
        this.any_start_date_in_grid = `(//span[text()='Start date']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Start Date
        this.any_end_date_in_grid = `(//span[text()='End date']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any End Date

        // Created form
        this.x_icon_inside_start_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[1]"   // X icon in the Start Date input
        this.x_icon_inside_end_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[2]"     // X icon in the End Date input
    }

    async open_cogses_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_cogses).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Cogses")
    }

    async create_cogs(){
        // Create New Cogs
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(this.list_product_card).click()
        await this.page.fill(this.input_start_date_card, currentDate)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, random_end_date())
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_cogs_card, String(faker.number.int({min: 100, max: 999})))

        // Get Info From Card
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()
        const card_cogs = await this.page.locator(this.input_cogs_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_product = await this.page.locator(this.last_sku_name_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();
        const grid_cogs = await this.page.locator(this.last_cogs_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()


        // Check Matching of Grid and Card Info
        await expect.soft(card_product, "Product is not match").toBe(grid_product)
        await expect.soft(card_start_date, "Start Date is not match").toBe(grid_start_date)
        await expect.soft(card_end_date, "End Date is not match").toBe(grid_end_date)
        await expect.soft(card_cogs, "Cogs is not match").toBe(grid_cogs)
        await expect.soft(Number(count_of_items_after), "Element is not created").toEqual(Number(count_of_items_before) + 1)
    }

    async read_cogs(){
        // Find Any Cogs
        const bp = new BasePage()
        const pp = new ProductsPage()
        
        // Get Info From Grid
        const grid_id = await this.page.locator(bp.last_item_name).textContent();
        const grid_product_id = await this.page.locator(this.last_product_id_in_grid).textContent();
        const grid_sku_name = await this.page.locator(this.last_sku_name_in_grid).textContent();
        const grid_cogs = await this.page.locator(this.last_cogs_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_cogs = await this.page.locator(this.input_cogs_card).inputValue()
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        // Find Chosen Product
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Products")
        await this.page.fill(bp.input_search_grid, grid_product_id);
        await this.page.keyboard.press("Enter");

        let count_2 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() !== "1") {
            await this.page.waitForTimeout(1000)
            count_2++;
            if (count_2 === 50){
                let res = undefined;
                await expect.soft(res, "Element is not find").not.toBeUndefined()
                await browserContext.close();
            }
        }

        // Get Info About Product From Grid
        const product_name = await this.page.locator(bp.last_item_name).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(card_id, "Cogs ID [Grid and Card] is not match").toBe(grid_id)
        await expect.soft(grid_sku_name, "Product Name [Grid and Card] is not match").toBe(card_product)
        await expect.soft(grid_sku_name, "Product Name [Grid and Product Dictionary] is not match").toBe(product_name)
        await expect.soft(grid_cogs, "Cogs [Grid and Card] is not match").toBe(card_cogs)
        await expect.soft(grid_start_date, "Start Date is not match").toBe(card_start_date)
        await expect.soft(grid_end_date, "End Date is not match").toBe(card_end_date)

    }

    async update_cogs(){
        // Get Last Cogs Info from Grid Before Update
        const bp = new BasePage()
        const id_before = await this.page.locator(bp.last_item_name).textContent();
        const product_id_before = await this.page.locator(this.last_product_id_in_grid).textContent();
        const sku_name_before = await this.page.locator(this.last_sku_name_in_grid).textContent();
        const cogs_before = await this.page.locator(this.last_cogs_in_grid).textContent();
        const start_date_before = await this.page.locator(this.last_start_date_in_grid).textContent();
        const end_date_before = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click();

        // Update Last Cogs
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.x_icon_inside_start_date_input).click();
        await this.page.fill(this.input_start_date_card, random_start_date())
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.x_icon_inside_end_date_input).click();
        await this.page.fill(this.input_end_date_card, random_end_date())
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.input_cogs_card).clear();
        await this.page.fill(this.input_cogs_card, String(faker.number.int({min: 100, max: 999})));
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last Cogs Info from Grid After Update
        const id_after = await this.page.locator(bp.last_item_name).textContent();
        const product_id_after = await this.page.locator(this.last_product_id_in_grid).textContent();
        const sku_name_after = await this.page.locator(this.last_sku_name_in_grid).textContent();
        const cogs_after = await this.page.locator(this.last_cogs_in_grid).textContent();
        const start_date_after = await this.page.locator(this.last_start_date_in_grid).textContent();
        const end_date_after = await this.page.locator(this.last_end_date_in_grid).textContent();

        // Check the Matching of Grid and Card Info
        await expect.soft(id_before, "Cogs ID is changed").toBe(id_after)
        await expect.soft(sku_name_before, "SKU Name is changed").toBe(sku_name_after)
        await expect.soft(product_id_before, "Product ID is changed").toBe(product_id_after)
        await expect.soft(cogs_before, "Cogs is not changed").not.toBe(cogs_after)
        await expect.soft(start_date_before, "Start Date is not changed").not.toBe(start_date_after)
        await expect.soft(end_date_before, "End Date is not changed").not.toBe(end_date_after)

    }
}