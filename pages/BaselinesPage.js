import {BasePage, currentDate, random_end_date, random_start_date, getRandomInt} from './BasePage.js';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';


exports.BaselinesPage = class BaselinesPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.selector_client_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Client
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Product
        this.input_qty = "(//input[contains(@data-pc-name,'pcinput')])[1]"  // Qty input
        this.input_start_date_card = "(//input[contains(@data-pc-name,'pcinput')])[2]"  // Start Date input
        this.input_end_date_card = "(//input[contains(@data-pc-name,'pcinput')])[3]"  // End Date input

        // Grid
        this.last_product_sku_name_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[3]" // Grid last Product SKU Name
        this.last_ean_pc_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[4]"  // Grid last EAN pc
        this.last_product_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[5]"  // Grid last Product ID
        this.last_client_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[6]"  // Grid last Client ID
        this.last_client_external_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[7]"  // Grid last Client External ID
        this.last_client_name_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[8]"  // Grid last Client Name
        this.last_qty_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[9]"  // Grid last Qty per day
        this.last_start_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[10]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[11]"  // Grid last End Date

        this.any_product_sku_name_in_grid = `(//span[text()='Product SKU name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]` // Grid any Product SKU Name
        this.any_ean_pc_in_grid = `(//span[text()='EAN Pc']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any EAN pc
        this.any_product_id_in_grid = `(//span[text()='ProductId']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Product ID
        this.any_client_id_in_grid = `(//span[text()='ClientId']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Client ID
        this.any_client_external_id_in_grid = `(//span[text()='Client External ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Client External ID
        this.any_client_name_in_grid = `(//span[text()='Client name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Client Name
        this.any_qty_in_grid = `(//span[text()='Qty per day']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Qty per day
        this.any_start_date_in_grid = `(//span[text()='StartDate']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Start Date
        this.any_end_date_in_grid = `(//span[text()='EndDate']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any End Date

        // Created form
        this.x_icon_inside_start_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[1]"   // X icon in the Start Date input
        this.x_icon_inside_end_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[2]"     // X icon in the End Date input

    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_baselines).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Baselines")
    }

    async create_element(client_dropdown, product_dropdown, qty, start_date, end_date){
        // Create New Baseline
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.selector_client_card).click()
        await this.page.locator(client_dropdown).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(product_dropdown).click()
        await this.page.fill(this.input_qty, qty)
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // // Get Info From Grid
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // // Check Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        // Get Info From Grid
        const bp = new BasePage()
        const grid_id = await this.page.locator(bp.first_item_name).textContent();
        const grid_client = await this.page.locator(this.last_client_name_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_product_sku_name_in_grid).textContent();
        const grid_qty = await this.page.locator(this.last_qty_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_qty = await this.page.locator(this.input_qty).inputValue()
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        // Check Matching of Grid and Card Info
        await expect.soft(card_id, "Baseline ID [Grid and Card] is not match").toBe(grid_id)
        await expect.soft(grid_product, "Product Name [Grid and Card] is not match").toBe(card_product)
        await expect.soft(grid_client, "Client Name [Grid and Card] is not match").toBe(card_client)
        await expect.soft(grid_qty, "Qty per day [Grid and Card] is not match").toBe(card_qty)
        await expect.soft(grid_start_date, "Start Date is not match").toBe(card_start_date)
        await expect.soft(grid_end_date, "End Date is not match").toBe(card_end_date)

    }

    async update_element(qty, start_date, end_date){
        // Get Last Baseline Info from Grid Before Update
        const bp = new BasePage()
        const qty_before = await this.page.locator(this.last_qty_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click();

        // Update Last Baseline
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_qty).clear();
        await this.page.fill(this.input_qty, qty);
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

        // Get Last Baseline Info from Grid After Update
        const qty_after = await this.page.locator(this.last_qty_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(qty_before, "Qty per day is not changed").not.toBe(qty_after)

    }
}