import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import {ClientsPage} from "./ClientsPage";
import {ProductsPage} from "./ProductsPage";


exports.MarketingBudgetsPage = class MarketingBudgetsPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.input_budget_name_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Budget Name input
        this.selector_client_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Client
        this.list_client_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Client
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Product
        this.list_product_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Product
        this.selector_marketing_tool_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Marketing Tool
        this.list_marketing_tool_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Marketing Tool
        this.input_qty = "(//span[contains(@data-pc-name,'inputnumber')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Qty input
        this.input_budget = "(//span[contains(@data-pc-name,'inputnumber')]/input[contains(@data-pc-name,'pcinput')])[2]"  // Budget input
        this.input_start_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Start Date input
        this.input_end_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[2]"  // End Date input
        this.selector_budget_type_card = "(//div[contains(@data-pc-name,'select')])[4]"  // Selector Budget Type
        this.selector_pnl_line_card = "(//div[contains(@data-pc-name,'select')])[5]"  // Selector P&L Line
        this.selector_allocation_type_card = "(//div[contains(@data-pc-name,'select')])[6]"  // Selector Allocation Type
        this.button_upload_file_card = "//input[@type='file']"  // Button Upload File
        this.input_comment_card = "//textarea[@type='text']" // Comment input

        // Grid
        this.last_id_in_grid = "(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last ID
        this.last_status_in_grid = "(//span[text()='Status']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Status
        this.last_client_in_grid = "(//span[text()='Client']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Client
        // TODO: Check product column after fixing PSPR-3626
        this.last_product_in_grid = "(//span[text()='product']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Product
        this.last_event_in_grid = "(//span[text()='Event']/following-sibling::div/div[contains(@class,'event')])[1]"  // Grid last Event
        this.last_marketing_tool_in_grid = "(//span[text()='Marketing tool']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Marketing Tool
        this.last_pnl_line_in_grid = "(//span[text()='P&L line']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last P&L line
        this.last_budget_in_grid = "(//span[text()='Budget']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Budget
        this.last_period_start_in_grid = "(//span[text()='Period']/following-sibling::div/div/div[contains(@class,'mr-[5px]')])[1]"  // Grid last Period Start
        this.last_period_end_in_grid = "(//span[text()='Period']/following-sibling::div/div/div/following-sibling::div/following-sibling::div[contains(@class,'ml-[3px]')])[1]"  // Grid last Period End
        this.last_linked_promos_in_grid = "(//span[text()='Linked promos']/following-sibling::div/span)[1]"  // Grid last Linked Promos
        this.last_linked_budgets_in_grid = "(//span[text()='Linked budgets']/following-sibling::div/span)[1]"  // Grid last Linked Budgets
    }

    async open_marketing_budgets_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_marketing_budgets).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Marketing budgets")
    }


}