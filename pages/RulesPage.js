import {BasePage, getRandomInt } from './BasePage.js';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';

exports.RulesPage = class RulesPage {

    constructor(page) {
        this.page = page;

        // Creation form
        this.button_add_new_condition_card = "//button[@aria-label='Add new condition']"  // Button Add New Condition
        this.selector_option_card = "(//div[contains(@class,'p-treeselect-trigger')])" // Selector Option
        this.contract_discount_option_card = "//li[@aria-label='Contract Discount']" // Contract Discount in Option
        this.selector_operation_card = "(//div[contains(@data-pc-name,'select')])[1]" // Selector Operation
        this.less_operation_card = "//li[@aria-label='<']" // Operator < in Operation
        this.input_value_card = "//input[contains(@data-pc-name,'pcinput')]" // Value input
        this.selector_action_card = "(//div[contains(@data-pc-name,'select')])[2]" // Selector Action
        this.list_action_card = `//li[@aria-posinset='${[getRandomInt(1, 3)]}']` // List in Action
        this.auto_decline_action_card = "//li[@aria-label='Auto Decline']" // Auto Decline in Action
        this.auto_approve_action_card = "//li[@aria-label='Auto Approve']" // Auto Approve in Action
        this.active_switcher_card = "//div[@class='prospace-panel overflow-auto']//input[@role='switch']" // Active Switcher

        // Grid
        this.last_id_in_grid = "(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"   // Grid last ID
        this.last_options_in_grid = "(//span[text()='Options']/following-sibling::div/span)[1]"  // Grid last Options counter
        this.last_actions_type_in_grid = "(//div[@class='bottom']/div/div[2])[1]"  // Grid last Actions Type

        this.any_id_in_grid = `(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any ID
    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_rules).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Rules")
    }

    async create_element() {
        // Create New Rule
        const bp = new BasePage()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.active_switcher_card).click()
        await this.page.locator(bp.pen_icon_card).click()
        await this.page.fill(bp.input_name_card, faker.location.city() + " Rule")
        await this.page.locator(bp.pen_icon_card).click()
        await this.page.locator(this.selector_option_card).click()
        await this.page.locator(this.contract_discount_option_card).click()
        await this.page.locator(this.selector_operation_card).click()
        await this.page.locator(this.less_operation_card).click()
        await this.page.fill(this.input_value_card, String(getRandomInt(5, 100)))
        await this.page.locator(this.selector_action_card).click()
        await this.page.locator(this.list_action_card).click()

        // Get Info From Card
        const card_action = await this.page.locator(this.selector_action_card).getAttribute("model-value-prop");
        const card_name = await this.page.locator(bp.input_name_card).inputValue()
        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        await this.page.reload()

        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_options = await this.page.locator(this.last_options_in_grid).textContent();
        const grid_actions_type = await this.page.locator(this.last_actions_type_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check The Matching of Grid and Card Info
        await expect.soft(card_name, "Rule Name is not match").toBe(grid_name)
        await expect.soft(grid_options, "Count of options is not match").toBe("1")
        await expect.soft(card_action, "Actions Type is not match").toBe(grid_actions_type)
        await expect.soft(Number(count_of_items_after), "Element is not created or created more than 1 product").toBe(Number(count_of_items_before) + 1)
    }

    async read_element(){
        const bp = new BasePage()
        // Get Info From Grid
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_action_type = await this.page.locator(this.last_actions_type_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_name = await this.page.locator(bp.input_name_card).inputValue()
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_action_type = await this.page.locator(this.selector_action_card).getAttribute("model-value-prop");

        // Check Matching of Grid and Card Info
        await expect.soft(card_id, "Rule ID is not match").toBe(grid_id)
        await expect.soft(card_name, "Rule Name is not match").toBe(grid_name)
        await expect.soft(card_action_type, "Action Type is not match").toBe(grid_action_type)
    }

    async update_element(){
        // Get Last Rule Info from Grid Before Update
        const bp = new BasePage()
        const id_before = await this.page.locator(this.last_id_in_grid).textContent();
        const name_before = await this.page.locator(bp.last_item_name).textContent();
        const options_before = await this.page.locator(this.last_options_in_grid).textContent();

        // Update Last Rule
        await this.page.locator(bp.last_item_name).click()
        await this.page.locator(bp.mode_switcher).click()
        await this.page.locator(this.active_switcher_card).click()
        await this.page.locator(bp.pen_icon_card).click()
        await this.page.fill(bp.input_name_card, faker.location.city() + " Rule")
        await this.page.locator(bp.pen_icon_card).click()
        await this.page.fill(this.input_value_card, String(getRandomInt(5, 100)))
        await this.page.locator(this.selector_action_card).click()
        await this.page.locator(this.list_action_card).click()
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last Rule Info from Grid After Update
        const id_after = await this.page.locator(this.last_id_in_grid).textContent();
        const name_after = await this.page.locator(bp.last_item_name).textContent();
        const options_after = await this.page.locator(this.last_options_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(id_before, "Rule ID is changed").toBe(id_after)
        await expect.soft(name_before, "Rule Name is not changed").not.toBe(name_after)
        await expect.soft(options_before, "Count of options is changed").toBe(options_after)
    }
}