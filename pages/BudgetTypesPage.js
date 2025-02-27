import {BasePage, getRandomInt} from './BasePage.js';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';

exports.BudgetTypesPage = class BudgetTypesPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.input_name_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Name input
        this.selector_default_pnl_line_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Default P&L line

        // Grid
        this.last_default_pnl_line_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[3]"  // Grid last Default P&L line

        this.any_default_pnl_line_in_grid = `(//span[text()='Default P&L line']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 5)]}]`  // Grid any Default P&L line
    }

    async open_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_budget_types).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Budgets types")
    }


    async create_element(name, default_pnl_line_dropdown){
        // Create New Budget Type
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
        await this.page.fill(this.input_name_card, name)
        await this.page.locator(this.selector_default_pnl_line_card).click()
        await this.page.locator(default_pnl_line_dropdown).click()

        // Get Info From Card
        // const card_name = await this.page.locator(this.input_name_card).inputValue();
        // const card_default_pnl_line = await this.page.locator(this.selector_default_pnl_line_card).getAttribute("model-value-prop");

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_name = await this.page.locator(bp.first_item_name).textContent();
        // const grid_default_pnl_line = await this.page.locator(this.last_default_pnl_line_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()


        // Check Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        // Find Any Budget Type
        const bp = new BasePage()
        
        // Get Info From Grid
        const grid_name = await this.page.locator(bp.first_item_name).textContent();
        const grid_default_pnl_line = await this.page.locator(this.last_default_pnl_line_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click()

        // Get Info From Card
        await this.page.locator(bp.first_item_name).click();
        const card_name = await this.page.locator(this.input_name_card).inputValue();
        const card_default_pnl_line = await this.page.locator(this.selector_default_pnl_line_card).getAttribute("model-value-prop");

        // Check Matching of Grid and Card Info
        await expect.soft(card_name, "Budget Type Name is not match").toBe(grid_name)
        await expect.soft(card_default_pnl_line, "Default P&L Line is not match").toBe(grid_default_pnl_line)

}
    async update_element(name){
        // Get Last Budget Type Info from Grid Before Update
        const bp = new BasePage()
        const name_before = await this.page.locator(bp.first_item_name).textContent();
        // const default_pnl_before = await this.page.locator(this.last_default_pnl_line_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click();

        // Update Last Cogs
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.fill(this.input_name_card, name)
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // TODO: X icon Locator changes after saving
        await this.page.locator(bp.x_icon).click();

        // Get Last Budget Type Info from Grid After Update
        const name_after = await this.page.locator(bp.first_item_name).textContent();
        // const default_pnl_after = await this.page.locator(this.last_default_pnl_line_in_grid).textContent();

        // Check the Matching of Grid and Card Info
        await expect.soft(name_before, "Budget Type Name is not changed").not.toBe(name_after)

    }

}