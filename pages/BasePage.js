const {expect} = require("@playwright/test");

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.BasePage = class BasePage {

    constructor(page) {
        this.page = page;
        this.toast_message_success = "//div[contains(@data-pc-section,'messagetext')]"  // Success toast message
        this.head_of_page = "//div[@class='ps-font-TopHeader text-indigo-950']"  //  Head of page

        // Menu
        this.side_button_modules = "(//div[contains(@data-test,'prospace-sidebar-item')])[2]" // Side Menu
        this.link_products = "//a[text()='Products']"  // Link Products in the Side Menu
        this.link_clients = "//a[text()='Clients']"  // Link Clients in the Side Menu
        this.link_client_products = "//a[text()='Client Products']"   // Link Client Products in the Side Menu
        this.link_client_product_prices = "//a[text()='Client Product Prices']"  // Link Client Product Prices in the Side Menu

        // Creation Cards
        this.button_create_new_card = " //button[@aria-label='Create new']"  // Button Create New
        this.button_create_card = "//button[@aria-label='Create']"  // Button Create
        this.link_delete_in_3_dots_card = "//div[contains(@class,'prospace-dots-item')]"  // Button Delete in the card 3 dots
        this.x_icon_card = "(//div/div/button[@type='icon-secondary'])[5]"  // X icon in the creation card
        this.dropdown = "//li[contains(@class,'p-dropdown-item')]" // Dropdown

        // Created Cards
        this.mode_switcher = "//span[@class='p-inputswitch-slider']"  // Mode Switcher
        this.button_save = "//button[@aria-label='Save']"  // Button Save
        this._3_dots_card = "(//div/div/button[@type='icon-secondary'])[3]"  // 3 dots in the card
        this.item_id = "//div[contains(@class, 'item-id')]"  // Item ID in the card
        this.x_icon = "(//div/div/button[@type='icon-secondary'])[6]"  // X icon in the created card
        this.input_search_grid = "//input[contains(@data-pc-name,'inputtext')]"  // Grid Search field
        this.deleted_tab_grid = "(//div[contains(@class, 'h-8')])[2]"  // Deleted Tab
        // this.deleted_tab_grid_is_active = "//div[contains(@class, 'active')]/span[text()='Deleted']"  // Deleted
        this.all_tab_grid = "(//div[contains(@class, 'h-8')])[1]" // All Tab
        // this.all_tab_grid_is_active = "//div[contains(@class, 'active')]/span[text()='All']"  # Кнопка-вкладка All активна
        this.count_items_in_footer_grid = "(//span[@class='text-indigo-950'])[2]"  // Count of items in the footer
        this.unselected_checkbox = `(//input[@type='checkbox' and @aria-label='Row Unselected']/ancestor::div[@class='p-checkbox p-component'])[${[getRandomInt(1, 10)]}]`  // Unselected checkbox
        // this.selected_checkbox = `(//div[contains(@class,'p-highlight')])${[Math.random() * 10]}`  # Выбранный чекбокс в гриде
        this.select_all_checkbox = "(//div[@class='p-checkbox p-component'])[1]"  // Select All checkbox
        this.delete_button_upper_panel = "//button[@aria-label='Delete']"  // Button Delete in the top panel
        this.counter_upper_panel = "//span[@class='prospace-counter-box']"  // Counter in the top panel
        this.button_all_fiters = "//div[contains(@class, 'all-filters')]"  // Button All filters
        this.counter_all_filters = "//div[contains(@class,'all-filters')]/span[@class='prospace-counter-box']"  // Counter in the All Filters

        // Grid
        this.button_delete_item = "//button[contains(@aria-label,'Delete item')]"  // Button Delete Item in the Modal Window
        this._3_dots_grid = `(//div[contains(@class,'flex justify-center')]/div[contains(@class,'flex')])[${[getRandomInt(1, 10)]}]`  // Grid 3 dots
        this.link_delete_restore_in_3_dots_grid = "(//div[contains(@class, 'prospace-dots-item')])[2]"  // Button Delete in the grid 3 dots
        this.any_item_name = `(//div[contains(@class, 'border-dotted')])[${[getRandomInt(1, 10)]}]`  // Grid Any Name of Items
        this.last_item_name = "(//div[contains(@class, 'border-dotted')])[1]"  // Grid Last Name of Items

        // Filters
        this.button_apply_filters = "//button[contains(@aria-label,'Apply')]"  // Button Apply
        this.counter_filters = "(//div[@class='header']/span[@class='prospace-counter-box'])[1]"  // Filter Counters
        this.button_clear_filters = "//button[contains(@aria-label, 'Clear')]"  // Button Clear in the All Filters
        this.x_icon_filters = "(//button[@type='icon-secondary'])[3]"  // X Icons in the All Filters
        this.x_icons_input_filters = "//div[@class='header']/div[contains(@class,'items-center')]"  // Individuals X Icons for every fields in the All Filters
    }
}

