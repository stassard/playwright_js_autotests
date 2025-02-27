import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';
import {ProductsPage} from "./ProductsPage";


exports.CogsesPage = class CogsesPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Product
        this.input_start_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Start Date input
        this.input_end_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[2]"  // End Date input
        this.input_cogs_card = "(//span[contains(@data-pc-name,'inputnumber')]/input[contains(@data-pc-name,'pcinput')])"  // Cogs input

        // Grid
        this.last_product_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[3]"  // Grid last Product ID
        this.last_sku_name_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[4]"  // Grid last SKU Name
        this.last_cogs_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[5]"  // Grid last Cogs
        this.last_start_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[6]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[7]"  // Grid last End Date

        this.any_product_id_in_grid = `(//span[text()='Product ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Product ID
        this.any_sku_name_in_grid = `(//span[text()='SKU Name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any SKU Name
        this.any_cogs_in_grid = `(//span[text()='Cogs']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Cogs
        this.any_start_date_in_grid = `(//span[text()='Start date']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Start Date
        this.any_end_date_in_grid = `(//span[text()='End date']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any End Date

        // Created form
        this.x_icon_inside_start_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[1]"   // X icon in the Start Date input
        this.x_icon_inside_end_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[2]"     // X icon in the End Date input
    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_cogses).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("COGS")
    }

    async create_element(product_dropdown, start_date, end_date, cogs){
        // Create New Cogs
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
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(product_dropdown).click()
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_cogs_card, cogs)

        // Get Info From Card
        // const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        // const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        // const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()
        // const card_cogs = await this.page.locator(this.input_cogs_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_product = await this.page.locator(this.last_sku_name_in_grid).textContent();
        // const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();
        // const grid_cogs = await this.page.locator(this.last_cogs_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()


        // Check Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        // Find Any Cogs
        const bp = new BasePage()
        const pp = new ProductsPage()
        
        // Get Info From Grid
        const grid_id = await this.page.locator(bp.first_item_name).textContent();
        const grid_sku_name = await this.page.locator(this.last_sku_name_in_grid).textContent();
        const grid_cogs = await this.page.locator(this.last_cogs_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_cogs = await this.page.locator(this.input_cogs_card).inputValue()
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        // Check Matching of Grid and Card Info
        await expect.soft(card_id, "Cogs ID [Grid and Card] is not match").toBe(grid_id)
        await expect.soft(grid_sku_name, "Product Name [Grid and Card] is not match").toBe(card_product)
        await expect.soft(grid_cogs, "Cogs [Grid and Card] is not match").toBe(card_cogs)
        await expect.soft(grid_start_date, "Start Date is not match").toBe(card_start_date)
        await expect.soft(grid_end_date, "End Date is not match").toBe(card_end_date)

    }

    async update_element(start_date, end_date, cogs){
        // Get Last Cogs Info from Grid Before Update
        const bp = new BasePage()
        // const id_before = await this.page.locator(bp.first_item_name).textContent();
        // const product_id_before = await this.page.locator(this.last_product_id_in_grid).textContent();
        // const sku_name_before = await this.page.locator(this.last_sku_name_in_grid).textContent();
        const cogs_before = await this.page.locator(this.last_cogs_in_grid).textContent();
        // const start_date_before = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const end_date_before = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click();

        // Update Last Cogs
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.x_icon_inside_start_date_input).click();
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.x_icon_inside_end_date_input).click();
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.input_cogs_card).clear();
        await this.page.fill(this.input_cogs_card, cogs);
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last Cogs Info from Grid After Update
        // const id_after = await this.page.locator(bp.first_item_name).textContent();
        // const product_id_after = await this.page.locator(this.last_product_id_in_grid).textContent();
        // const sku_name_after = await this.page.locator(this.last_sku_name_in_grid).textContent();
        const cogs_after = await this.page.locator(this.last_cogs_in_grid).textContent();
        // const start_date_after = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const end_date_after = await this.page.locator(this.last_end_date_in_grid).textContent();

        // Check the Matching of Grid and Card Info
        await expect.soft(cogs_before, "Cogs is not changed").not.toBe(cogs_after)

    }
}