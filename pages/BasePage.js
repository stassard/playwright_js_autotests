import {faker} from "@faker-js/faker";
const {expect} = require("@playwright/test");

exports.BasePage = class BasePage {

    constructor(page) {
        this.page = page;
        // General
        this.toast_message_success = "//div[contains(@data-pc-section,'messagetext')]"  // Success toast message
        this.head_of_page = "//div[@class='ps-font-TopHeader text-indigo-950']"  //  Head of page

        // Menu
        this.side_button_modules = "(//div[contains(@data-test,'prospace-sidebar-item')])[2]" // Side Menu
        this.link_products = "//a[text()='Products']"  // Link Products in the Side Menu
        this.link_clients = "//a[text()='Clients']"  // Link Clients in the Side Menu
        this.link_client_products = "//a[text()='Client products']"   // Link Client Products in the Side Menu
        this.link_client_product_prices = "//a[text()='Price lists']"  // Link Client Product Prices in the Side Menu
        this.link_brands = "//a[text()='Brands']"  // Link Brands in the Side Menu
        this.link_baselines = "//a[text()='Baselines']"  // Link Baselines in the Side Menu
        this.link_cogses = "//a[text()='COGS']"  // Link Cogses in the Side Menu
        this.link_basetis = "//a[text()='Trade terms']"  // Link BaseTis in the Side Menu
        this.link_marketing_budgets = "//a[text()='Marketing budgets']"  // Link Marketing Budgets in the Side Menu
        this.link_events = "//a[text()='Events']"  // Link Events in the Side Menu
        this.link_budget_types = "//a[text()='Budget types']"  // Link Budget Types in the Side Menu
        this.link_technologies = "//a[text()='Technologies']"  // Link Technologies in the Side Menu
        this.link_product_groups = "//a[text()='Product groups']"  // Link Product Groups in the Side Menu
        this.link_plus = "//a[text()='PLUs']"  // Link PLUs in the Side Menu
        this.link_sfa_types = "//a[text()='SFA types']"  // Link SFA types in the Side Menu
        this.link_users = "//a[text()='Users']"  // Link Users in the Side Menu
        this.link_rules = "//a[text()='Rules']"  // Link Rules in the Side Menu
        this.link_roles = "//a[text()='Roles']"  // Link Roles in the Side Menu
        this.link_promo_portfolio = "//a[text()='Promo Portfolio']"  // Link Promo Portfolio in the Side Menu
        this.link_user_clients = "//a[text()='User clients']"  // Link User clients in the Side Menu

        // Creation Cards
        this.button_create_card = "//button[@aria-label='Create']"  // Button Create
        this.link_delete_in_3_dots_card = "//div[contains(@class,'prospace-dots-item')]"  // Button Delete in the card 3 dots
        this.button_add = "//div[@class='collection-editor']/button"  // Button Add events
        this.first_chips_event = "//div[@class='collection-editor']/div[@data-test='chips-items']/div[contains(@class, 'event')][1]"  // First event chips
        this.x_icon_chips_event = "(//div[contains(@class,'remove')])[1]"  // First X Icon Chips Event
        this.button_upload_file = "//input[@type='file']"  // Button Upload File
        this.random_dropdown_element = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // Random dropdown element
        this.first_dropdown_element = `//li[@aria-posinset='1']`  // First dropdown element

        // Dialog
        this.button_select_dialog = "//button[contains(@aria-label, 'Select')]" // Button Select events
        this.checkbox_dialog = `(//td[contains(@class,'hide-selection-shadow')]/div[contains(@class,'p-checkbox p-component')]/div[2]/span[@class='p-checkbox-icon'])[${[getRandomInt(1, 5)]}]`  // Checkboxes in the popovers

        // Bottom Panel
        this.bottom_panel = "//div[@class='panel']"  // Bottom panel
        this.counter_bottom_panel = "//div[@class='bottom-panel']//span[@class='prospace-counter-box']" // Counter in the Bottom Panel
        this.button_add_bottom_panel = "//button[@aria-label='Add']" // Button Add in the Bottom Panel
        this.button_delete_bottom_panel = "//div[@class='bottom-panel']//button[@aria-label='Delete']" // Button Delete in the Bottom Panel
        this.unselected_checkbox_bottom_panel = `((//tbody[@class=\"p-datatable-tbody\"])[2]//input[@type='checkbox' and @aria-label='Row Unselected']/ancestor::div[@class='p-checkbox p-component'])[${[getRandomInt(1, 10)]}]` // Unselected checkbox in the Bottom Panel
        this.counter_checked_checkboxes_bottom_panel = `//div[@class='bottom-panel']//span[text()='Selected']/following-sibling::span[@class='prospace-counter-box']` // Counter checked checkboxes in the Bottom Panel

        // Created Cards
        this.mode_switcher = "//div[@data-test='header-right']/div/div/div/input[@role='switch']"  // Mode Switcher
        this.button_save = "//button[@aria-label='Save']"  // Button Save
        this._3_dots_card = "(//div[@data-test='prospace-header']/div[@data-test='header-right']/div/button[@type='icon-secondary'])[1]"  // 3 dots in the card
        this.item_id = "//div[contains(@class, 'item-id')]"  // Item ID in the card
        this.x_icon = "(//div[@data-test='prospace-header']/div[@data-test='header-right']/div/button[@type='icon-secondary'])[3]"  // X icon in the created card
        this.name_of_added_file = "//span[contains(@class,'text-purple-800')]"     // Name of Uploaded file
        this.input_name_card = "//div[@data-test='header-left']//input[contains(@data-pc-name,'inputtext')]" // Name of the Element in the Card
        this.pen_icon_card = "(//div[@data-test='prospace-header']//div/div/following-sibling::div/div)[1]" // Pen Icon in the Card
        this.text_input_card = "//div[@data-test='block-main']//textarea[@type='text']" // Text input in the Card

        // Grid Dictionary
        this.button_delete_item = "//button[contains(@aria-label,'Delete item')]"  // Button Delete Item in the Modal Window
        this.button_restore_item = "//button[contains(@aria-label,'Restore item')]"  // Button Restore Item in the Modal Window
        this.first_3_dots_grid = `(//tr[1]//td[@data-p-frozen-column='true'])[2]`  // First grid 3 dots
        this.random_3_dots_grid = `(//div[contains(@class,'flex justify-center')]/div[contains(@class,'flex')])[${[getRandomInt(1, 10)]}]`  // Random grid 3 dots
        this.link_delete_in_3_dots = "(//li[contains(@aria-label, 'Delete')])"  // Button Delete in the grid 3 dots
        this.link_restore_in_3_dots = "(//li[contains(@aria-label, 'Restore')])"  // Button Restore in the grid 3 dots
        this.any_item_name = `(//div[contains(@class, 'border-dotted')])[${[getRandomInt(1, 10)]}]`  // Grid Any Name of Items
        this.first_item_name = "(//div[contains(@class, 'border-dotted')])[1]"  // Grid Last Name of Items
        this.button_create_new = " //button[@aria-label='Create new']"  // Button Create New
        this.input_search_grid = "//input[contains(@data-pc-name,'inputtext')]"  // Grid Search field
        this.deleted_tab_grid = "(//span[contains(text(), 'Deleted')]//ancestor::div[contains(@class, 'h-8')])"  // Deleted Tab
        this.auto_tab_grid = "(//span[contains(text(), 'Auto')]//ancestor::div[contains(@class, 'h-8')])"  // Auto Tab
        this.manual_tab_grid = "(//span[contains(text(), 'Manual')]//ancestor::div[contains(@class, 'h-8')])"  // Manual Tab
        // this.deleted_tab_grid_is_active = "//div[contains (@class, 'active')]/span[text()='Deleted']"  // Deleted
        this.all_tab_grid = "(//span[contains(text(), 'All')]//ancestor::div[contains(@class, 'h-8')])" // All Tab
        // this.all_tab_grid_is_active = "//div[contains(@class, 'active')]/span[text()='All']"  # Кнопка-вкладка All активна
        this.count_items_in_footer_grid = "(//span[@class='text-indigo-950'])[2]"  // Count of items in the footer
        this.random_checkbox_grid = `(//input[@type='checkbox' and @aria-label='Row Unselected']/ancestor::div[@class='p-checkbox p-component'])[${[getRandomInt(1, 10)]}]`  // Random Unselected checkbox
        this.first_checkbox_grid = `(//tr[1]/td[@data-pc-section='bodycell']/div[1])[1]`  // Random Unselected checkbox
        // this.selected_checkbox = `(//div[contains(@class,'p-highlight')])${[Math.random() * 10]}`  # Выбранный чекбокс в гриде
        this.select_all_checkbox = "(//div[@class='p-checkbox p-component'])[1]"  // Select All checkbox
        this.delete_button_upper_panel = "//button[@aria-label='Delete']"  // Button Delete in the top panel
        this.restore_button_upper_panel = "//button[@aria-label='Restore']"  // Button Restore in the top panel
        this.counter_checked_checkboxes_upper_panel = "//span[text()='Selected']/following-sibling::span[@class='prospace-counter-box']"  // Counter checked checkboxes in the top panel
        this.button_all_fiters = "//div[contains(@class, 'all-filters')]"  // Button All filters
        this.counter_all_filters = "//div[contains(@class,'all-filters')]/span[@class='prospace-counter-box']"  // Counter in the All Filters
        this.spinner = "//div[contains(@class,'animate-spin')]" // Spinner

        // Grid Promo
        this.button_new_promo = "//button[@aria-label='New Promo']"  // Button New Promo

        // Filters
        this.button_apply = "//button[contains(@aria-label,'Apply')]"  // Button Apply
        this.counter_filters = "(//div[@class='header']/span[@class='prospace-counter-box'])[1]"  // Filter Counters
        this.button_clear_filters = "//button[contains(@aria-label, 'Clear')]"  // Button Clear in the All Filters
        this.x_icon_filters = "(//button[@type='icon-secondary'])[3]"  // X Icons in the All Filters
        this.x_icons_input_filters = "//div[@class='header']/div[contains(@class,'items-center')]"  // Individuals X Icons for every fields in the All Filters
    }

    // Assertions

    async create_el_assertion(count_after, count_before){
        return expect.soft(Number(count_after), "Element is not created or created more than 1 element").toEqual(Number(count_before) + 1)
    }

    async delete_el_assertion(count_after, count_before){
        return expect.soft(Number(count_after), "Element is not deleted or deleted more than 1 element").toEqual(Number(count_before) - 1)
    }


    // Methods

    async delete_using_3_dots_grid(){
        const bp = new BasePage();
        let count = 0
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.first_3_dots_grid).click()
        await this.page.locator(bp.link_delete_in_3_dots).click()
        if (await this.page.locator(this.button_delete_item).isVisible({timeout: 1000}) === true) {
            await this.page.locator(bp.button_delete_item).click()
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        } else {
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
            let confirm = undefined;
            await expect.soft(confirm, "Confirmation window is not appeared").not.toBeUndefined()
        }
        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await bp.delete_el_assertion(count_of_items_after, count_of_items_before);

    }

    async delete_using_checkbox_grid(){
        const bp = new BasePage();
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.first_checkbox_grid).click()
        await this.page.locator(bp.delete_button_upper_panel).click()
        if (await this.page.locator(this.button_delete_item).isVisible({timeout: 1000}) === true) {
            await this.page.locator(bp.button_delete_item).click()
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        } else {
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
            let confirm = undefined;
            await expect.soft(confirm, "Confirmation window is not appeared").not.toBeUndefined()
        }
        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await bp.delete_el_assertion(count_of_items_after, count_of_items_before);

    }

    async delete_using_card(){
        const bp = new BasePage();
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.first_item_name).click()
        await this.page.locator(bp._3_dots_card).click()
        await this.page.locator(bp.link_delete_in_3_dots).click()
        if (await this.page.locator(this.button_delete_item).isVisible({timeout: 1000}) === true) {
            await this.page.locator(bp.button_delete_item).click()
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        } else {
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
            let confirm = undefined;
            await expect.soft(confirm, "Confirmation window is not appeared").not.toBeUndefined()
        }
        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await bp.delete_el_assertion(count_of_items_after, count_of_items_before);

    }

    async select_all_delete(){
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.select_all_checkbox).click()
        const count_deleted_items = await this.page.locator(bp.counter_checked_checkboxes_upper_panel).textContent()
        await this.page.locator(bp.delete_button_upper_panel).click()
        if (await this.page.locator(this.button_delete_item).isVisible({timeout: 1000}) === true) {
            await this.page.locator(bp.button_delete_item).click()
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        } else {
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
            let confirm = undefined;
            await expect.soft(confirm, "Confirmation window is not appeared").not.toBeUndefined()
        }
        await this.page.reload()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Elements are not deleted").toEqual(Number(count_of_items_before) - Number(count_deleted_items))

    }

    async restore_using_3_dots_grid(){
        const bp = new BasePage();
        await this.page.locator(bp.deleted_tab_grid).click()

        let count = 0
        while (await this.page.locator(bp.spinner).isVisible() === true) {
            await this.page.waitForTimeout(1000)
            count++;
            if (count === 10) {
                break;
            }
        }
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.first_3_dots_grid).click()
        await this.page.locator(bp.link_restore_in_3_dots).click()
        if (await this.page.locator(this.button_restore_item).isVisible({timeout: 1000}) === true) {
            await this.page.locator(bp.button_restore_item).click()
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        } else {
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
            let confirm = undefined;
            await expect.soft(confirm, "Confirmation window is not appeared").not.toBeUndefined()
        }
        await this.page.reload()
        await this.page.locator(bp.deleted_tab_grid).click()

        let count_1 = 0
        while (await this.page.locator(bp.spinner).isVisible() === true) {
            await this.page.waitForTimeout(1000)
            count_1++;
            if (count_1 === 10) {
                break;
            }
        }
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Element is not restored").toEqual(Number(count_of_items_before) - 1)

    }

    async restore_using_checkbox_grid(){
        const bp = new BasePage();
        await this.page.locator(bp.deleted_tab_grid).click()

        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.first_checkbox_grid).click()
        await this.page.locator(bp.restore_button_upper_panel).click()
        if (await this.page.locator(this.button_restore_item).isVisible({timeout: 1000}) === true) {
            await this.page.locator(bp.button_restore_item).click()
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        } else {
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
            let confirm = undefined;
            await expect.soft(confirm, "Confirmation window is not appeared").not.toBeUndefined()
        }
        await this.page.reload()
        await this.page.locator(bp.deleted_tab_grid).click()

        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Element is not restored").toEqual(Number(count_of_items_before) - 1)

    }

    async restore_using_card(){
        const bp = new BasePage();
        await this.page.locator(bp.deleted_tab_grid).click()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.first_item_name).click()
        await this.page.locator(this._3_dots_card).click()
        await this.page.locator(bp.link_restore_in_3_dots).click()
        if (await this.page.locator(this.button_restore_item).isVisible({timeout: 1000}) === true) {
            await this.page.locator(bp.button_restore_item).click()
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        } else {
            await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
            let confirm = undefined;
            await expect.soft(confirm, "Confirmation window is not appeared").not.toBeUndefined()
        }
        await this.page.reload()
        await this.page.locator(bp.deleted_tab_grid).click()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Element is not deleted").toEqual(Number(count_of_items_before) - 1)
    }

    async find_el_in_the_dict(el, dict){
        // Find Chosen Element
        await this.page.locator(this.side_button_modules).click()
        await this.page.locator(dict).click()
        await this.page.fill(this.input_search_grid, el);
        await this.page.keyboard.press("Enter");

        let count_1 = 0;
        while (await this.page.locator(this.count_items_in_footer_grid).textContent() !== "1") {
            await this.page.waitForTimeout(1000)
            count_1++;
            if (count_1 === 50){
                let res = undefined;
                await expect.soft(res, "Element is not find").not.toBeUndefined()
                await browserContext.close();
            }
        }
    }
}


export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const currDate = new Date();
export const currentDate = currDate.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

export function random_start_date(){
    const future_start_date = faker.date.between({from: new Date(), to: '01-01-2035'});
    return future_start_date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}


export function random_end_date() {
    const future_end_date = faker.date.between({from: '01-01-2035', to: '01-01-2040'});
    return  future_end_date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

export function get_random_execution_start_date(){
    const esd = faker.date.between({from: '01-01-2027', to: '06-06-2027'});
    return esd.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

export function get_random_execution_finish_date(){
    const efd = faker.date.between({from: '07-07-2027', to: '12-12-2028'});
    return efd.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}


export function get_random_dispatch_finish_date(){
    const ded = faker.date.between({from: '01-01-2026', to: '12-12-2026'});
    return ded.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}



