import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';

exports.BudgetTypesPage = class BudgetTypesPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.input_name_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Name input
        this.selector_default_pnl_line_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Default P&L line
        this.list_default_pnl_line_card = `//li[@aria-posinset='${[getRandomInt(1, 1)]}']`  // List of Default P&L line
        this.x_icon_card = "(//div/div/button[@type='icon-secondary'])[4]" // X icon in the created card
        this._3_dots_card = "(//div/div/button[@type='icon-secondary'])[2]" // 3 dots in the card

        // Grid
        this.last_default_pnl_line_in_grid = "(//span[text()='Default P&L line']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Default P&L line

        this.any_default_pnl_line_in_grid = `(//span[text()='Default P&L line']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 5)]}]`  // Grid any Default P&L line
    }

    async open_budget_types_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_budget_types).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Budgets types")
    }


    async create_budget_type(){
        // Create New Budget Type
        const bp = new BasePage()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_name_card, faker.location.city() + " Budget type")
        await this.page.locator(this.selector_default_pnl_line_card).click()
        await this.page.locator(this.list_default_pnl_line_card).click()
        await this.page.locator(bp.button_create_card).click()


        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click();
        const card_name = await this.page.locator(this.input_name_card).inputValue();
        const card_default_pnl_line = await this.page.locator(this.selector_default_pnl_line_card).getAttribute("model-value-prop");
        await this.page.locator(this.x_icon_card).click();


        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_default_pnl_line = await this.page.locator(this.last_default_pnl_line_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()


        // Check Matching of Grid and Card Info
        await expect.soft(card_name, "Budget Types Name is not match").toEqual(grid_name)
        await expect.soft(card_default_pnl_line, "Default P&L Line is not match").toEqual(grid_default_pnl_line)
        await expect.soft(Number(count_of_items_after), "Element is not created or created more than 1 product").toEqual(Number(count_of_items_before) + 1)
    }

    async read_budget_type(){
        // Find Any Budget Type
        const bp = new BasePage()
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
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_default_pnl_line = await this.page.locator(this.last_default_pnl_line_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click();
        const card_name = await this.page.locator(this.input_name_card).inputValue();
        const card_default_pnl_line = await this.page.locator(this.selector_default_pnl_line_card).getAttribute("model-value-prop");

        // Check Matching of Grid and Card Info
        await expect.soft(card_name, "Budget Type Name is not match").toBe(grid_name)
        await expect.soft(card_default_pnl_line, "Default P&L Line is not match").toBe(grid_default_pnl_line)

}
    async update_budget_type(){
        // Get Last Budget Type Info from Grid Before Update
        const bp = new BasePage()
        const name_before = await this.page.locator(bp.last_item_name).textContent();
        const default_pnl_before = await this.page.locator(this.last_default_pnl_line_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click();

        // Update Last Cogs
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.fill(this.input_name_card, faker.location.city() + " Budget Type")
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // TODO: X icon Locator changes after saving
        await this.page.locator("(//div/div/button[@type='icon-secondary'])[5]").click();

        // Get Last Budget Type Info from Grid After Update
        const name_after = await this.page.locator(bp.last_item_name).textContent();
        const default_pnl_after = await this.page.locator(this.last_default_pnl_line_in_grid).textContent();

        // Check the Matching of Grid and Card Info
        await expect.soft(name_before, "Budget Type Name is not changed").not.toBe(name_after)
        await expect.soft(default_pnl_before, "Start Date is changed").toBe(default_pnl_after)

    }

    async restore_budget_type_using_card(){
        const bp = new BasePage();
        await this.page.locator(bp.deleted_tab_grid).click()

        let count_1 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count_1++;
            if (count_1 === 10) {
                break;
            }
        }
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.last_item_name).click()
        await this.page.locator(this._3_dots_card).click()
        await this.page.locator(bp.link_restore_in_3_dots).click()
        await expect.soft(this.page.locator(bp.button_restore_item), "Confirmation window is not appeared").toBeVisible();
        await this.page.locator(bp.button_restore_item).click()
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        await this.page.reload()
        await this.page.locator(bp.deleted_tab_grid).click()

        let count_2 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(100)
            count_2++;
            if (count_2 === 10) {
                break;
            }
        }
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Element is not deleted").toEqual(Number(count_of_items_before) - 1)

    }
}