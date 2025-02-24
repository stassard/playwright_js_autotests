import {BasePage, getRandomInt } from './BasePage.js';
import {expect} from "@playwright/test";


exports.UserClientsPage = class UserClientsPage {

    constructor(page) {
        this.page = page;
        // Creation form
        this.selector_user_email_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector User Email
        this.list_user_email_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of User Email
        this.selector_client_id_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Client ID
        this.list_client_id_card = `//li[@aria-posinset='${[getRandomInt(1, 10)]}']`  // List of Client ID

        // Grid
        this.last_user_id_in_grid = "(//span[text()='User Id']/following-sibling::div[contains(@class,'relative inline-block')])[1]"   // Grid last User ID
        this.last_user_email_in_grid = "(//span[text()='User email']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last User Email
        this.last_client_id_in_grid = "(//span[text()='Client Id']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client ID
        this.last_name_in_grid = "(//span[text()='Name']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Name

        // this.any_technology_in_grid = `(//span[text()='Technology']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Technology
        // this.any_tech_code_in_grid = `(//span[text()='Tech Code']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Tech code
        // this.any_sub_brand_in_grid = `(//span[text()='Sub Brand']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Sub Brand
        // this.any_sub_brand_code_in_grid = `(//span[text()='Sub Brand Code']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Sub Brand Code
    }

    async open_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_user_clients).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("User clients")
    }

    async create_element() {
        // Create New Technology
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.selector_user_email_card).click()
        await this.page.locator(this.list_user_email_card).click()
        await this.page.locator(this.selector_client_id_card).click()
        await this.page.locator(this.list_client_id_card).click()

        // Get Info From Card
        const card_client_id = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_user_email = await this.page.locator(this.selector_user_email_card).getAttribute("model-value-prop");

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Grid
        const grid_client_id = await this.page.locator(this.last_client_id_in_grid).textContent();
        const grid_user_email = await this.page.locator(this.last_user_email_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check Matching of Grid and Card Info
        await expect.soft(card_client_id, "Client ID is not match").toBe(grid_client_id)
        await expect.soft(card_user_email, "User Email is not match").toBe(grid_user_email)
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        const bp = new BasePage()

        // Get Info From Grid
        const grid_id = await this.page.locator(bp.last_item_name).textContent();
        const grid_client_name = await this.page.locator(this.last_name_in_grid).textContent();
        const grid_user_email = await this.page.locator(this.last_user_email_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client_id = await this.page.locator(this.selector_client_id_card).getAttribute("model-value-prop");
        const card_user_email = await this.page.locator(this.selector_user_email_card).getAttribute("model-value-prop");

        // Check Matching of Grid and Card Info
        await expect.soft(grid_id, "User Client ID is not match").toBe(card_id)
        await expect.soft(grid_client_name, "Client Name is not match").toBe(card_client_id)
        await expect.soft(grid_user_email, "User Email is not match").toBe(card_user_email)
    }
}