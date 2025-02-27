import {BasePage, getRandomInt} from './BasePage.js';
import {expect} from "@playwright/test";

exports.ClientProductsPage = class ClientProductsPage {
    constructor(page) {
        this.page = page;
        // Creation form
        this.selector_client_id_card = "(//div[contains(@data-pc-name,'select')])[1]"   // Selector Client ID
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"     // Selector Product

        // Grid
        this.last_client_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[3]"    // Grid last Cient ID
        this.last_client_name_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[4]"  // Grid last Client Name
        this.last_product_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[5]"     // Grid last Product
        this.last_product_sku_name_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[6]"   // Grid last Product SKU Name
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

    async create_element(client_id_dropdown, product_dropdown){
        // Create New Client Products
        const bp = new BasePage()
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

        // Get Info From Card
        // const card_client_name = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        // const card_product_name = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_client_name = await this.page.locator(this.last_client_name_in_grid).textContent();
        // const grid_product_sku_name = await this.page.locator(this.last_product_sku_name_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check that created Client Products is correct
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);

    }

    async read_element(){
        // Find Any Client
        const bp = new BasePage()

        // Get Info From Grid
        const grid_id = await this.page.locator(bp.first_item_name).textContent();
        const grid_client_name = await this.page.locator(this.last_client_name_in_grid).textContent();
        const grid_product_sku_name = await this.page.locator(this.last_product_sku_name_in_grid).textContent();

        // Get Info From Card
        await this.page.locator(bp.first_item_name).click();
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client_name = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_product_name = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");

        // Check the Matching of Grid and Card Info
        await expect.soft(String(card_id), "Client Products ID is not match").toBe(grid_id)
        await expect.soft(card_client_name, "Client Name is not match").toBe(grid_client_name)
        await expect.soft(card_product_name, "Product Name is not match").toBe(grid_product_sku_name)
    }



}