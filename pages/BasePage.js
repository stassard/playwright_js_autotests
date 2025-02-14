import {faker} from "@faker-js/faker";
import playwright from "playwright";
const {expect} = require("@playwright/test");

exports.BasePage = class BasePage {

    constructor(page) {
        this.page = page;
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
        // TODO: Change link of Marketing Budgets after it will be change
        this.link_marketing_budgets = "//a[text()='Marketing budgets']"  // Link Marketing Budgets in the Side Menu
        this.link_events = "//a[text()='Events']"  // Link Events in the Side Menu
        this.link_budget_types = "//a[text()='Budget types']"  // Link Budget Types in the Side Menu
        this.link_technologies = "//a[text()='Technologies']"  // Link Technologies in the Side Menu
        this.link_product_groups = "//a[text()='Product groups']"  // Link Product Groups in the Side Menu
        this.link_plus = "//a[text()='PLUs']"  // Link PLUs in the Side Menu
        this.link_sfa_types = "//a[text()='SFA types']"  // Link SFA types in the Side Menu

        // Creation Cards
        this.button_create_card = "//button[@aria-label='Create']"  // Button Create
        this.link_delete_in_3_dots_card = "//div[contains(@class,'prospace-dots-item')]"  // Button Delete in the card 3 dots
        // this.x_icon_card = "(//div/div/button[@type='icon-secondary'])[5]"  // X icon in the creation card
        this.dropdown = "//li[contains  (@class,'p-dropdown-item')]" // Dropdown
        this.button_add_events = "//div[@class='collection-editor']/button"  // Button Add events
        this.first_chips_event = "//div[@class='collection-editor']/div[@data-test='chips-items']/div[contains(@class, 'event')][1]"  // First event chips
        this.button_select_dialog = "//button[contains(@aria-label, 'Select')]" // Button Select events

        // Created Cards
        this.mode_switcher = "//div[@data-test='header-right']/div/div/div/input[@role='switch']"  // Mode Switcher
        this.button_save = "//button[@aria-label='Save']"  // Button Save
        this._3_dots_card = "(//div[@data-test='prospace-header']/div[@data-test='header-right']/div/button[@type='icon-secondary'])[1]"  // 3 dots in the card
        this.item_id = "//div[contains(@class, 'item-id')]"  // Item ID in the card
        this.x_icon = "(//div[@data-test='prospace-header']/div[@data-test='header-right']/div/button[@type='icon-secondary'])[3]"  // X icon in the created card
        this.name_of_added_file = "//span[contains(@class,'text-purple-800')]"     // Name of Uploaded file
        this.input_name_card = "//div[@data-test='header-left']//input[contains(@data-pc-name,'inputtext')]" // Name of the Element in the Card

        // Grid
        this.button_delete_item = "//button[contains(@aria-label,'Delete item')]"  // Button Delete Item in the Modal Window
        this.button_restore_item = "//button[contains(@aria-label,'Restore item')]"  // Button Restore Item in the Modal Window
        this._3_dots_grid = `(//div[contains(@class,'flex justify-center')]/div[contains(@class,'flex')])[${[getRandomInt(1, 10)]}]`  // Grid 3 dots
        this.link_delete_in_3_dots = "(//li[contains(@aria-label, 'Delete')])"  // Button Delete in the grid 3 dots
        this.link_restore_in_3_dots = "(//li[contains(@aria-label, 'Restore')])"  // Button Restore in the grid 3 dots
        this.any_item_name = `(//div[contains(@class, 'border-dotted')])[${[getRandomInt(1, 10)]}]`  // Grid Any Name of Items
        this.last_item_name = "(//div[contains(@class, 'border-dotted')])[1]"  // Grid Last Name of Items
        this.button_create_new = " //button[@aria-label='Create new']"  // Button Create New
        this.input_search_grid = "//input[contains(@data-pc-name,'inputtext')]"  // Grid Search field
        this.deleted_tab_grid = "(//span[contains(text(), 'Deleted')]//ancestor::div[contains(@class, 'h-8')])"  // Deleted Tab
        this.auto_tab_grid = "(//span[contains(text(), 'Auto')]//ancestor::div[contains(@class, 'h-8')])"  // Auto Tab
        this.manual_tab_grid = "(//span[contains(text(), 'Manual')]//ancestor::div[contains(@class, 'h-8')])"  // Manual Tab
        // this.deleted_tab_grid_is_active = "//div[contains(@class, 'active')]/span[text()='Deleted']"  // Deleted
        this.all_tab_grid = "(//span[contains(text(), 'All')]//ancestor::div[contains(@class, 'h-8')])" // All Tab
        // this.all_tab_grid_is_active = "//div[contains(@class, 'active')]/span[text()='All']"  # Кнопка-вкладка All активна
        this.count_items_in_footer_grid = "(//span[@class='text-indigo-950'])[2]"  // Count of items in the footer
        this.unselected_checkbox_grid = `(//input[@type='checkbox' and @aria-label='Row Unselected']/ancestor::div[@class='p-checkbox p-component'])[${[getRandomInt(1, 10)]}]`  // Unselected checkbox
        this.checkbox_dialog = `(//td[contains(@class,'hide-selection-shadow')]/div[contains(@class,'p-checkbox p-component')]/div[2]/span[@class='p-checkbox-icon'])[${[getRandomInt(1, 6)]}]`  // Checkboxes in the popovers
        // this.selected_checkbox = `(//div[contains(@class,'p-highlight')])${[Math.random() * 10]}`  # Выбранный чекбокс в гриде
        this.select_all_checkbox = "(//div[@class='p-checkbox p-component'])[1]"  // Select All checkbox
        this.delete_button_upper_panel = "//button[@aria-label='Delete']"  // Button Delete in the top panel
        this.restore_button_upper_panel = "//button[@aria-label='Restore']"  // Button Restore in the top panel
        this.counter_upper_panel = "//span[text()='Selected']/following-sibling::span[@class='prospace-counter-box']"  // Counter in the top panel
        this.button_all_fiters = "//div[contains(@class, 'all-filters')]"  // Button All filters
        this.counter_all_filters = "//div[contains(@class,'all-filters')]/span[@class='prospace-counter-box']"  // Counter in the All Filters

        // Filters
        this.button_apply = "//button[contains(@aria-label,'Apply')]"  // Button Apply
        this.counter_filters = "(//div[@class='header']/span[@class='prospace-counter-box'])[1]"  // Filter Counters
        this.button_clear_filters = "//button[contains(@aria-label, 'Clear')]"  // Button Clear in the All Filters
        this.x_icon_filters = "(//button[@type='icon-secondary'])[3]"  // X Icons in the All Filters
        this.x_icons_input_filters = "//div[@class='header']/div[contains(@class,'items-center')]"  // Individuals X Icons for every fields in the All Filters
    }

    async delete_using_3_dots_grid(){
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp._3_dots_grid).click()
        await this.page.locator(bp.link_delete_in_3_dots).click()
        await expect.soft(this.page.locator(bp.button_delete_item), "Confirmation window is not appeared").toBeVisible();
        await this.page.locator(bp.button_delete_item).click()
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        await this.page.reload()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Element is not deleted").toEqual(Number(count_of_items_before) - 1)

    }

    async delete_using_checkbox_grid(){
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.unselected_checkbox_grid).click()
        await this.page.locator(bp.delete_button_upper_panel).click()
        await expect.soft(this.page.locator(bp.button_delete_item), "Confirmation window is not appeared").toBeVisible();
        await this.page.locator(bp.button_delete_item).click()
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        await this.page.reload()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Element is not deleted").toEqual(Number(count_of_items_before) - 1)

    }

    async delete_using_card(){
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.last_item_name).click()
        await this.page.locator(bp._3_dots_card).click()
        await this.page.locator(bp.link_delete_in_3_dots).click()
        await expect.soft(this.page.locator(bp.button_delete_item), "Confirmation window is not appeared").toBeVisible();
        await this.page.locator(bp.button_delete_item).click()
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        await this.page.reload()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Element is not deleted").toEqual(Number(count_of_items_before) - 1)

    }

    async select_all_delete(){
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.select_all_checkbox).click()
        const count_deleted_items = await this.page.locator(bp.counter_upper_panel).textContent()
        await this.page.locator(bp.delete_button_upper_panel).click()
        await expect.soft(this.page.locator(bp.button_delete_item), "Confirmation window is not appeared").toBeVisible();
        await this.page.locator(bp.button_delete_item).click()
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();
        await this.page.reload()
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await expect.soft(Number(count_of_items_after), "Elements are not deleted").toEqual(Number(count_of_items_before) - Number(count_deleted_items))

    }

    async restore_using_3_dots_grid(){
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
        await this.page.locator(bp._3_dots_grid).click()
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
        await expect.soft(Number(count_of_items_after), "Element is not restored").toEqual(Number(count_of_items_before) - 1)

    }

    async restore_using_checkbox_grid(){
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
        await this.page.locator(bp.unselected_checkbox_grid).click()
        await this.page.locator(bp.restore_button_upper_panel).click()
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
        await expect.soft(Number(count_of_items_after), "Element is not restored").toEqual(Number(count_of_items_before) - 1)

    }

    async restore_using_card(){
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

const future_start_date = faker.date.between({from: new Date(), to: '01-01-2035'});
export const random_start_date = future_start_date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

const future_end_date = faker.date.between({from: '01-01-2035', to: '01-01-2040'});
export const random_end_date = future_end_date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});


