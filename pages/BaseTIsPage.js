import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';
import {ClientsPage} from "./ClientsPage";
import {ProductsPage} from "./ProductsPage";


exports.BaseTisPage = class BaseTisPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.selector_client_id_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Client ID
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Product
        this.input_start_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Start Date input
        this.input_end_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[2]"  // End Date input
        this.input_basetis_card = "(//span[contains(@data-pc-name,'inputnumber')]/input[contains(@data-pc-name,'pcinput')])"  // Cogs input

        // Grid
        this.last_client_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[3]"  // Grid last Client
        this.last_client_external_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[4]"  // Grid last Client External ID
        this.last_baseti_product_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[5]"  // Grid last BaseTi Product
        this.last_ean_pc_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[6]"  // Grid last EAN Pc
        this.last_baseti_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[7]"  // Grid last BaseTi
        this.last_start_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[8]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[9]"  // Grid last End Date

        // Created form
        this.x_icon_inside_start_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[1]"   // X icon in the Start Date input
        this.x_icon_inside_end_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[2]"     // X icon in the End Date input
    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_basetis).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Trade terms")
    }

    async create_element(client_id_dropdown, product_dropdown, start_date, end_date, basetis){
        // Create New BaseTis
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
        await this.page.locator(this.selector_client_id_card).click()
        await this.page.locator(client_id_dropdown).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(product_dropdown).click()
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_basetis_card, basetis)

        // // Get Info From Card
        // const card_client = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        // const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        // const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        // const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()
        // const card_baseti = await this.page.locator(this.input_basetis_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        // const grid_product = await this.page.locator(this.last_baseti_product_in_grid).textContent();
        // const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();
        // const grid_baseti = await this.page.locator(this.last_baseti_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        // Get Info From Grid
        const bp = new BasePage()
        const grid_id = await this.page.locator(bp.first_item_name).textContent();
        const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_baseti_product_in_grid).textContent();
        const grid_baseti = await this.page.locator(this.last_baseti_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()
        const card_baseti = await this.page.locator(this.input_basetis_card).inputValue()

        // Check Matching of Grid and Card Info
        await expect.soft(grid_id, "BaseTi ID [Grid and Card] is not match").toBe(card_id)
        await expect.soft(grid_client, "Client Name [Grid and Card] is not match").toBe(card_client)
        await expect.soft(grid_product, "Product Name [Grid and Card] is not match").toBe(card_product)
        await expect.soft(grid_baseti, "BaseTi [Grid and Card] is not match").toBe(card_baseti)
        await expect.soft(grid_start_date, "Start Date is not match").toBe(card_start_date)
        await expect.soft(grid_end_date, "End Date is not match").toBe(card_end_date)

    }

    async update_element(start_date, end_date, basetis){
        // Get Last BaseTi Info from Grid Before Update
        const bp = new BasePage()
        // const id_before = await this.page.locator(bp.first_item_name).textContent();
        // const client_before = await this.page.locator(this.last_client_in_grid).textContent();
        // const client_external_id_before = await this.page.locator(this.last_client_external_id_in_grid).textContent();
        // const product_before = await this.page.locator(this.last_baseti_product_in_grid).textContent();
        // const ean_pc_before = await this.page.locator(this.last_ean_pc_in_grid).textContent();
        const baseti_before = await this.page.locator(this.last_baseti_in_grid).textContent();
        // const start_date_before = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const end_date_before = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click();

        // Update Last BaseTi
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.x_icon_inside_start_date_input).click();
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.x_icon_inside_end_date_input).click();
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.input_basetis_card).clear();
        await this.page.fill(this.input_basetis_card, basetis);
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last BaseTi Info from Grid After Update
        // const id_after = await this.page.locator(bp.first_item_name).textContent();
        // const client_after = await this.page.locator(this.last_client_in_grid).textContent();
        // const client_external_id_after = await this.page.locator(this.last_client_external_id_in_grid).textContent();
        // const product_after = await this.page.locator(this.last_baseti_product_in_grid).textContent();
        // const ean_pc_after = await this.page.locator(this.last_ean_pc_in_grid).textContent();
        const baseti_after = await this.page.locator(this.last_baseti_in_grid).textContent();
        // const start_date_after = await this.page.locator(this.last_start_date_in_grid).textContent();
        // const end_date_after = await this.page.locator(this.last_end_date_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(baseti_before, "BaseTi is not changed").not.toBe(baseti_after)


    }
}