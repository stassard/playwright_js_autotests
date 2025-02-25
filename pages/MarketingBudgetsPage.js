import {BasePage, getRandomInt, currentDate, random_end_date, random_start_date} from './BasePage.js';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';
const playwright = require('playwright');



exports.MarketingBudgetsPage = class MarketingBudgetsPage {

    constructor(page) {
        this.page = page
        // Card
        this.input_budget_name_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Budget Name input
        this.selector_client_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Client
        this.selector_product_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector Product
        this.selector_marketing_tool_card = "(//div[contains(@data-pc-name,'select')])[3]"  // Selector Marketing Tool
        this.list_marketing_tool_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Marketing Tool
        this.input_qty = "(//span[contains(@data-pc-name,'inputnumber')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Qty input
        this.input_budget = "(//span[contains(@data-pc-name,'inputnumber')]/input[contains(@data-pc-name,'pcinput')])[2]"  // Budget input
        this.input_start_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[1]"  // Start Date input
        this.input_end_date_card = "(//span[contains(@data-pc-name,'datepicker')]/input[contains(@data-pc-name,'pcinput')])[2]"  // End Date input
        this.selector_budget_type_card = "(//div[contains(@data-pc-name,'select')])[4]"  // Selector Budget Type
        this.selector_pnl_line_card = "(//div[contains(@data-pc-name,'select')])[5]"  // Selector P&L Line
        this.list_pnl_card = `//li[@aria-posinset='1']`  // List of P&L Line
        this.selector_allocation_type_card = "(//div[contains(@data-pc-name,'select')])[6]"  // Selector Allocation Type
        this.manual_allocation_type_card = `//li[@aria-label='Manual']` // Manual Allocation Type
        this.auto_allocation_type_card = `//li[@aria-label='Auto']` // Auto Allocation Type
        this.button_upload_file_card = "//input[@type='file']"  // Button Upload File
        this.status_card = "//div[@data-test='prospace-header']/div[@data-test='header-left']/div[2]/div/div/span" // Status in the Card
        this.header_allocation_type_card = "//div[@data-test='prospace-header']/div[@data-test='header-left']/div[2]/div/div[2]" // Header Allocation Type in the Card
        this.tab_promos = "(//button[@type='button'])[2]" // Tab Promos in the Marketing Budget
        this.button_add_promo = "//button[@aria-label='Add promo']" // Tab Add Promo


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
        this.last_allocation_type_grid = "(//div[@class='bottom']/div/div[2])[1]"  // Grid last Allocation Type

        this.any_id_in_grid = `(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(1, 10)]}]`  // Grid any ID

        // Grid of the Promos tab
        this.checkbox_promos = `((//tbody[contains(@class,'p-datatable-tbody')])[2]/tr/td/div[@class='p-checkbox p-component'])[${[getRandomInt(2, 15)]}]` // Promo tab checkboxes
        this.count_of_items_in_footer_promos = `(//span[@class='text-indigo-950'])[4]` // Count of items in the footer
        this.last_value_in_promos = "(//span[contains(text(),'Value')]/following-sibling::div)[1]"  // Promos last Value
    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_marketing_budgets).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Marketing budgets")
    }

    async create_manual_type_budget(name, client_dropdown, product_dropdown, budget_type_dropdown, qty, budget, start_date, end_date) {
        // Create New Manual Marketing Budget
        const bp = new BasePage()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.input_budget_name_card).clear()
        await this.page.fill(this.input_budget_name_card, name)
        await this.page.locator(this.selector_client_card).click()
        await this.page.locator(client_dropdown).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(product_dropdown).click()
        await this.page.locator(bp.button_add).click()
        await this.page.locator(bp.checkbox_dialog).click()
        await this.page.locator(bp.button_select_dialog).click()
        await this.page.fill(this.input_qty, qty)
        await this.page.fill(this.input_budget, budget)
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.selector_budget_type_card).click()
        await this.page.locator(budget_type_dropdown).click()
        await this.page.locator(this.selector_pnl_line_card).click()
        await this.page.locator(this.list_pnl_card).click()
        await this.page.locator(this.selector_allocation_type_card).click()
        await this.page.locator(this.manual_allocation_type_card).click()
        await this.page.locator(this.button_upload_file_card).setInputFiles('D:\\ProSpace JS Playwright\\uploadFiles\\магнит.jpg')
        await this.page.fill(bp.text_input_card, faker.lorem.sentence({min: 10, max: 20}))

        // Get Info From Card Before Creation
        const card_name_before = await this.page.locator(this.input_budget_name_card).inputValue();
        const card_client_before = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_product_before = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_event_before = await this.page.locator(bp.first_chips_event).getAttribute("title");
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // const card_marketing_tool_before = await this.page.locator(this.selector_marketing_tool_card).getAttribute("model-value-prop");
        const card_budget_before = await this.page.locator(this.input_budget).inputValue();
        const card_qty_before = await this.page.locator(this.input_qty).inputValue();
        const card_start_date_before = await this.page.locator(this.input_start_date_card).inputValue();
        const card_end_date_before = await this.page.locator(this.input_end_date_card).inputValue()
        const card_budget_type_before = await this.page.locator(this.selector_budget_type_card).getAttribute("model-value-prop");
        const card_pnl_line_before = await this.page.locator(this.selector_pnl_line_card).getAttribute("model-value-prop");
        const card_allocation_type_before = await this.page.locator(this.selector_allocation_type_card).getAttribute("model-value-prop");
        const card_file_name_before = await this.page.locator(bp.name_of_added_file).textContent()
        const card_comment_before = await this.page.locator(bp.text_input_card).inputValue()
        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();
        await this.page.reload()

        // Get Info From Grid
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_status = await this.page.locator(this.last_status_in_grid).textContent();
        const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_product_in_grid).textContent();
        const grid_event = await this.page.locator(this.last_event_in_grid).textContent();
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // const grid_marketing_tool = await this.page.locator(this.last_marketing_tool_in_grid).textContent();
        const grid_pnl_line = await this.page.locator(this.last_pnl_line_in_grid).textContent();
        const grid_budget = await this.page.locator(this.last_budget_in_grid).textContent();
        // TODO: Inconsistent data
        // const grid_period_start = await this.page.locator(this.last_period_start_in_grid).textContent();
        // const grid_period_end = await this.page.locator(this.last_period_end_in_grid).textContent();
        const grid_count_linked_budgets = await this.page.locator(this.last_linked_budgets_in_grid).textContent();
        const grid_allocation_type = await this.page.locator(this.last_allocation_type_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Get Info From Card After Creation
        await this.page.locator(bp.last_item_name).click();
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_name_after = await this.page.locator(this.input_budget_name_card).inputValue();
        const card_client_after = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_product_after = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_event_after = await this.page.locator(bp.first_chips_event).getAttribute("title");
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // const card_marketing_tool_after = await this.page.locator(this.selector_marketing_tool_card).getAttribute("model-value-prop");
        const card_budget_after = await this.page.locator(this.input_budget).inputValue();
        const card_qty_after = await this.page.locator(this.input_qty).inputValue();
        const card_start_date_after = await this.page.locator(this.input_start_date_card).inputValue();
        const card_end_date_after = await this.page.locator(this.input_end_date_card).inputValue()
        const card_budget_type_after = await this.page.locator(this.selector_budget_type_card).getAttribute("model-value-prop");
        const card_pnl_line_after = await this.page.locator(this.selector_pnl_line_card).getAttribute("model-value-prop");
        const card_allocation_type_after = await this.page.locator(this.selector_allocation_type_card).getAttribute("model-value-prop");
        const card_status_after = await this.page.locator(this.status_card).textContent();
        const card_allocation_header_after = await this.page.locator(this.header_allocation_type_card).textContent()
        await this.page.locator(bp.mode_switcher).click();
        const card_comment_after = await this.page.locator(bp.text_input_card).inputValue();
        try {
            const card_file_name_after = await this.page.locator(bp.name_of_added_file).textContent({timeout: 5000})
            await expect.soft(card_file_name_before, "File Name is not match [Card Before Saving - Card After Saving]").toBe(card_file_name_after)
        } catch (error) {
            let card_file_name_after = undefined;
            if (error instanceof playwright.errors.TimeoutError)
                await expect.soft(card_file_name_after, "File was not saved").not.toBeUndefined()
        } finally {
            await this.page.locator(bp.x_icon).click();

            // Check The Matching Of Card Info Before And After Saving
            await expect.soft(card_name_before, "Marketing Budget Name is not match [Card Before Saving - Card After Saving]").toBe(card_name_after)
            await expect.soft(card_client_before, "Client Name is not match [Card Before Saving - Card After Saving]").toBe(card_client_after)
            await expect.soft(card_product_before, "Product Name is not match [Card Before Saving - Card After Saving]").toBe(card_product_after)
            await expect.soft(card_event_before, "Event is not match [Card Before Saving - Card After Saving]").toBe(card_event_after)
            // TODO: Uncomment when Marketing Tools dict will be ready for using
            // await expect.soft(card_marketing_tool_before, "Marketing Tool is not match [Card Before Saving - Card After Saving]").toBe(card_marketing_tool_after)
            await expect.soft(card_qty_before, "Qty is not match [Card Before Saving - Card After Saving]").toBe(card_qty_after)
            await expect.soft(card_budget_before, "Budget is not match [Card Before Saving - Card After Saving]").toBe(card_budget_after)
            await expect.soft(card_start_date_before, "Start Date is not match [Card Before Saving - Card After Saving]").toBe(card_start_date_after)
            await expect.soft(card_end_date_before, "End Date is not match [Card Before Saving - Card After Saving]").toBe(card_end_date_after)
            await expect.soft(card_budget_type_before, "Budget Type is not match [Card Before Saving - Card After Saving]").toBe(card_budget_type_after)
            await expect.soft(card_pnl_line_before, "P&L Line is not match [Card Before Saving - Card After Saving]").toBe(card_pnl_line_after)
            await expect.soft(card_allocation_type_before, "Allocation type is not match [Card Before Saving - Card After Saving]").toBe(card_allocation_type_after)
            await expect.soft(card_comment_before, "Comment is not match [Card Before Saving - Card After Saving]").toBe(card_comment_after)
            await bp.create_el_assertion(count_of_items_after, count_of_items_before);

            // Check The Matching of Grid and Card Info
            await expect.soft(card_id, "Marketing Budget ID is not match [Card - Grid]").toBe(grid_id)
            await expect.soft(card_name_before, "Marketing Budget Name is not match [Card - Grid]").toBe(grid_name)
            await expect.soft(card_status_after, "Status is not match [Card - Grid]").toBe(grid_status)
            await expect.soft(card_client_before, "Client Name is not match [Card - Grid]").toBe(grid_client)
            await expect.soft(card_product_before, "Product Name is not match [Card - Grid]").toBe(grid_product)
            await expect.soft(card_event_before, "Event is not match [Card - Grid]").toBe(grid_event)
            // TODO: Uncomment when Marketing Tools dict will be ready for using
            // await expect.soft(card_marketing_tool_before, "Marketing Tool is not match [Card - Grid]").toBe(grid_marketing_tool)
            await expect.soft(card_pnl_line_before, "P&L Line is not match [Card - Grid]").toBe(grid_pnl_line)
            await expect.soft(card_budget_before, "Budget is not match [Card - Grid]").toBe(grid_budget)
            // TODO: Inconsistent data
            // await expect.soft(card_start_date_before, "Start Date is not match [Card - Grid]").toContain(grid_period_start)
            // await expect.soft(card_end_date_before, "End Date is not match [Card - Grid]").toContain(grid_period_end)
            await expect.soft(card_allocation_header_after, "Allocation type is not match [Card - Grid]").toBe(grid_allocation_type)
            await expect.soft(grid_count_linked_budgets, "Count of Linked Budgets is not 0 [Card - Grid]").toBe(String(0))
        }
    }

    async create_auto_type_budget(name, client_dropdown, product_dropdown, budget_type_dropdown, qty, budget, start_date, end_date) {
        // Create New Auto Marketing Budget
        const bp = new BasePage()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.input_budget_name_card).clear()
        await this.page.fill(this.input_budget_name_card, name)
        await this.page.locator(this.selector_client_card).click()
        await this.page.locator(client_dropdown).click()
        await this.page.locator(this.selector_product_card).click()
        await this.page.locator(product_dropdown).click()
        await this.page.locator(bp.button_add).click()
        await this.page.locator(bp.checkbox_dialog).click()
        await this.page.locator(bp.button_select_dialog).click()
        await this.page.fill(this.input_qty, qty)
        await this.page.fill(this.input_budget, budget)
        await this.page.fill(this.input_start_date_card, start_date)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_end_date_card, end_date)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.selector_budget_type_card).click()
        await this.page.locator(budget_type_dropdown).click()
        await this.page.locator(this.selector_pnl_line_card).click()
        await this.page.locator(this.list_pnl_card).click()
        await this.page.locator(this.selector_allocation_type_card).click()
        await this.page.locator(this.auto_allocation_type_card).click()
        await this.page.locator(this.button_upload_file_card).setInputFiles('D:\\ProSpace JS Playwright\\uploadFiles\\магнит.jpg')
        await this.page.fill(bp.text_input_card, faker.lorem.sentence({min: 10, max: 20}))

        // Get Info From Card Before Creation
        const card_name_before = await this.page.locator(this.input_budget_name_card).inputValue();
        const card_client_before = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_product_before = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_event_before = await this.page.locator(bp.first_chips_event).getAttribute("title");
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // const card_marketing_tool_before = await this.page.locator(this.selector_marketing_tool_card).getAttribute("model-value-prop");
        const card_budget_before = await this.page.locator(this.input_budget).inputValue();
        const card_qty_before = await this.page.locator(this.input_qty).inputValue();
        const card_start_date_before = await this.page.locator(this.input_start_date_card).inputValue();
        const card_end_date_before = await this.page.locator(this.input_end_date_card).inputValue()
        const card_budget_type_before = await this.page.locator(this.selector_budget_type_card).getAttribute("model-value-prop");
        const card_pnl_line_before = await this.page.locator(this.selector_pnl_line_card).getAttribute("model-value-prop");
        const card_allocation_type_before = await this.page.locator(this.selector_allocation_type_card).getAttribute("model-value-prop");
        const card_file_name_before = await this.page.locator(bp.name_of_added_file).textContent()
        const card_comment_before = await this.page.locator(bp.text_input_card).inputValue()
        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();
        await this.page.reload()

        // Get Info From Grid
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_status = await this.page.locator(this.last_status_in_grid).textContent();
        const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_product_in_grid).textContent();
        const grid_event = await this.page.locator(this.last_event_in_grid).textContent();
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // const grid_marketing_tool = await this.page.locator(this.last_marketing_tool_in_grid).textContent();
        const grid_pnl_line = await this.page.locator(this.last_pnl_line_in_grid).textContent();
        const grid_budget = await this.page.locator(this.last_budget_in_grid).textContent();
        // TODO: Inconsistent data
        // const grid_period_start = await this.page.locator(this.last_period_start_in_grid).textContent();
        // const grid_period_end = await this.page.locator(this.last_period_end_in_grid).textContent();
        const grid_count_linked_budgets = await this.page.locator(this.last_linked_budgets_in_grid).textContent();
        const grid_allocation_type = await this.page.locator(this.last_allocation_type_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Get Info From Card After Creation
        await this.page.locator(bp.last_item_name).click();
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_name_after = await this.page.locator(this.input_budget_name_card).inputValue();
        const card_client_after = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_product_after = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_event_after = await this.page.locator(bp.first_chips_event).getAttribute("title");
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // const card_marketing_tool_after = await this.page.locator(this.selector_marketing_tool_card).getAttribute("model-value-prop");
        const card_budget_after = await this.page.locator(this.input_budget).inputValue();
        const card_qty_after = await this.page.locator(this.input_qty).inputValue();
        const card_start_date_after = await this.page.locator(this.input_start_date_card).inputValue();
        const card_end_date_after = await this.page.locator(this.input_end_date_card).inputValue()
        const card_budget_type_after = await this.page.locator(this.selector_budget_type_card).getAttribute("model-value-prop");
        const card_pnl_line_after = await this.page.locator(this.selector_pnl_line_card).getAttribute("model-value-prop");
        const card_allocation_type_after = await this.page.locator(this.selector_allocation_type_card).getAttribute("model-value-prop");
        const card_status_after = await this.page.locator(this.status_card).textContent();
        const card_allocation_header_after = await this.page.locator(this.header_allocation_type_card).textContent()
        await this.page.locator(bp.mode_switcher).click();
        const card_comment_after = await this.page.locator(bp.text_input_card).inputValue();
        try {
            const card_file_name_after = await this.page.locator(bp.name_of_added_file).textContent({timeout: 5000})
            await expect.soft(card_file_name_before, "File Name is not match [Card Before Saving - Card After Saving]").toBe(card_file_name_after)
        } catch (error) {
            let card_file_name_after = undefined;
            if (error instanceof playwright.errors.TimeoutError)
                await expect.soft(card_file_name_after, "File was not saved").not.toBeUndefined()
        } finally {
            await this.page.locator(bp.x_icon).click();

            // Check The Matching Of Card Info Before And After Saving
            await expect.soft(card_name_before, "Marketing Budget Name is not match [Card Before Saving - Card After Saving]").toBe(card_name_after)
            await expect.soft(card_client_before, "Client Name is not match [Card Before Saving - Card After Saving]").toBe(card_client_after)
            await expect.soft(card_product_before, "Product Name is not match [Card Before Saving - Card After Saving]").toBe(card_product_after)
            await expect.soft(card_event_before, "Event is not match [Card Before Saving - Card After Saving]").toBe(card_event_after)
            // TODO: Uncomment when Marketing Tools dict will be ready for using
            // await expect.soft(card_marketing_tool_before, "Marketing Tool is not match [Card Before Saving - Card After Saving]").toBe(card_marketing_tool_after)
            await expect.soft(card_qty_before, "Qty is not match [Card Before Saving - Card After Saving]").toBe(card_qty_after)
            await expect.soft(card_budget_before, "Budget is not match [Card Before Saving - Card After Saving]").toBe(card_budget_after)
            await expect.soft(card_start_date_before, "Start Date is not match [Card Before Saving - Card After Saving]").toBe(card_start_date_after)
            await expect.soft(card_end_date_before, "End Date is not match [Card Before Saving - Card After Saving]").toBe(card_end_date_after)
            await expect.soft(card_budget_type_before, "Budget Type is not match [Card Before Saving - Card After Saving]").toBe(card_budget_type_after)
            await expect.soft(card_pnl_line_before, "P&L Line is not match [Card Before Saving - Card After Saving]").toBe(card_pnl_line_after)
            await expect.soft(card_allocation_type_before, "Allocation type is not match [Card Before Saving - Card After Saving]").toBe(card_allocation_type_after)
            await expect.soft(card_comment_before, "Comment is not match [Card Before Saving - Card After Saving]").toBe(card_comment_after)
            await bp.create_el_assertion(count_of_items_after, count_of_items_before);

            // Check The Matching of Grid and Card Info
            await expect.soft(card_id, "Marketing Budget ID is not match [Card - Grid]").toBe(grid_id)
            await expect.soft(card_name_before, "Marketing Budget Name is not match [Card - Grid]").toBe(grid_name)
            await expect.soft(card_status_after, "Status is not match [Card - Grid]").toBe(grid_status)
            await expect.soft(card_client_before, "Client Name is not match [Card - Grid]").toBe(grid_client)
            await expect.soft(card_product_before, "Product Name is not match [Card - Grid]").toBe(grid_product)
            await expect.soft(card_event_before, "Event is not match [Card - Grid]").toBe(grid_event)
            // TODO: Uncomment when Marketing Tools dict will be ready for using
            // await expect.soft(card_marketing_tool_after, "Marketing Tool is not match [Card - Grid]").toBe(grid_marketing_tool)
            await expect.soft(card_pnl_line_before, "P&L Line is not match [Card - Grid]").toBe(grid_pnl_line)
            await expect.soft(card_budget_before, "Budget is not match [Card - Grid]").toBe(grid_budget)
            // TODO: Inconsistent data
            // await expect.soft(card_start_date_before.replace("20", ""), "Start Date is not match [Card - Grid]").toBe(grid_period_start)
            // await expect.soft(card_end_date_before.replace("20", ""), "End Date is not match [Card - Grid]").toBe(grid_period_end)
            await expect.soft(card_allocation_header_after, "Allocation type is not match [Card - Grid]").toBe(grid_allocation_type)
            await expect.soft(grid_count_linked_budgets, "Count of Linked Budgets is not 0 [Card - Grid]").toBe(String(0))
        }
    }

    async read_element(){
        // Get Info From Grid
        const bp = new BasePage()
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_status = await this.page.locator(this.last_status_in_grid).textContent();
        const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_product = await this.page.locator(this.last_product_in_grid).textContent();
        const grid_event = await this.page.locator(this.last_event_in_grid).textContent();
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // const grid_marketing_tool = await this.page.locator(this.last_marketing_tool_in_grid).textContent();
        const grid_pnl_line = await this.page.locator(this.last_pnl_line_in_grid).textContent();
        const grid_budget = await this.page.locator(this.last_budget_in_grid).textContent();
        // TODO: Inconsistent data
        // const grid_period_start = await this.page.locator(this.last_period_start_in_grid).textContent();
        // const grid_period_end = await this.page.locator(this.last_period_end_in_grid).textContent();
        const grid_allocation_type = await this.page.locator(this.last_allocation_type_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_name = await this.page.locator(this.input_budget_name_card).inputValue();
        const card_client = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_product = await this.page.locator(this.selector_product_card).getAttribute("model-value-prop");
        const card_event = await this.page.locator(bp.first_chips_event).getAttribute("title");
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // const card_marketing_tool = await this.page.locator(this.selector_marketing_tool_card).getAttribute("model-value-prop");
        const card_budget = await this.page.locator(this.input_budget).getAttribute("aria-valuenow");
        // TODO: Inconsistent data
        // const card_start_date = await this.page.locator(this.input_start_date_card).inputValue();
        // const card_end_date = await this.page.locator(this.input_end_date_card).inputValue()
        const card_pnl_line = await this.page.locator(this.selector_pnl_line_card).getAttribute("model-value-prop");
        const card_allocation_type = await this.page.locator(this.selector_allocation_type_card).getAttribute("model-value-prop");
        const card_status = await this.page.locator(this.status_card).textContent();
        const card_allocation_header = await this.page.locator(this.header_allocation_type_card).textContent()
        await this.page.locator(bp.mode_switcher).click();

        // Check The Matching of Grid and Card Info
        await expect.soft(card_id, "Marketing Budget ID is not match [Card - Grid]").toBe(grid_id)
        await expect.soft(card_name, "Marketing Budget Name is not match [Card - Grid]").toBe(grid_name)
        await expect.soft(card_status, "Status is not match [Card - Grid]").toBe(grid_status)
        await expect.soft(card_client, "Client Name is not match [Card - Grid]").toBe(grid_client)
        await expect.soft(card_product, "Product Name is not match [Card - Grid]").toBe(grid_product)
        await expect.soft(card_event, "Event is not match [Card - Grid]").toBe(grid_event)
        // TODO: Uncomment when Marketing Tools dict will be ready for using
        // await expect.soft(card_marketing_tool, "Marketing Tool is not match [Card - Grid]").toBe(grid_marketing_tool)
        await expect.soft(card_pnl_line, "P&L Line is not match [Card - Grid]").toBe(grid_pnl_line)
        await expect.soft(card_budget, "Budget is not match [Card - Grid]").toBe(grid_budget)
        // TODO: Inconsistent data
        // await expect.soft(card_start_date.replace("20", ""), "Start Date is not match [Card - Grid]").toBe(grid_period_start)
        // await expect.soft(card_end_date.replace("20", ""), "End Date is not match [Card - Grid]").toBe(grid_period_end)
        await expect.soft(card_allocation_header, "Allocation type is not match [Card - Grid]").toBe(grid_allocation_type)
        await expect.soft(card_allocation_header, "Allocation type is not match [Card - Grid]").toBe(card_allocation_type)
}


    async add_promo_to_manual_marketing_budget(){
        // Open Manual Marketing Budget
        const bp = new BasePage()
        await this.page.locator(bp.last_item_name).click()

        // Add Promo To Marketing Budget
        await this.page.locator(this.tab_promos).click()
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.button_add_promo).click();
        await this.page.locator(this.checkbox_promos).click()
        await this.page.locator(bp.button_apply).click()
        await this.page.locator(this.last_value_in_promos).click()
        await this.page.type(this.last_value_in_promos, String(getRandomInt(1000, 100000)))
        await this.page.keyboard.press("Enter");
        const count_of_items_promos = await this.page.locator(this.count_of_items_in_footer_promos).textContent()
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();
        await this.page.reload()

        // Get Info From Grid
        const grid_count_linked_promos = await this.page.locator(this.last_linked_promos_in_grid).textContent();

        // Check The Matching of Grid and Card Info
        await expect.soft(grid_count_linked_promos, "Count of Linked Promos is not match [Card - Grid]").toBe(count_of_items_promos)

    }

    async add_promo_to_auto_marketing_budget(){
        // Open Auto Marketing Budget
        const bp = new BasePage()
        await this.page.locator(bp.last_item_name).click()

        // Add Promo To Marketing Budget
        await this.page.locator(this.tab_promos).click()
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.button_add_promo).click();
        await this.page.locator(this.checkbox_promos).click()
        await this.page.locator(bp.button_apply).click()
        const count_of_items_promos = await this.page.locator(this.count_of_items_in_footer_promos).textContent()
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();
        await this.page.reload()

        // Get Info From Grid
        const grid_count_linked_promos = await this.page.locator(this.last_linked_promos_in_grid).textContent();

        // Check The Matching of Grid and Card Info
        await expect.soft(grid_count_linked_promos, "Count of Linked Promos is not match [Card - Grid]").toBe(count_of_items_promos)

    }


}