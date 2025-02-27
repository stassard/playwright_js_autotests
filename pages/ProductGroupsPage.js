import {BasePage, getRandomInt } from './BasePage.js';
import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import { ProductsPage } from "../pages/ProductsPage";


exports.ProductGroupsPage = class ProductGroupsPage {

    constructor(page) {
        this.page = page;
        // Initiation dialog
        this.input_name_dialog = "//div[@class='prospace-modal-wrapper']/div/div//input[contains(@data-pc-name,'inputtext')]"  // Name input
        this.button_auto_dialog = "//div[@class='p-dialog-content']//button[1]"  // Button Auto
        this.button_manual_dialog = "//div[@class='p-dialog-content']//button[2]"  // Button Manual

        // Creation form
        this.button_add_new_condition_card = "//button[@aria-label='Add new condition']"  // Button Add New Condition
        this.input_description_card = "//textarea[@type='text']" // Description input
        this.selector_option_card = "(//div[contains(@class,'p-treeselect-label')])[2]" // Selector Option
        this.list_category_option_card = "//li[@aria-label='Category']" // List Category Option
        this.list_eanpc_option_card = "//li[@aria-label='EAN Pc']" // List EAN Pc Option
        this.list_brand_option_card = "//li[@aria-label='Brand']" // List EAN Pc Option
        this.input_value_card = "//div[@data-test='prospace-form-block']/div//input[contains(@data-pc-name,'inputtext')]" // Value input

        // Grid
        this.last_type_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[3]"   // Grid last Type
        this.last_description_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[4]"  // Grid last Description
        this.last_products_in_grid = "((//tr[1]/td[@data-pc-section='bodycell']/div)[5])/span"  // Grid last Products

        this.any_type_in_grid = `(//span[text()='Type']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Type
        this.any_description_in_grid = `(//span[text()='Description']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Description
        this.any_segment_name_in_grid = `(//span[text()='Products']/following-sibling::div/span)[${[getRandomInt(2, 20)]}]`  // Grid any Products
    }

    async open_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_product_groups).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Product groups")
    }

    async create_auto_product_group(name, description) {
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
        let count_of_items_before
        if (await this.page.locator(bp.count_items_in_footer_grid).isVisible()){
            count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
            await this.page.locator(bp.button_create_new).click()
        }
        if (await this.page.locator(bp.nothing_to_show_icon).isVisible()){
            await this.page.locator(bp.button_create_new).click()
            count_of_items_before = "0"
        }
        await this.page.fill(this.input_name_dialog, name)
        await this.page.locator(bp.button_create_card).click()
        await this.page.fill(this.input_description_card, description)
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
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_name = await this.page.locator(bp.first_item_name).textContent();
        // const grid_type = await this.page.locator(this.last_type_in_grid).textContent();
        // const grid_description = await this.page.locator(this.last_description_in_grid).textContent();
        // const grid_count_products = await this.page.locator(this.last_products_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // // Get Info From Card
        // await this.page.locator(bp.first_item_name).click()
        // await this.page.locator(bp.mode_switcher).click()
        // const card_description = await this.page.locator(this.input_description_card).inputValue()
        // const card_name = await this.page.locator(bp.input_name_card).inputValue()
        // const card_count_products = await this.page.locator(bp.counter_bottom_panel).textContent()

        // Check The Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);

    }

    async create_manual_product_group(name, description) {
        // Find Product's Category
        const bp = new BasePage()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Create New Manual Product Group
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.fill(this.input_name_dialog, name)
        await this.page.locator(this.button_manual_dialog).click()
        await this.page.locator(bp.button_create_card).click()
        await this.page.fill(this.input_description_card, description)
        await this.page.locator(bp.bottom_panel).click()
        await this.page.locator(bp.button_add_bottom_panel).click()

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
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_name = await this.page.locator(bp.first_item_name).textContent();
        // const grid_type = await this.page.locator(this.last_type_in_grid).textContent();
        // const grid_description = await this.page.locator(this.last_description_in_grid).textContent();
        // const grid_count_products = await this.page.locator(this.last_products_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Get Info From Card
        // await this.page.locator(bp.first_item_name).click()
        // await this.page.locator(bp.mode_switcher).click()
        // const card_description = await this.page.locator(this.input_description_card).inputValue()
        // const card_name = await this.page.locator(bp.input_name_card).inputValue()
        // const card_count_products = await this.page.locator(bp.counter_bottom_panel).textContent()

        // Check The Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);

    }

    async read_element(){
        // Find Any Product Group
        const bp = new BasePage()

        // Get Info From Grid
        const grid_name = await this.page.locator(bp.first_item_name).textContent();
        const grid_description = await this.page.locator(this.last_description_in_grid).textContent();
        const grid_count_products = await this.page.locator(this.last_products_in_grid).textContent();

        // Get Info From Card
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        const card_name = await this.page.locator(bp.input_name_card).inputValue();
        const card_description = await this.page.locator(this.input_description_card).inputValue();
        const card_count_products = await this.page.locator(bp.counter_bottom_panel).textContent();

        // Check the Matching of Grid and Card Info
        await expect.soft(card_name, "Product Groups Name is not match").toBe(grid_name)
        await expect.soft(card_description, "Description is not match").toBe(grid_description)
        await expect.soft(card_count_products, "Count of Products is not match").toBe(grid_count_products)
    }

    async update_auto_product_group(name, description) {
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
        const name_before = await this.page.locator(bp.first_item_name).textContent();
        const description_before = await this.page.locator(this.last_description_in_grid).textContent();
        const count_products_before = await this.page.locator(this.last_products_in_grid).textContent();

        // Update Last Product Group
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(bp.input_name_card).clear();
        await this.page.fill(bp.input_name_card, name);
        await this.page.fill(this.input_description_card, description)
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

        const name_after = await this.page.locator(bp.first_item_name).textContent();
        const description_after = await this.page.locator(this.last_description_in_grid).textContent();
        const count_products_after = await this.page.locator(this.last_products_in_grid).textContent();

        // Check Update
        await expect.soft(name_before, "Product Groups Name is not changed").not.toBe(name_after)
        await expect.soft(description_before, "Description is not changed").not.toBe(description_after)
        await expect.soft(count_products_before, "Count of Products is not changed").not.toBe(count_products_after)

    }

    async update_manual_product_group(name, description) {
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

        const name_before = await this.page.locator(bp.first_item_name).textContent();
        const description_before = await this.page.locator(this.last_description_in_grid).textContent();
        const count_products_before = await this.page.locator(this.last_products_in_grid).textContent();

        // Update Last Manual Product Group
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(bp.input_name_card).clear();
        await this.page.fill(bp.input_name_card, name);
        await this.page.locator(this.input_description_card).clear();
        await this.page.fill(this.input_description_card, description);
        await this.page.locator(bp.bottom_panel).click()
        await this.page.locator(bp.button_add_bottom_panel).click()

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

        const name_after = await this.page.locator(bp.first_item_name).textContent();
        const description_after = await this.page.locator(this.last_description_in_grid).textContent();
        const count_products_after = await this.page.locator(this.last_products_in_grid).textContent();

        // Check Update
        await expect.soft(name_before, "Product Groups Name is not changed").not.toBe(name_after)
        await expect.soft(description_before, "Description is not changed").not.toBe(description_after)
        await expect.soft(count_products_before, "Count of Products is not changed").not.toBe(count_products_after)
    }

}