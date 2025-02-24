import {BasePage, currentDate, getRandomInt, get_random_dispatch_finish_date, get_random_execution_finish_date, get_random_execution_start_date} from '../pages/BasePage';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';

exports.PromoPortfolioPage = class PromoPortfolioPage {

    constructor(page) {
        this.page = page;
        // Initiation dialog
        this.selector_client_dialog = "(//div[@class='prospace-modal-wrapper']//div[contains(@data-pc-name,'select')])[1]"  // Selector Client in the Dialog
        this.list_client_card = `//li[@aria-posinset='${[getRandomInt(1, 9)]}']`  // List of Client
        this.selector_promo_type_dialog = "(//div[@class='prospace-modal-wrapper']//div[contains(@data-pc-name,'select')])[2]"  // Selector Promo Type in the Dialog
        this.selector_invoice_type_dialog = "(//div[@class='prospace-modal-wrapper']//div[contains(@data-pc-name,'select')])[3]"  // Selector Invoice Type in the Dialog

        // Creation form
        this.selector_contract_mechanics_card = "(//label[@title='Contract Mechanics']//following-sibling::div[contains(@data-pc-name,'select')])"   // Selector Contract Mechanics
        this.tpr_contract_mechanics_card = "//li[@aria-label='TPR']"   // TPR Contract Mechanics
        this.input_contract_discount_card = "(//label[@title='Contract Discount']//following-sibling::div/span/input[contains(@data-pc-name,'pcinput')])"   // Contract Discount input
        this.input_execution_start_date_card = "(//label[@title='Execution Start Date']//following-sibling::div/span/input[contains(@data-pc-name,'pcinput')])"   // Execution Start Date input
        this.input_execution_finish_date_card = "(//label[@title='Execution Finish Date']//following-sibling::div/span/input[contains(@data-pc-name,'pcinput')])"   // Execution Finish Date input
        this.input_dispatch_start_date_card = "(//label[@title='Dispatch Start Date']//following-sibling::div/span/input[contains(@data-pc-name,'pcinput')])"   // Dispatch Start Date input
        this.input_dispatch_finish_date_card = "(//label[@title='Dispatch Finish Date']//following-sibling::div/span/input[contains(@data-pc-name,'pcinput')])"   // Dispatch Finish Date input
        this.input_uplift_card = "(//label[@title='Uplift, %']//following-sibling::div/span/input[contains(@data-pc-name,'pcinput')])"   // Uplift input
        this.tab_plan_card = "(//div[@role='tablist']/button[@role='tab'])[2]"   // Plan tab
        this.status_card = "//div[@data-test='prospace-header']/div[@data-test='header-left']/div[2]/div[2]"  // Status in the Card
        this.item_id_card = "//div[contains(@class, 'ps-font-BaseText text-slate-500')]" // Item ID in the card
        this.pen_icon = "(//div[@data-test='header-left'])[2]/div/div[2]/div[2]/div"  // Pen icon in the Promo

        // Grid
        this.last_id_in_grid = "(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last ID
        this.last_status_in_grid = "(//span[text()='Status']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Status
        this.last_client_in_grid = "(//span[text()='Client']/following-sibling::div/div[2])[1]"  // Grid last Client
        this.last_event_in_grid = "(//span[text()='Events']/following-sibling::div/div[contains(@class,'event')])[1]"  // Grid last Events
        this.last_uplift_in_grid = "(//td//span[text()='Uplift']/following-sibling::span)[1]"  // Grid last Uplift
        this.last_roi_in_grid = "(//td//span[text()='ROI']/following-sibling::span)[1]"  // Grid last ROI
        this.last_execution_start_date_in_grid = "(//span[text()='Execution dates']/following-sibling::div/div/div[contains(@class,'mr-[5px]')])[1]"  // Grid last Execution Start Date
        this.last_execution_finish_date_in_grid = "(//span[text()='Execution dates']/following-sibling::div/div/div/following-sibling::div/following-sibling::div[contains(@class,'ml-[3px]')])[1]"  // Grid last Execution Finish Date
        this.last_net_sales_in_grid = "(//td//span[text()='Net sales, k₽']/following-sibling::span)"  // Grid last Net Sales
        this.last_total_sales_in_grid = "(//td//span[text()='Total sales, k₽']/following-sibling::span)"  // Grid last Total Sales
        this.last_creation_date_in_grid = "(//td//span[text()='Creation date']/following-sibling::div/div/div)[1]"  // Grid last Creation Date
        this.last_updated_date_in_grid = "(//td//span[text()='Updated date']/following-sibling::div/div/div)[1]"  // Grid last Updated Date

    }

    async open_dict(){
        const bp = new BasePage()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Promo Portfolio", {timeout: 12000})
    }

    async create_tpr_promo() {
        // Create New TPR Promo
        const bp = new BasePage()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_new_promo).click()
        await this.page.locator(this.selector_client_dialog).click()
        await this.page.locator(this.list_client_card).click()
        await this.page.locator(bp.button_apply).click()
        await this.page.locator(this.selector_contract_mechanics_card).click()
        await this.page.locator(this.tpr_contract_mechanics_card).click()
        await this.page.fill(this.input_contract_discount_card, String(getRandomInt(1, 100)))
        await this.page.locator(bp.button_add).click()
        await this.page.locator(bp.checkbox_dialog).click()
        await this.page.locator(bp.button_select_dialog).click()
        await this.page.fill(this.input_execution_start_date_card, get_random_execution_start_date())
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_execution_finish_date_card, get_random_execution_finish_date())
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_dispatch_start_date_card, currentDate)
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_dispatch_finish_date_card, get_random_dispatch_finish_date())
        await this.page.keyboard.press("Enter");
        await this.page.fill(this.input_uplift_card, String(getRandomInt(1, 999)))
        await this.page.fill(bp.text_input_card, faker.lorem.sentence({min: 10, max: 20}))
        await this.page.locator(bp.button_upload_file).setInputFiles('./uploadFiles/магнит.jpg')

        // Get Info From Card Before Creation
        const card_contract_mechanics_before = await this.page.locator(this.selector_contract_mechanics_card).getAttribute("model-value-prop");
        const card_contract_discount_before = await this.page.locator(this.input_contract_discount_card).inputValue()
        const card_event_before = await this.page.locator(bp.first_chips_event).getAttribute("title");
        const card_execution_start_date_before = await this.page.locator(this.input_execution_start_date_card).inputValue();
        const card_execution_finish_date_before = await this.page.locator(this.input_execution_finish_date_card).inputValue()
        const card_dispatch_start_date_before = await this.page.locator(this.input_dispatch_start_date_card).inputValue()
        const card_dispatch_finish_date_before = await this.page.locator(this.input_dispatch_finish_date_card).inputValue()
        const card_uplift_before = await this.page.locator(this.input_uplift_card).inputValue()
        const card_comment_before = await this.page.locator(bp.text_input_card).inputValue();
        const card_file_name_before = await this.page.locator(bp.name_of_added_file).textContent()
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible({timeout: 120000});

        await this.page.locator(bp.x_icon).click();
        await this.page.reload()

        // Get Info From Grid
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_status = await this.page.locator(this.last_status_in_grid).textContent();
        // TODO: Uncomment when we can get info about client from Overview page
        // const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_event = await this.page.locator(this.last_event_in_grid).textContent();
        const grid_uplift = await this.page.locator(this.last_uplift_in_grid).textContent();
        // TODO: Inconsistent data (Grid and Card Dates)
        // const grid_execution_start_date = await this.page.locator(this.last_execution_start_date_in_grid).textContent();
        // const grid_execution_finish_date = await this.page.locator(this.last_execution_finish_date_in_grid).textContent();
        const grid_creation_date = await this.page.locator(this.last_creation_date_in_grid).textContent();
        const grid_updated_date = await this.page.locator(this.last_updated_date_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Get Info From Card After Creation
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(this.tab_plan_card).click();
        const card_id = await this.page.locator(this.item_id_card).textContent()
        const card_name = await this.page.locator(bp.input_name_card).inputValue()
        const card_status_after = await this.page.locator(this.status_card).textContent()
        const card_contract_mechanics_after = await this.page.locator(this.selector_contract_mechanics_card).getAttribute("model-value-prop");
        const card_contract_discount_after = await this.page.locator(this.input_contract_discount_card).inputValue()
        const card_event_after = await this.page.locator(bp.first_chips_event).getAttribute("title");
        const card_execution_start_date_after = await this.page.locator(this.input_execution_start_date_card).inputValue();
        const card_execution_finish_date_after = await this.page.locator(this.input_execution_finish_date_card).inputValue()
        const card_dispatch_start_date_after = await this.page.locator(this.input_dispatch_start_date_card).inputValue()
        const card_dispatch_finish_date_after = await this.page.locator(this.input_dispatch_finish_date_card).inputValue()
        const card_uplift_after = await this.page.locator(this.input_uplift_card).inputValue()
        await this.page.locator(bp.mode_switcher).click();
        const card_comment_after = await this.page.locator(bp.text_input_card).inputValue();
        const card_file_name_after = await this.page.locator(bp.name_of_added_file).textContent()

        // Check The Matching Of Card Info Before And After Saving
        await expect.soft(card_contract_mechanics_before, "Contract Mechanic is not match [Card Before Saving - Card After Saving]").toBe(card_contract_mechanics_after)
        await expect.soft(card_contract_discount_before, "Contract Discount is not match [Card Before Saving - Card After Saving]").toBe(card_contract_discount_after)
        await expect.soft(card_execution_start_date_before, "Execution Start Date is not match [Card Before Saving - Card After Saving]").toBe(card_execution_start_date_after)
        await expect.soft(card_execution_finish_date_before, "Execution Finish Date is not match [Card Before Saving - Card After Saving]").toBe(card_execution_finish_date_after)
        await expect.soft(card_dispatch_start_date_before, "Dispatch Start Date is not match [Card Before Saving - Card After Saving]").toBe(card_dispatch_start_date_after)
        await expect.soft(card_dispatch_finish_date_before, "Dispatch Finish Date is not match [Card Before Saving - Card After Saving]").toBe(card_dispatch_finish_date_after)
        await expect.soft(card_event_before, "Event is not match [Card Before Saving - Card After Saving]").toBe(card_event_after)
        await expect.soft(card_uplift_before, "Uplift is not match [Card Before Saving - Card After Saving]").toBe(card_uplift_after)
        await expect.soft(card_file_name_before, "File Name is not match [Card Before Saving - Card After Saving]").toBe(card_file_name_after)
        await expect.soft(card_comment_before, "Comment is not match [Card Before Saving - Card After Saving]").toBe(card_comment_after)
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);

        // Check The Matching of Grid and Card Info
        await expect.soft(card_id, "Promo ID is not match [Card - Grid]").toBe(grid_id)
        await expect.soft(card_name, "Promo Name is not match [Card - Grid]").toBe(grid_name)
        await expect.soft(card_status_after, "Status is not match [Card - Grid]").toBe(grid_status)
        await expect.soft(card_event_before, "Event is not match [Card - Grid]").toBe(grid_event)
        // TODO: Uncomment when we can get info about client from Overview page
        // await expect.soft(card_client_before, "Client Name is not match [Card - Grid]").toBe(grid_client)
        await expect.soft(card_uplift_before.replace(" %", ""), "Uplift is not match [Card - Grid]").toBe(grid_uplift)
        // TODO: Inconsistent data (Grid and Card Dates)
        // await expect.soft(card_execution_start_date_before, "Execution Start Date is not match [Card - Grid]").toContain(grid_execution_start_date)
        // await expect.soft(card_execution_finish_date_before, "Execution Finish Date is not match [Card - Grid]").toContain(grid_execution_finish_date)
        await expect.soft(grid_creation_date, "Creation Date is not match [Grid]").toContain(currentDate)
        await expect.soft(grid_updated_date, "Updated Date is not match [Grid]").toContain(currentDate)
    }

    async read_element() {
        // Get Info From Grid
        const bp = new BasePage()
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_status = await this.page.locator(this.last_status_in_grid).textContent();
        // TODO: Uncomment when we can get info about client from Overview page
        // const grid_client = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_event = await this.page.locator(this.last_event_in_grid).textContent();
        const grid_uplift = await this.page.locator(this.last_uplift_in_grid).textContent();
        // TODO: Inconsistent data (Grid and Card Dates)
        // const grid_execution_start_date = await this.page.locator(this.last_execution_start_date_in_grid).textContent();
        // const grid_execution_finish_date = await this.page.locator(this.last_execution_finish_date_in_grid).textContent();

        await this.page.locator(bp.last_item_name).click()

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(this.tab_plan_card).click();
        const card_id = await this.page.locator(this.item_id_card).textContent()
        const card_name = await this.page.locator(bp.input_name_card).inputValue()
        const card_status = await this.page.locator(this.status_card).textContent()
        const card_event = await this.page.locator(bp.first_chips_event).getAttribute("title");
        // TODO: Inconsistent data (Grid and Card Dates)
        // const card_execution_start_date = await this.page.locator(this.input_execution_start_date_card).inputValue();
        // const card_execution_finish_date = await this.page.locator(this.input_execution_finish_date_card).inputValue()
        const card_uplift = await this.page.locator(this.input_uplift_card).inputValue()

        // Check The Matching of Grid and Card Info
        await expect.soft(card_id, "Promo ID is not match [Card - Grid]").toBe(grid_id)
        await expect.soft(card_name, "Promo Name is not match [Card - Grid]").toBe(grid_name)
        await expect.soft(card_status, "Status is not match [Card - Grid]").toBe(grid_status)
        await expect.soft(card_event, "Event is not match [Card - Grid]").toBe(grid_event)
        // TODO: Uncomment when we can get info about client from Overview page
        // await expect.soft(card_client_before, "Client Name is not match [Card - Grid]").toBe(grid_client)
        await expect.soft(card_uplift.replace(" %", ""), "Uplift is not match [Card - Grid]").toBe(grid_uplift)
        // TODO: Inconsistent data (Grid and Card Dates)
        // await expect.soft(card_execution_start_date, "Execution Start Date is not match [Card - Grid]").toContain(grid_execution_start_date)
        // await expect.soft(card_execution_finish_date, "Execution Finish Date is not match [Card - Grid]").toContain(grid_execution_finish_date)
    }


    async update_element() {
        // Get Last Promo Info from Grid Before Update
        const bp = new BasePage()
        const grid_id_before = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name_before = await this.page.locator(bp.last_item_name).textContent();
        const grid_status_before = await this.page.locator(this.last_status_in_grid).textContent();
        // TODO: Uncomment when we can get info about client from Overview page
        // const grid_client_before = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_event_before = await this.page.locator(this.last_event_in_grid).textContent();
        const grid_uplift_before = await this.page.locator(this.last_uplift_in_grid).textContent();
        const grid_execution_start_date_before = await this.page.locator(this.last_execution_start_date_in_grid).textContent();
        const grid_execution_finish_date_before = await this.page.locator(this.last_execution_finish_date_in_grid).textContent();
        const grid_creation_date_before = await this.page.locator(this.last_creation_date_in_grid).textContent();

        // Update Last Promo
        await this.page.locator(bp.last_item_name).click()
        await this.page.locator(this.tab_plan_card).click()
        await this.page.locator(bp.mode_switcher).click()
        await this.page.locator(this.pen_icon).click()
        await this.page.locator(bp.input_name_card).clear()
        await this.page.fill(bp.input_name_card, faker.location.city() + " Promo")
        await this.page.locator(this.pen_icon).click()
        await this.page.locator(this.selector_contract_mechanics_card).click()
        await this.page.locator(this.tpr_contract_mechanics_card).click()
        await this.page.locator(this.input_contract_discount_card).clear()
        await this.page.fill(this.input_contract_discount_card, String(getRandomInt(1, 100)))
        await this.page.locator(bp.x_icon_chips_event).click()
        await this.page.locator(bp.button_add).click()
        await this.page.locator(bp.checkbox_dialog).click()
        await this.page.locator(bp.button_select_dialog).click()
        await this.page.locator(this.input_execution_start_date_card).clear()
        await this.page.fill(this.input_execution_start_date_card, get_random_execution_start_date())
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.input_execution_finish_date_card).clear()
        await this.page.fill(this.input_execution_finish_date_card, get_random_execution_finish_date())
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.input_dispatch_start_date_card).clear()
        await this.page.fill(this.input_dispatch_start_date_card, currentDate)
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.input_dispatch_finish_date_card).clear()
        await this.page.fill(this.input_dispatch_finish_date_card, get_random_dispatch_finish_date())
        await this.page.keyboard.press("Enter");
        await this.page.locator(this.input_uplift_card).clear()
        await this.page.fill(this.input_uplift_card, String(getRandomInt(1, 999)))
        await this.page.locator(bp.text_input_card).clear()
        await this.page.fill(bp.text_input_card, faker.lorem.sentence({min: 10, max: 20}))
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible({timeout: 120000});

        await this.page.locator(bp.x_icon).click();
        await this.page.reload()

        // Get Last Promo Info from Grid After Update
        const grid_id_after = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name_after = await this.page.locator(bp.last_item_name).textContent();
        const grid_status_after = await this.page.locator(this.last_status_in_grid).textContent();
        // TODO: Uncomment when we can get info about client from Overview page
        // const grid_client_after = await this.page.locator(this.last_client_in_grid).textContent();
        const grid_event_after = await this.page.locator(this.last_event_in_grid).textContent();
        const grid_uplift_after = await this.page.locator(this.last_uplift_in_grid).textContent();
        const grid_execution_start_date_after = await this.page.locator(this.last_execution_start_date_in_grid).textContent();
        const grid_execution_finish_date_after = await this.page.locator(this.last_execution_finish_date_in_grid).textContent();
        const grid_updated_date_after = await this.page.locator(this.last_updated_date_in_grid).textContent();
        const grid_creation_date_after = await this.page.locator(this.last_creation_date_in_grid).textContent();

        // Check The Matching of Grid and Card Info
        await expect.soft(grid_id_before, "Promo ID is changed").toBe(grid_id_after)
        await expect.soft(grid_name_before, "Promo Name is not changed").not.toBe(grid_name_after)
        await expect.soft(grid_status_before, "Status is changed").toBe(grid_status_after)
        await expect.soft(grid_event_before, "Event is not changed").not.toBe(grid_event_after)
        // TODO: Uncomment when we can get info about client from Overview page
        // await expect.soft(card_client_before, "Client Name is not match [Card - Grid]").toBe(grid_client)
        await expect.soft(grid_uplift_before.replace(" %", ""), "Uplift is not changed").not.toBe(grid_uplift_after)
        await expect.soft(grid_execution_start_date_before, "Execution Start Date is not changed").not.toBe(grid_execution_start_date_after)
        await expect.soft(grid_execution_finish_date_before, "Execution Finish Date is not changed").not.toBe(grid_execution_finish_date_after)
        await expect.soft(grid_creation_date_before, "Creation Date is changed").toBe(grid_creation_date_after)
        await expect.soft(grid_updated_date_after, "Updated Date is not match").toContain(currentDate)
    }
}
