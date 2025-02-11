import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';


exports.BaselinesPage = class BaselinesPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.selector_client_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Client
        this.list_client_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Client
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Product
        this.list_product_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Product
        this.input_qty = "(//input[contains(@data-pc-name,'pcinput')])[1]"  // Qty input
        this.input_start_date_card = "(//input[contains(@data-pc-name,'pcinput')])[2]"  // Start Date input
        this.input_end_date_card = "(//input[contains(@data-pc-name,'pcinput')])[3]"  // End Date input

        // Grid
        this.last_product_sku_name_in_grid = "(//span[text()='Product SKU name']/following-sibling::div[contains(@class,'relative inline-block')])[1]" // Grid last Product SKU Name
        this.last_ean_pc_in_grid = "(//span[text()='EAN Pc']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last EAN pc
        this.last_product_id_in_grid = "(//span[text()='ProductId']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Product ID
        this.last_client_id_in_grid = "(//span[text()='ClientId']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client ID
        this.last_client_external_id_in_grid = "(//span[text()='Client External ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client External ID
        this.last_client_name_in_grid = "(//span[text()='Client name']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client Name
        this.last_qty_in_grid = "(//span[text()='Qty per day']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Qty per day
        this.last_start_date_in_grid = "(//span[text()='StartDate']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Start Date
        this.last_end_date_in_grid = "(//span[text()='EndDate']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last End Date

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

    async open_baselines_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_baselines).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Baselines")
    }

    async create_baseline(){
        // Create New Baseline
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.selector_client_card).click()
        await this.page.locator(this.list_client_card).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(this.list_product_card).click()
        await this.page.fill(this.input_qty, String(faker.number.int({min: 100, max: 999})))
        await this.page.fill(this.input_start_date_card, currentDate)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, random_end_date)
        await this.page.keyboard.press("Enter");

        // Get Info From Card
        const card_client = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_qty = await this.page.locator(this.input_qty).inputValue()
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_client = await this.page.locator(this.last_client_name_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_product_sku_name_in_grid).textContent();
        const grid_qty = await this.page.locator(this.last_qty_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check Matching of Grid and Card Info
        await expect.soft(card_client, "Client is not match").toBe(grid_client)
        await expect.soft(card_product, "Product is not match").toBe(grid_product)
        await expect.soft(card_qty, "Qty is not match").toBe(grid_qty)
        await expect.soft(card_start_date, "Start Date is not match").toBe(grid_start_date)
        await expect.soft(card_end_date, "End Date is not match").toBe(grid_end_date)
        await expect.soft(Number(count_of_items_after), "Element is not created").toEqual(Number(count_of_items_before) + 1)
    }

    async read_baseline(){
        // Find Any Baseline
        const bp = new BasePage()
        const cp = new ClientsPage()
        const pp = new ProductsPage()
        const any_id = await this.page.locator(bp.any_item_name).textContent();
        await this.page.fill(bp.input_search_grid, any_id);
        await this.page.keyboard.press("Enter");

        let count = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() !== "1") {
            await this.page.waitForTimeout(1000)
            count++;
            if (count === 50){
                let res = undefined;
                await expect.soft(res, "Element is not find").not.toBeUndefined()
                await browserContext.close();
            }
        }
        // Get Info From Grid
        const grid_id = await this.page.locator(bp.last_item_name).textContent();
        const grid_ean_pc = await this.page.locator(this.last_ean_pc_in_grid).textContent();
        const grid_product_id = await this.page.locator(this.last_product_id_in_grid).textContent();
        const grid_client_id = await this.page.locator(this.last_client_id_in_grid).textContent();
        const grid_client_external_id = await this.page.locator(this.last_client_external_id_in_grid).textContent();
        const grid_client = await this.page.locator(this.last_client_name_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_product_sku_name_in_grid).textContent();
        const grid_qty = await this.page.locator(this.last_qty_in_grid).textContent();
        const grid_start_date = await this.page.locator(this.last_start_date_in_grid).textContent();
        const grid_end_date = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_qty = await this.page.locator(this.input_qty).inputValue()
        const card_start_date = await this.page.locator(this.input_start_date_card).inputValue()
        const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()


        // Find Chosen Client
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_clients).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Clients")
        await this.page.fill(bp.input_search_grid, grid_client_id);
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
        const product_eanp = await this.page.locator(pp.last_eanp_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(card_id, "Baseline ID [Grid and Card] is not match").toBe(grid_id)
        await expect.soft(grid_product, "Product Name [Grid and Card] is not match").toBe(card_product)
        await expect.soft(grid_product, "Product Name [Grid and Product Dictionary] is not match").toBe(product_name)
        await expect.soft(grid_ean_pc, "EAN pc [Grid and Product Dictionary] is not match").toBe(product_eanp)
        await expect.soft(grid_client_external_id, "EAN pc [Grid and Client Dictionary] is not match").toBe(client_external_id)
        await expect.soft(grid_client, "Client Name [Grid and Client Dictionary] is not match").toBe(client_name)
        await expect.soft(grid_client, "Client Name [Grid and Card] is not match").toBe(card_client)
        await expect.soft(grid_qty, "Qty per day [Grid and Card] is not match").toBe(card_qty)
        await expect.soft(grid_start_date, "Start Date is not match").toBe(card_start_date)
        await expect.soft(grid_end_date, "End Date is not match").toBe(card_end_date)

    }

    async update_baseline(){
        // Get Last Baseline Info from Grid Before Update
        const bp = new BasePage()
        const id_before = await this.page.locator(bp.last_item_name).textContent();
        const ean_pc_before = await this.page.locator(this.last_ean_pc_in_grid).textContent();
        const product_id_before = await this.page.locator(this.last_product_id_in_grid).textContent();
        const client_id_before = await this.page.locator(this.last_client_id_in_grid).textContent();
        const client_external_id_before = await this.page.locator(this.last_client_external_id_in_grid).textContent();
        const client_before = await this.page.locator(this.last_client_name_in_grid).textContent();
        const product_before = await this.page.locator(this.last_product_sku_name_in_grid).textContent();
        const qty_before = await this.page.locator(this.last_qty_in_grid).textContent();
        const start_date_before = await this.page.locator(this.last_start_date_in_grid).textContent();
        const end_date_before = await this.page.locator(this.last_end_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click();

        // Update Last Baseline
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_qty).clear();
        await this.page.fill(this.input_qty, String(faker.number.int({min: 100, max: 999})));
        await this.page.locator(this.x_icon_inside_start_date_input).click();
        await this.page.fill(this.input_start_date_card, random_start_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.x_icon_inside_end_date_input).click();
        await this.page.fill(this.input_end_date_card, random_end_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last Baseline Info from Grid After Update
        const id_after = await this.page.locator(bp.last_item_name).textContent();
        const ean_pc_after = await this.page.locator(this.last_ean_pc_in_grid).textContent();
        const product_id_after = await this.page.locator(this.last_product_id_in_grid).textContent();
        const client_id_after = await this.page.locator(this.last_client_id_in_grid).textContent();
        const client_external_id_after = await this.page.locator(this.last_client_external_id_in_grid).textContent();
        const client_after = await this.page.locator(this.last_client_name_in_grid).textContent();
        const product_after = await this.page.locator(this.last_product_sku_name_in_grid).textContent();
        const qty_after = await this.page.locator(this.last_qty_in_grid).textContent();
        const start_date_after = await this.page.locator(this.last_start_date_in_grid).textContent();
        const end_date_after = await this.page.locator(this.last_end_date_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(id_before, "Baseline ID is changed").toBe(id_after)
        await expect.soft(product_before, "Product SKU Name is changed").toBe(product_after)
        await expect.soft(ean_pc_before, "EAN Pc is changed").toBe(ean_pc_after)
        await expect.soft(product_id_before, "Product ID is changed").toBe(product_id_after)
        await expect.soft(client_id_before, "Client ID is changed").toBe(client_id_after)
        await expect.soft(client_external_id_before, "Client External ID is changed").toBe(client_external_id_after)
        await expect.soft(client_before, "Client Name is changed").toBe(client_after)
        await expect.soft(qty_before, "Qty per day is not changed").not.toBe(qty_after)
        await expect.soft(start_date_before, "Start Date is not changed").not.toBe(start_date_after)
        await expect.soft(end_date_before, "End Date is not changed").not.toBe(end_date_after)

    }
}