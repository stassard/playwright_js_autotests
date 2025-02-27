import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';


exports.ClientProductPricesPage = class ClientProductPricesPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.selector_client_product_id_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Client Product ID
        this.input_price_card = "(//input[contains(@data-pc-name,'pcinput')])[1]"  // Price input
        this.input_start_date_card = "(//input[contains(@data-pc-name,'pcinput')])[2]"  // Start Date input
        this.input_end_date_card = "(//input[contains(@data-pc-name,'pcinput')])[3]"  // End Date input

        // Grid
        this.last_client_product_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[3]" // Grid last Cient Product ID
        this.last_price_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[4]"  // Grid last Price
        this.last_start_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[5]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[6]"  // Grid last End Date
        this.any_client_product_id_in_grid = `(//span[text()='Client Product ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Client Product ID
        this.any_price_in_grid = `(//span[text()='Price']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Price
        this.any_start_date_in_grid = `(//span[text()='Start Date']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Start Date
        this.any_end_date_in_grid = `(//span[text()='End Date']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any End Date


        // Created form
        this.x_icon_inside_start_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[1]"   // X icon in the Start Date input
        this.x_icon_inside_end_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[2]"     // X icon in the End Date input
    }



    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_client_product_prices).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Price lists")
    }

    async create_element(client_product_id_dropdown, price, start_date, end_date){
        // Create New Client Product Price
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
        await this.page.locator(this.selector_client_product_id_card).click()
        await this.page.locator(client_product_id_dropdown).click()
        await this.page.fill(this.input_price_card, price)
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");

        // Get Info From Card
        // const card_client_product_id = await this.page.locator(this.selector_client_product_id_card).getAttribute("model-value-prop");
        // const card_price = await this.page.locator(this.input_price_card).inputValue()
        // const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        // const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_client_product_id = await this.page.locator(this.last_client_product_id_in_grid).textContent();
        // const grid_price = await this.page.locator(this.last_price_in_grid).textContent();
        // const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        // Get Info From Grid
        const bp = new BasePage()
        const grid_id = await this.page.locator(bp.first_item_name).textContent();
        const grid_client_product_id = await this.page.locator(this.last_client_product_id_in_grid).textContent();
        const grid_price = await this.page.locator(this.last_price_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click();

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client_product_id = await this.page.locator(this.selector_client_product_id_card).getAttribute("model-value-prop");
        const card_price = await this.page.locator(this.input_price_card).inputValue()
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        // Check Matching of Grid and Card Info
        await expect.soft(card_id, "Client Product Prices ID is not match").toBe(grid_id)
        await expect.soft(card_client_product_id, "Client Product ID is not match").toBe(grid_client_product_id)
        await expect.soft(card_price, "Price is not match").toBe(grid_price)
        await expect.soft(card_start_date, "Start Date is not match").toBe(grid_start_date)
        await expect.soft(card_end_date, "End Date is not match").toBe(grid_end_date)

    }

    async update_element(price, start_date, end_date){
        // Get Last Client Product Prices Info from Grid Before Update
        const bp = new BasePage()
        // const id_before = await this.page.locator(bp.first_item_name).textContent();
        // const client_product_id_before = await this.page.locator(this.last_client_product_id_in_grid).textContent();
        const price_before = await this.page.locator(this.last_price_in_grid).textContent();
        // const start_date_before = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const end_date_before = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click();

        // Update Last Client Product Prices
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_price_card).clear();
        await this.page.fill(this.input_price_card, price);
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

        // Get Last Client Product Prices Info from Grid After Update
        // const id_after = await this.page.locator(bp.first_item_name).textContent();
        // const client_product_id_after = await this.page.locator(this.last_client_product_id_in_grid).textContent();
        const price_after = await this.page.locator(this.last_price_in_grid).textContent();
        // const start_date_after = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const end_date_after = await this.page.locator(this.last_end_date_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(price_before, "Price is not changed").not.toBe(price_after)
    }
}