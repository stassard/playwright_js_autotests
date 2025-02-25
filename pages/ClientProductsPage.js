import {BasePage, getRandomInt} from './BasePage.js';
import {expect} from "@playwright/test";

exports.ClientProductsPage = class ClientProductsPage {
    constructor(page) {
        this.page = page;
        // Creation form
        this.selector_client_id_card = "(//div[contains(@data-pc-name,'select')])[1]"   // Selector Client ID
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"     // Selector Product

        // Grid
        this.last_client_id_in_grid = "(//span[text()='Client ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"    // Grid last Cient ID
        this.last_client_name_in_grid = "(//span[text()='Client name']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client Name
        this.last_product_in_grid = "(//span[text()='Product ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"     // Grid last Product
        this.last_product_sku_name_in_grid = "(//span[text()='Product SKU Name']/following-sibling::div[contains(@class,'relative inline-block')])[1]"   // Grid last Product SKU Name
        this.any_client_id_in_grid = `(//span[text()='Client ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`     // Grid any Client ID
        this.any_client_name_in_grid = `(//span[text()='Client name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any Client Name
        this.any_product_in_grid = `(//span[text()='Product']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any Product
        this.any_product_sku_name_in_grid = `(//span[text()='Product SKU Name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`   // Grid any Product SKU Name

        // All Filters
        this.input_client_filters = "(//input[contains(@data-pc-name,'inputtext')])[2]"     // Client input
        this.input_product_filters = "(//input[contains(@data-pc-name,'inputtext')])[3]"    // Product input
    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_client_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Client Products")
    }

    async create_element(dropdown_element_1, dropdown_element_2){
        // Create New Client Products
        const bp = new BasePage()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.selector_client_id_card).click()
        await this.page.locator(dropdown_element_1).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(dropdown_element_2).click()

        // Get Info From Card
        const card_client_name = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_product_name = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_client_name = await this.page.locator(this.last_client_name_in_grid).textContent();
        const grid_product_sku_name = await this.page.locator(this.last_product_sku_name_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check that created Client Products is correct
        await expect.soft(card_client_name, "Client Name is not match").toBe(grid_client_name)
        await expect.soft(card_product_name, "Product Name is not match").toBe(grid_product_sku_name)
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);

    }

    async read_element(){
        // Find Any Client
        const bp = new BasePage()

        // Get Info From Grid
        const grid_id = await this.page.locator(bp.last_item_name).textContent();
        const grid_client_name = await this.page.locator(this.last_client_name_in_grid).textContent();
        const grid_product_sku_name = await this.page.locator(this.last_product_sku_name_in_grid).textContent();

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click();
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client_name = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_product_name = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");

        // Check the Matching of Grid and Card Info
        await expect.soft(String(card_id), "Client Products ID is not match").toBe(grid_id)
        await expect.soft(card_client_name, "Client Name is not match").toBe(grid_client_name)
        await expect.soft(card_product_name, "Product Name is not match").toBe(grid_product_sku_name)
    }



}