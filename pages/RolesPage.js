import {BasePage, getRandomInt } from './BasePage.js';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';


exports.RolesPage = class RolesPage {

    constructor(page) {
        this.page = page;

        // Creation form
        this.input_name_card = "//div[@data-test='block-main']//input[contains(@data-pc-name,'inputtext')]" // Name input
        this.default_roles_panel_card = "//div[@class='panel']" // Product's panel
        this.product_counter_card = "//div[@class='bottom-panel']//span[@class='prospace-counter-box']" // Product's counter

        // Grid
        this.last_id_in_grid = "(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"   // Grid last ID
        this.last_description_in_grid = "(//span[text()='Description']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Description
        this.last_roles_count_in_grid = "(//span[text()='Roles count']/following-sibling::div/span)[1]"  // Grid last Roles count

        this.any_id_in_grid = `(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any ID

        // Dialog
        this._1_id_dialog = "((//tbody[@class='p-datatable-tbody'])[2]//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')]/div/div[text()='1'])"  // First ID in the Dialog
        this.select_all_checkbox_dialog = "((//table[@class='p-datatable-table'])[2]//th[@role='columnheader']//div[@class='p-checkbox p-component'])"  // Select All checkbox in the Dialog
        this.checkboxes_dialog = "((//table[@class='p-datatable-table'])[2]//th[@role='columnheader']//div[@class='p-checkbox p-component'])"  // Checkboxex in the Dialog
        this.dialog_container = "(//div[@data-scrollselectors='.p-datatable-wrapper'])[2]"
    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_roles).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Roles")
    }

    async create_element() {
        // Create New Role
        const bp = new BasePage()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_name_card, faker.location.city() + " Rule")
        await this.page.fill(bp.text_input_card, faker.lorem.sentence({min: 10, max: 20}))
        await this.page.locator(this.default_roles_panel_card).click()
        await this.page.locator(bp.button_add_bottom_panel).click()
        while (await this.page.locator(this._1_id_dialog).isVisible() === false) {
            await this.page.locator(this.dialog_container).hover()
            await this.page.mouse.wheel(0, 150000);
        }
        await this.page.locator(this.select_all_checkbox_dialog).click()
        await this.page.locator(bp.button_select_dialog).click()

        // Get Info From Card
        const card_description = await this.page.locator(bp.text_input_card).inputValue()
        const card_name = await this.page.locator(this.input_name_card).inputValue()
        const card_roles_count = await this.page.locator(bp.counter_bottom_panel).first().textContent()
        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        await this.page.reload()

        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_roles_count = await this.page.locator(this.last_roles_count_in_grid).textContent();
        const grid_description = await this.page.locator(this.last_description_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check The Matching of Grid and Card Info
        await expect.soft(card_name, "Rule Name is not match").toBe(grid_name)
        await expect.soft(card_roles_count, "Count of roles is not match").toBe(grid_roles_count)
        await expect.soft(card_description, "Actions Type is not match").toBe(grid_description)
        await expect.soft(Number(count_of_items_after), "Element is not created or created more than 1 product").toBe(Number(count_of_items_before) + 1)
    }

    async read_element(){
        const bp = new BasePage()
        // Get Info From Grid
        // const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_roles_count = await this.page.locator(this.last_roles_count_in_grid).textContent();
        const grid_description = await this.page.locator(this.last_description_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()
        await this.page.locator(bp.mode_switcher).click()

        // Get Info From Card
        const card_name = await this.page.locator(bp.input_name_card).inputValue()
        // const card_id = await this.page.locator(bp.item_id).textContent()
        const card_description = await this.page.locator(bp.text_input_card).inputValue()
        const card_roles_count = await this.page.locator(bp.counter_bottom_panel).first().textContent()

        // Check Matching of Grid and Card Info
        // await expect.soft(card_id, "Role ID is not match").toBe(grid_id)
        await expect.soft(card_name, "Role Name is not match").toBe(grid_name)
        await expect.soft(card_description, "Description is not match").toBe(grid_description)
        await expect.soft(card_roles_count, "Count of roles is not match").toBe(grid_roles_count)
    }

    async update_element(){
        // Get Last Rule Info from Grid Before Update
        const bp = new BasePage()
        const id_before = await this.page.locator(this.last_id_in_grid).textContent();
        const name_before = await this.page.locator(bp.last_item_name).textContent();
        const description_before = await this.page.locator(this.last_description_in_grid).textContent();
        const roles_before = await this.page.locator(this.last_roles_count_in_grid).textContent();

        // Update Last Rule
        await this.page.locator(bp.last_item_name).click()
        await this.page.locator(bp.mode_switcher).click()
        await this.page.locator(this.input_name_card).clear()
        await this.page.fill(this.input_name_card, faker.location.city() + " Rule")
        await this.page.locator(bp.text_input_card).clear()
        await this.page.fill(bp.text_input_card, faker.lorem.sentence({min: 10, max: 20}))
        await this.page.locator(bp.bottom_panel).click()

        let count = 0
        while (count !== 2) {
            await this.page.locator(bp.unselected_checkbox_bottom_panel).click()
            count ++
        }
        const checked_roles = await this.page.locator(bp.counter_checked_checkboxes_bottom_panel).textContent();
        await this.page.locator(bp.button_delete_bottom_panel).click()
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last Rule Info from Grid After Update
        const id_after = await this.page.locator(this.last_id_in_grid).textContent();
        const name_after = await this.page.locator(bp.last_item_name).textContent();
        const description_after = await this.page.locator(this.last_description_in_grid).textContent();
        const roles_after = await this.page.locator(this.last_roles_count_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(id_after, "Rule ID is changed").toBe(id_before)
        await expect.soft(name_after, "Rule Name is not changed").not.toBe(name_before)
        await expect.soft(description_after, "Description is not changed").not.toBe(description_before)
        await expect.soft(Number(roles_after), "Count of options is changed").toBe(Number(roles_before) - Number(checked_roles))
    }
}