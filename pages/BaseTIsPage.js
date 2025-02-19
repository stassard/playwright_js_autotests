import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import {ClientsPage} from "./ClientsPage";
import {ProductsPage} from "./ProductsPage";


exports.BaseTisPage = class BaseTisPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.selector_client_id_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Client ID
        this.list_client_id_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Client ID
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Product
        this.list_product_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Product
        this.input_start_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Start Date input
        this.input_end_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[2]"  // End Date input
        this.input_basetis_card = "(//span[contains(@data-pc-name,'inputnumber')]/input[contains(@data-pc-name,'pcinput')])"  // Cogs input

        // Grid
        this.last_client_in_grid = "(//span[text()='Client']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client
        this.last_client_external_id_in_grid = "(//span[text()='Client External ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client External ID
        this.last_baseti_product_in_grid = "(//span[text()='BaseTi Product']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last BaseTi Product
        this.last_ean_pc_in_grid = "(//span[text()='EAN Pc']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last EAN Pc
        this.last_baseti_in_grid = "(//span[text()='BaseTi']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last BaseTi
        this.last_start_date_in_grid = "(//span[text()='StartDate']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//span[text()='EndDate']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last End Date

        // Created form
        this.x_icon_inside_start_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[1]"   // X icon in the Start Date input
        this.x_icon_inside_end_date_input = "(//span[contains(@data-pc-name,'datepicker')]/following-sibling::div[contains(@class,'absolute')]/div[contains(@class,'flex')])[2]"     // X icon in the End Date input
    }

    async open_basetis_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_basetis).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Trade terms")
    }

    async create_basetis(){
        // Create New BaseTis
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.selector_client_id_card).click()
        await this.page.locator(this.list_client_id_card).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(this.list_product_card).click()
        await this.page.fill(this.input_start_date_card, currentDate)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, random_end_date())
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_basetis_card, String(faker.number.int({min: 100, max: 999})))

        // Get Info From Card
        const card_client = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()
        const card_baseti = await this.page.locator(this.input_basetis_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_baseti_product_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();
        const grid_baseti = await this.page.locator(this.last_baseti_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()


        // Check Matching of Grid and Card Info
        await expect.soft(card_client, "Client is not match").toBe(grid_client)
        await expect.soft(card_product, "Product is not match").toBe(grid_product)
        await expect.soft(card_start_date, "Start Date is not match").toBe(grid_start_date)
        await expect.soft(card_end_date, "End Date is not match").toBe(grid_end_date)
        await expect.soft(card_baseti, "BaseTi is not match").toBe(grid_baseti)
        await expect.soft(Number(count_of_items_after), "Element is not created").toEqual(Number(count_of_items_before) + 1)
    }

    async read_baseti(){
        // Find Any BaseTi
        const bp = new BasePage()
        const cp = new ClientsPage()
        const pp = new ProductsPage()
        // Get Info From Grid
        const grid_id = await this.page.locator(bp.last_item_name).textContent();
        const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_client_external_id = await this.page.locator(this.last_client_external_id_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_baseti_product_in_grid).textContent();
        const grid_ean_pc = await this.page.locator(this.last_ean_pc_in_grid).textContent();
        const grid_baseti = await this.page.locator(this.last_baseti_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()
        const card_baseti = await this.page.locator(this.input_basetis_card).inputValue()


        // Find Chosen Client
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_clients).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Clients")
        await this.page.fill(bp.input_search_grid, grid_client);
        await this.page.keyboard.press("Enter");

        let count_1 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() !== "1") {
            await this.page.waitForTimeout(1000)
            count_1++;
            if (count_1 === 50){
                let res = undefined;
                await expect.soft(res, "Element is not find").not.toBeUndefined()
                await browserContext.close();
            }
        }

        // Get Info About Client From Grid
        const client_name = await this.page.locator(bp.last_item_name).textContent();
        const client_external_id = await this.page.locator(cp.last_external_id_in_grid).textContent();

        // Find Chosen Product
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Products")
        await this.page.fill(bp.input_search_grid, grid_product);
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
        const product_eanp = await this.page.locator(pp.last_eanp_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(grid_id, "BaseTi ID [Grid and Card] is not match").toBe(card_id)
        await expect.soft(grid_client, "Client Name [Grid and Client Dictionary] is not match").toBe(client_name)
        await expect.soft(grid_client, "Client Name [Grid and Card] is not match").toBe(card_client)
        await expect.soft(grid_client_external_id, "EAN pc [Grid and Client Dictionary] is not match").toBe(client_external_id)
        await expect.soft(grid_product, "Product Name [Grid and Card] is not match").toBe(card_product)
        await expect.soft(grid_product, "Product Name [Grid and Product Dictionary] is not match").toBe(product_name)
        await expect.soft(grid_ean_pc, "EAN pc [Grid and Product Dictionary] is not match").toBe(product_eanp)
        await expect.soft(grid_baseti, "BaseTi [Grid and Card] is not match").toBe(card_baseti)
        await expect.soft(grid_start_date, "Start Date is not match").toBe(card_start_date)
        await expect.soft(grid_end_date, "End Date is not match").toBe(card_end_date)

    }

    async update_baseti(){
        // Get Last BaseTi Info from Grid Before Update
        const bp = new BasePage()
        const id_before = await this.page.locator(bp.last_item_name).textContent();
        const client_before = await this.page.locator(this.last_client_in_grid).textContent();
        const client_external_id_before = await this.page.locator(this.last_client_external_id_in_grid).textContent();
        const product_before = await this.page.locator(this.last_baseti_product_in_grid).textContent();
        const ean_pc_before = await this.page.locator(this.last_ean_pc_in_grid).textContent();
        const baseti_before = await this.page.locator(this.last_baseti_in_grid).textContent();
        const start_date_before = await this.page.locator(this.last_start_date_in_grid).textContent();
        const end_date_before = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click();

        // Update Last BaseTi
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.x_icon_inside_start_date_input).click();
        await this.page.fill(this.input_start_date_card, random_start_date())
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.x_icon_inside_end_date_input).click();
        await this.page.fill(this.input_end_date_card, random_end_date())
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.input_basetis_card).clear();
        await this.page.fill(this.input_basetis_card, String(faker.number.int({min: 100, max: 999})));
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last BaseTi Info from Grid After Update
        const id_after = await this.page.locator(bp.last_item_name).textContent();
        const client_after = await this.page.locator(this.last_client_in_grid).textContent();
        const client_external_id_after = await this.page.locator(this.last_client_external_id_in_grid).textContent();
        const product_after = await this.page.locator(this.last_baseti_product_in_grid).textContent();
        const ean_pc_after = await this.page.locator(this.last_ean_pc_in_grid).textContent();
        const baseti_after = await this.page.locator(this.last_baseti_in_grid).textContent();
        const start_date_after = await this.page.locator(this.last_start_date_in_grid).textContent();
        const end_date_after = await this.page.locator(this.last_end_date_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(id_before, "BaseTi ID is changed").toBe(id_after)
        await expect.soft(client_before, "Client Name is changed").toBe(client_after)
        await expect.soft(client_external_id_before, "Client External ID is changed").toBe(client_external_id_after)
        await expect.soft(product_before, "BaseTi Product is changed").toBe(product_after)
        await expect.soft(ean_pc_before, "EAN Pc is changed").toBe(ean_pc_after)
        await expect.soft(baseti_before, "BaseTi is not changed").not.toBe(baseti_after)
        await expect.soft(start_date_before, "Start Date is not changed").not.toBe(start_date_after)
        await expect.soft(end_date_before, "End Date is not changed").not.toBe(end_date_after)

    }
}