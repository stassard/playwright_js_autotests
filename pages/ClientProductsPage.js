import {BasePage, getRandomInt} from '../pages/BasePage';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';

// Fake Data
const random_name = faker.commerce.department() + String(getRandomInt(10000, 99999))
const random_external_id = faker.string.numeric({length: { min: 7, max: 10}})
const random_parent= faker.food.adjective() + String(getRandomInt(10000, 99999))
const random_type= faker.food.fruit() + String(getRandomInt(10000, 99999))
const random_start_day= String(getRandomInt(20, 40))
const random_end_day= String(getRandomInt(1, 19))


exports.ClientProductsPage = class ClientProductsPage {
    constructor(page) {
        this.page = page;
        // Creation form
        this.selector_client_id_card = "(//div[contains(@data-pc-name,'select')])[1]"   // Selector Client ID
        this.list_client_id_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']  `       // List of Client ID
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"     // Selector Product
        this.list_product_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`           // List of Product
        this.placeholders = "//span[contains(@class,'p-placeholder')]"  // Selector's placeholder

        // Grid
        this.last_client_id_in_grid = "(//span[text()='Client ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"    // Grid last Cient ID
        this.last_client_name_in_grid = "(//span[text()='Client name']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client Name
        this.last_product_in_grid = "(//span[text()='Product']/following-sibling::div[contains(@class,'relative inline-block')])[1]"     // Grid last Product
        this.last_product_sku_name_in_grid = "(//span[text()='Product SKU Name']/following-sibling::div[contains(@class,'relative inline-block')])[1]"   // Grid last Product SKU Name
        this.any_client_id_in_grid = `(//span[text()='Client ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`     // Grid any Client ID
        this.any_client_name_in_grid = `(//span[text()='Client name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any Client Name
        this.any_product_in_grid = `(//span[text()='Product']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any Product
        this.any_product_sku_name_in_grid = `(//span[text()='Product SKU Name']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`   // Grid any Product SKU Name

        // All Filters
        this.input_client_filters = "(//input[contains(@data-pc-name,'inputtext')])[2]"     // Client input
        this.input_product_filters = "(//input[contains(@data-pc-name,'inputtext')])[3]"    // Product input
    }

    async open_client_products_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_client_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Client Products")
    }

    async create_client_products(){
        // Create New Client Products
        const bp = new BasePage()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.selector_client_id_card).click()
        await this.page.locator(this.list_client_id_card).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(this.list_product_card).click()


        // Get Info From Card
        const card_client_name = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_product_name = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_client_id = await this.page.locator(this.last_client_id_in_grid).textContent();
        const grid_product_id = await this.page.locator(this.last_product_in_grid).textContent();
        const grid_client_name = await this.page.locator(this.last_client_name_in_grid).textContent();
        const grid_product_sku_name = await this.page.locator(this.last_product_sku_name_in_grid).textContent();

        // Get ID of the Chosen Client in the Clients Dictionary
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_clients).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Clients")
        await this.page.fill(bp.input_search_grid, card_client_name)
        await this.page.keyboard.press("Enter");

        let count_1 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count_1++;
            if (count_1 === 10){
                break;
            }
        }

        await this.page.locator(bp.last_item_name).click()
        const expected_client_id = await this.page.locator(bp.item_id).textContent();

        // Get ID of the Chosen Product in the Clients Dictionary
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Products")
        await this.page.fill(bp.input_search_grid, card_product_name)
        await this.page.keyboard.press("Enter");

        let count_2 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count_2++;
            if (count_2 === 10){
                break;
            }
        }

        await this.page.locator(bp.last_item_name).click()
        const expected_product_id = await this.page.locator(bp.item_id).textContent();

        // Check that created Client Products is correct
        await expect.soft(card_client_name, "Client Name is not match").toBe(grid_client_name)
        await expect.soft(card_product_name, "Product Name is not match").toBe(grid_product_sku_name)
        await expect.soft(String(grid_client_id), "Client ID is not match").toBe(expected_client_id)
        await expect.soft(String(grid_product_id), "Product ID is not match").toBe(expected_product_id)

    }

    async read_client_products(){
        // Find Any Client
        const bp = new BasePage()
        const any_id = await this.page.locator(bp.any_item_name).textContent();
        await this.page.fill(bp.input_search_grid, any_id);
        await this.page.keyboard.press("Enter");

        let count = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count++;
            if (count === 10){
                break;
            }
        }

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