import {BasePage, getRandomInt } from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import { ProductsPage } from "../pages/ProductsPage";


exports.ProductGroupsPage = class ProductGroupsPage {

    constructor(page) {
        this.page = page;
        // Initiation dialog
        this.input_name_dialog = "//div[@class='prospace-modal-wrapper']/div/div//input[contains(@data-pc-name,'inputtext')]"  // Name input
        this.button_auto_dialog = "//div[@aria-label='Auto']"  // Button Auto
        this.button_manual_dialog = "//div[@aria-label='Manual']"  // Button Manual

        // Creation form
        this.button_add_new_condition_card = "//button[@aria-label='Add new condition']"  // Button Add New Condition
        this.input_description_card = "//textarea[@type='text']" // Description input
        this.selector_option_card = "(//div[contains(@class,'p-treeselect-label')])[2]" // Selector Option
        this.list_category_option_card = "//li[@aria-label='Category']" // List Category Option
        this.list_eanpc_option_card = "//li[@aria-label='EAN Pc']" // List EAN Pc Option
        this.list_brand_option_card = "//li[@aria-label='Brand']" // List EAN Pc Option
        this.input_value_card = "//div[@data-test='prospace-form-block']/div//input[contains(@data-pc-name,'inputtext')]" // Value input
        this.product_counter_card = "//div[@class='bottom-panel']//span[@class='prospace-counter-box']" // Product's counter
        this.product_panel_card = "//div[@class='panel']" // Product's panel
        this.button_add_card = "//button[@aria-label='Add']" // Button Add

        // Grid
        this.last_type_in_grid = "(//span[text()='Type']/following-sibling::div[contains(@class,'relative inline-block')])[1]"   // Grid last Type
        this.last_description_in_grid = "(//span[text()='Description']/following-sibling::div[contains(@class,'relative inline-block')])[1]"  // Grid last Description
        this.last_products_in_grid = "(//span[text()='Products']/following-sibling::div/span)[1]"  // Grid last Products

        this.any_type_in_grid = `(//span[text()='Type']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Type
        this.any_description_in_grid = `(//span[text()='Description']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Description
        this.any_segment_name_in_grid = `(//span[text()='Products']/following-sibling::div/span)[${[getRandomInt(2, 20)]}]`  // Grid any Products
    }

    async open_product_groups_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_product_groups).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Product groups")
    }

    async create_auto_product_group() {
        // Find Product's Category
        const bp = new BasePage()
        const pp = new ProductsPage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Products")
        const grid_product_category = await this.page.locator(pp.any_category_in_grid).textContent()

        // Return to the Product Groups
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_product_groups).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Product groups")

        // Create New Auto Product Group
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_name_dialog, faker.location.city() + " Auto Group")
        await this.page.locator(bp.button_create_card).click()
        await this.page.fill(this.input_description_card, faker.lorem.sentence({min: 10, max: 20}))
        await this.page.locator(this.button_add_new_condition_card).click()
        await this.page.locator(this.selector_option_card).click()
        await this.page.locator(this.list_category_option_card).click()
        await this.page.fill(this.input_value_card, grid_product_category)
        // TODO: Need to think how we can remove waitForTimeout(1000).
        await this.page.waitForTimeout(1000)
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click()
        await this.page.reload()

        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_type = await this.page.locator(this.last_type_in_grid).textContent();
        const grid_description = await this.page.locator(this.last_description_in_grid).textContent();
        const grid_count_products = await this.page.locator(this.last_products_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click()
        await this.page.locator(bp.mode_switcher).click()
        const card_description = await this.page.locator(this.input_description_card).inputValue()
        const card_name = await this.page.locator(bp.input_name_card).inputValue()
        const card_count_products = await this.page.locator(this.product_counter_card).textContent()

        // Check The Matching of Grid and Card Info
        await expect.soft(card_name, "Product Group Name is not match").toBe(grid_name)
        await expect.soft(grid_type, "Type is not match").toBe("Auto")
        await expect.soft(card_description, "Description is not match").toBe(grid_description)
        await expect.soft(card_count_products, "Count of Products is not match").toBe(grid_count_products)
        await expect.soft(Number(count_of_items_after), "Element is not created or created more than 1 product").toBe(Number(count_of_items_before) + 1)

    }

    async create_manual_product_group() {
        // Find Product's Category
        const bp = new BasePage()

        // Create New Manual Product Group
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_name_dialog, faker.location.city() + " Manual Group")
        await this.page.locator(this.button_manual_dialog).click()
        await this.page.locator(bp.button_create_card).click()
        await this.page.fill(this.input_description_card, faker.lorem.sentence({min: 10, max: 20}))
        await this.page.locator(this.product_panel_card).click()
        await this.page.locator(this.button_add_card).click()

        let count = 0
        while (count !== 4) {
            await this.page.locator(bp.checkbox_dialog).click()
            count ++
        }
        await this.page.locator(bp.button_select_dialog).click()
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click()
        await this.page.reload()

        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_type = await this.page.locator(this.last_type_in_grid).textContent();
        const grid_description = await this.page.locator(this.last_description_in_grid).textContent();
        const grid_count_products = await this.page.locator(this.last_products_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click()
        await this.page.locator(bp.mode_switcher).click()
        const card_description = await this.page.locator(this.input_description_card).inputValue()
        const card_name = await this.page.locator(bp.input_name_card).inputValue()
        const card_count_products = await this.page.locator(this.product_counter_card).textContent()

        // Check The Matching of Grid and Card Info
        await expect.soft(card_name, "Product Group Name is not match").toBe(grid_name)
        await expect.soft(grid_type, "Type is not match").toBe("Manual")
        await expect.soft(card_description, "Description is not match").toBe(grid_description)
        await expect.soft(card_count_products, "Count of Products is not match").toBe(grid_count_products)
        await expect.soft(Number(count_of_items_after), "Element is not created or created more than 1 product").toBe(Number(count_of_items_before) + 1)

    }

    async read_product_group(){
        // Find Any Product Group
        const bp = new BasePage()

        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_description = await this.page.locator(this.last_description_in_grid).textContent();
        const grid_count_products = await this.page.locator(this.last_products_in_grid).textContent();

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        const card_name = await this.page.locator(bp.input_name_card).inputValue();
        const card_description = await this.page.locator(this.input_description_card).inputValue();
        const card_count_products = await this.page.locator(this.product_counter_card).textContent();

        // Check the Matching of Grid and Card Info
        await expect.soft(card_name, "Product Groups Name is not match").toBe(grid_name)
        await expect.soft(card_description, "Description is not match").toBe(grid_description)
        await expect.soft(card_count_products, "Count of Products is not match").toBe(grid_count_products)
    }

    async update_auto_product_group(){
        // Find Product's EAN Pc
        const bp = new BasePage()
        const pp = new ProductsPage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Products")
        const grid_product_brand = await this.page.locator(pp.any_brand_in_grid).textContent()

        // Return to the Product Groups
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_product_groups).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Product groups")

        // Get Last Auto Product Group Info from Grid Before Update
        await this.page.locator(bp.auto_tab_grid).click();
        let count_1 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count_1++;
            if (count_1 === 10) {
                break;
            }
        }
        const name_before = await this.page.locator(bp.last_item_name).textContent();
        const description_before = await this.page.locator(this.last_description_in_grid).textContent();
        const count_products_before = await this.page.locator(this.last_products_in_grid).textContent();

        // Update Last Product Group
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(bp.input_name_card).clear();
        await this.page.fill(bp.input_name_card, faker.location.city() + " UPD");
        await this.page.fill(this.input_description_card, faker.lorem.sentence({min: 10, max: 20}))
        await this.page.locator(this.selector_option_card).click()
        await this.page.locator(this.list_brand_option_card).click()
        await this.page.fill(this.input_value_card, grid_product_brand)
        // TODO: Need to think how we can remove waitForTimeout(1000).
        await this.page.waitForTimeout(1000)
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // Get Last Auto Product Group Info from Grid After Update
        await this.page.locator(bp.x_icon).click()
        await this.page.reload()

        await this.page.locator(bp.auto_tab_grid).click();
        let count_2 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count_2++;
            if (count_2 === 10) {
                break;
            }
        }

        const name_after = await this.page.locator(bp.last_item_name).textContent();
        const description_after = await this.page.locator(this.last_description_in_grid).textContent();
        const count_products_after = await this.page.locator(this.last_products_in_grid).textContent();

        // Check Update
        await expect.soft(name_before, "Product Groups Name is not changed").not.toBe(name_after)
        await expect.soft(description_before, "Description is not changed").not.toBe(description_after)
        await expect.soft(count_products_before, "Count of Products is not changed").not.toBe(count_products_after)

    }

    async update_manual_product_group(){
        // Get Last Manual Product Group Info from Grid Before Update
        const bp = new BasePage()
        await this.page.locator(bp.manual_tab_grid).click();
        let count_1 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count_1++;
            if (count_1 === 10) {
                break;
            }
        }

        const name_before = await this.page.locator(bp.last_item_name).textContent();
        const description_before = await this.page.locator(this.last_description_in_grid).textContent();
        const count_products_before = await this.page.locator(this.last_products_in_grid).textContent();

        // Update Last Manual Product Group
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(bp.input_name_card).clear();
        await this.page.fill(bp.input_name_card, faker.location.city() + " UPD");
        await this.page.locator(this.input_description_card).clear();
        await this.page.fill(this.input_description_card, faker.lorem.sentence({min: 10, max: 20}));
        await this.page.locator(this.product_panel_card).click()
        await this.page.locator(this.button_add_card).click()

        let count = 0
        while (count !== 2) {
            await this.page.locator(bp.checkbox_dialog).click()
            count ++
        }
        await this.page.locator(bp.button_select_dialog).click()
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // Get Last Manual Product Group Info from Grid After Update
        await this.page.locator(bp.x_icon).click()
        await this.page.reload()

        await this.page.locator(bp.manual_tab_grid).click();
        let count_2 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() === "0") {
            await this.page.waitForTimeout(1000)
            count_2++;
            if (count_2 === 10) {
                break;
            }
        }

        const name_after = await this.page.locator(bp.last_item_name).textContent();
        const description_after = await this.page.locator(this.last_description_in_grid).textContent();
        const count_products_after = await this.page.locator(this.last_products_in_grid).textContent();

        // Check Update
        await expect.soft(name_before, "Product Groups Name is not changed").not.toBe(name_after)
        await expect.soft(description_before, "Description is not changed").not.toBe(description_after)
        await expect.soft(count_products_before, "Count of Products is not changed").not.toBe(count_products_after)
    }

}