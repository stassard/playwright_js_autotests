import {BasePage, getRandomInt} from '../pages/BasePage';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';

exports.ProductsPage = class ProductsPage {

    constructor(page) {
        this.page = page;
        // Creation form
        this.input_name_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"                     // Name input
        this.input_EANC_card = "(//input[contains(@data-pc-name,'inputtext')])[4]"                     // EANC input
        this.input_EANP_card = "(//input[contains(@data-pc-name,'inputtext')])[5]"                     // EANP input
        this.input_category_card = "(//input[contains(@data-pc-name,'inputtext')])[6]"                 // Category input
        this.input_technology_card = "(//input[contains(@data-pc-name,'inputtext')])[7]"               // Technology input
        this.input_brand_card = "(//input[contains(@data-pc-name,'inputtext')])[8]"                    // Brand input
        this.unit_of_measure_card = "//div[contains(@data-pc-name,'select')]"                      // Unit of Measure selector
        this.units_of_measure_selector_card = `(//li[contains(@role,'option')])[${[getRandomInt(1, 7)]}]`           // List of Unit of Measure
        this.input_unit_card = "//input[contains(@data-pc-name,'pcinput')]"                            // Unit input

        // Grid
        this.last_eanc_in_grid = "(//span[text()='EAN Case']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                    // Grid last EAN Case
        this.last_eanp_in_grid = "(//span[text()='EAN Pc']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                    // Grid last EAN Pc
        this.last_category_in_grid = "(//span[text()='Category']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                // Grid last Category
        this.last_technology_in_grid = "(//span[text()='Technology']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                              // Grid last Technology
        this.last_brand_in_grid = "(//span[text()='Brand']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                   // Grid last Brand
        this.last_unit_in_grid = "(//span[text()='Unit']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                    // Grid last Unit
        this.last_unit_of_measure_in_grid = "(//span[text()='Unit Of Measure']/following-sibling::div[contains(@class,'relative inline-block')])[1]"      // Grid last Unit of Measure
        this.any_category_in_grid = `(//span[text()='Category']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`     //Grid any Category
        this.any_brand_in_grid = `(//span[text()='Brand']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`           // Grid any Brand
        this.any_unit_of_measure_in_grid = `(//span[text()='Unit Of Measure']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any Unit of Measure
        this.any_unit_in_grid = `(//span[text()='Unit']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`             // Grid any Unit
        this.any_technology_in_grid = `(//span[text()='Technology']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`     // Grid any Technology
        this.any_eanp_in_grid = `(//span[text()='EAN Pc']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`                                   // Grid any EAN Pc

        // Created form
        // this.value_of_unit_of_measure_card = "//span[contains(@class,'p-dropdown-label')]/span"   // Значение поля Unit of Measure

        // All Filters
        this.input_sku_name_filters = "(//input[contains(@data-pc-name,'inputtext')])[2]"                 // Input SKU Name
        this.input_category_filters = "(//input[contains(@data-pc-name,'inputtext')])[3]"                 // Input Category
        this.input_technology_filters = "(//input[contains(@data-pc-name,'inputtext')])[4]"               // Input Technology
        this.input_brand_filters = "(//input[contains(@data-pc-name,'inputtext')])[5]"                    // Input Brand
        this.input_unit_of_measure_filters = "(//input[contains(@data-pc-name,'inputtext')])[6]"          // Input Unit of Measure
        this.input_unit_from_filters = "(//input[@data-pc-name='pcinput'])[1]"                            // Input Unit(From)
        this.input_unit_to_filters = "(//input[@data-pc-name='pcinput'])[2]"                              // Input Unit(To)

        // Fake Data
        this.random_name = faker.food.ethnicCategory() + faker.food.dish()
        this.random_eanc = faker.string.numeric({length: { min: 7, max: 10}})
        this.random_eanp = faker.string.numeric({length: { min: 7, max: 10}})
        this.random_category= faker.food.ethnicCategory()
        this.random_technology= faker.food.fruit()
        this.random_brand= faker.company.name()
        this.random_unit = String(getRandomInt(1, 1000))
    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Products")
    }

    async create_element(name, ean_case, ean_pc, category, technology, brand, unit){
        // Creating Product
        const bp = new BasePage();
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click();
        await this.page.fill(this.input_name_card, name);
        await this.page.fill(this.input_EANC_card, ean_case);
        await this.page.fill(this.input_EANP_card, ean_pc);
        await this.page.fill(this.input_category_card, category);
        await this.page.fill(this.input_technology_card, technology);
        await this.page.fill(this.input_brand_card, brand);
        await this.page.locator(this.unit_of_measure_card).click();
        await this.page.locator(this.units_of_measure_selector_card).click();
        await this.page.fill(this.input_unit_card, unit);
        await this.page.locator(bp.button_create_card).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click();
        const card_name = await this.page.locator(this.input_name_card).inputValue();
        const card_eanc = await this.page.locator(this.input_EANC_card).inputValue();
        const card_eanp = await this.page.locator(this.input_EANP_card).inputValue();
        const card_category = await this.page.locator(this.input_category_card).inputValue();
        const card_technology = await this.page.locator(this.input_technology_card).inputValue();
        const card_brand = await this.page.locator(this.input_brand_card).inputValue();
        const card_unit_of_measure = await this.page.locator(this.unit_of_measure_card).getAttribute("model-value-prop");
        const card_unit = await this.page.locator(this.input_unit_card).getAttribute("aria-valuenow");
        await this.page.locator(bp.x_icon).click();

        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_eanc = await this.page.locator(this.last_eanc_in_grid).textContent();
        const grid_eanp = await this.page.locator(this.last_eanp_in_grid).textContent();
        const grid_category = await this.page.locator(this.last_category_in_grid).textContent();
        const grid_technology = await this.page.locator(this.last_technology_in_grid).textContent();
        const grid_brand = await this.page.locator(this.last_brand_in_grid).textContent();
        const grid_unit_of_measure = await this.page.locator(this.last_unit_of_measure_in_grid).textContent();
        const grid_unit = await this.page.locator(this.last_unit_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check Matching of Grid and Card Info
        await expect.soft(card_name, "Name is not match").toEqual(grid_name)
        await expect.soft(card_eanc, "EANC is not match").toEqual(grid_eanc)
        await expect.soft(card_eanp, "EANP is not match").toEqual(grid_eanp)
        await expect.soft(card_category, "Category is not match").toEqual(grid_category)
        await expect.soft(card_technology, "Technology is not match").toEqual(grid_technology)
        await expect.soft(card_brand, "Brand is not match").toEqual(grid_brand)
        await expect.soft(card_unit_of_measure, "Unit Of Measure is not match").toEqual(grid_unit_of_measure)
        await expect.soft(card_unit, "Unit is not match").toEqual(grid_unit)
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);

    }

    async read_element(){
        // Find Any Product
        const bp = new BasePage();
        
        // Get Info From Grid
        const grid_name = await this.page.locator(bp.last_item_name).textContent();
        const grid_eanc = await this.page.locator(this.last_eanc_in_grid).textContent();
        const grid_eanp = await this.page.locator(this.last_eanp_in_grid).textContent();
        const grid_category = await this.page.locator(this.last_category_in_grid).textContent();
        const grid_technology = await this.page.locator(this.last_technology_in_grid).textContent();
        const grid_brand = await this.page.locator(this.last_brand_in_grid).textContent();
        const grid_unit_of_measure = await this.page.locator(this.last_unit_of_measure_in_grid).textContent();
        const grid_unit = await this.page.locator(this.last_unit_in_grid).textContent();

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click();
        const card_name = await this.page.locator(this.input_name_card).inputValue();
        const card_eanc = await this.page.locator(this.input_EANC_card).inputValue();
        const card_eanp = await this.page.locator(this.input_EANP_card).inputValue();
        const card_category = await this.page.locator(this.input_category_card).inputValue();
        const card_technology = await this.page.locator(this.input_technology_card).inputValue();
        const card_brand = await this.page.locator(this.input_brand_card).inputValue();
        const card_unit_of_measure = await this.page.locator(this.unit_of_measure_card).getAttribute("model-value-prop");
        const card_unit = await this.page.locator(this.input_unit_card).getAttribute("aria-valuenow");

        // Check the Matching of Grid and Card Info
        await expect.soft(card_name, "Name is not match").toEqual(grid_name)
        await expect.soft(card_eanc, "EANC is not match").toEqual(grid_eanc)
        await expect.soft(card_eanp, "EANP is not match").toEqual(grid_eanp)
        await expect.soft(card_category, "Category is not match").toEqual(grid_category)
        await expect.soft(card_technology, "Technology is not match").toEqual(grid_technology)
        await expect.soft(card_brand, "Brand is not match").toEqual(grid_brand)
        await expect.soft(card_unit_of_measure, "Unit Of Measure is not match").toEqual(grid_unit_of_measure)
        await expect.soft(card_unit, "Unit is not match").toEqual(grid_unit)
    }

    async update_element(name, ean_case, category, technology, brand, unit){
        // Get Last Product Info from Grid Before Update
        const bp = new BasePage();
        const name_before = await this.page.locator(bp.last_item_name).textContent();
        const eanc_before = await this.page.locator(this.last_eanc_in_grid).textContent();
        const eanp_before = await this.page.locator(this.last_eanp_in_grid).textContent();
        const category_before = await this.page.locator(this.last_category_in_grid).textContent();
        const technology_before = await this.page.locator(this.last_technology_in_grid).textContent();
        const brand_before = await this.page.locator(this.last_brand_in_grid).textContent();
        const unit_of_measure_before = await this.page.locator(this.last_unit_of_measure_in_grid).textContent();
        const unit_before = await this.page.locator(this.last_unit_in_grid).textContent();

        // Update Last Product
        await this.page.locator(bp.last_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_name_card).clear();
        await this.page.fill(this.input_name_card, name);
        await this.page.locator(this.input_EANC_card).clear();
        await this.page.fill(this.input_EANC_card, ean_case)
        await this.page.locator(this.input_category_card).clear();
        await this.page.fill(this.input_category_card, category)
        await this.page.locator(this.input_technology_card).clear();
        await this.page.fill(this.input_technology_card, technology)
        await this.page.locator(this.input_brand_card).clear();
        await this.page.fill(this.input_brand_card, brand)
        await this.page.locator(this.unit_of_measure_card).click()

        for (const item of await this.page.locator("//li").all()){
            let el = await item.first().getAttribute("aria-selected")
            if (el === "false") {
                await item.click()
                break
            }
        }
        await this.page.locator(this.input_unit_card).clear();
        await this.page.fill(this.input_unit_card, unit)
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // Get Last Product Info from Grid After Update
        await this.page.locator(bp.x_icon).click()
        await this.page.reload()
        const name_after = await this.page.locator(bp.last_item_name).textContent()
        const eanc_after = await this.page.locator(this.last_eanc_in_grid).textContent();
        const eanp_after = await this.page.locator(this.last_eanp_in_grid).textContent();
        const category_after = await this.page.locator(this.last_category_in_grid).textContent();
        const technology_after = await this.page.locator(this.last_technology_in_grid).textContent();
        const brand_after = await this.page.locator(this.last_brand_in_grid).textContent();
        const unit_of_measure_after = await this.page.locator(this.last_unit_of_measure_in_grid).textContent();
        const unit_after = await this.page.locator(this.last_unit_in_grid).textContent();

        // Check Update
        await expect.soft(name_before, "Name is not changed").not.toBe(name_after)
        await expect.soft(eanc_before, "EANC is not changed").not.toBe(eanc_after)
        await expect.soft(eanp_before, "EANP is changed").toBe(eanp_after)
        await expect.soft(category_before, "Category is not changed").not.toBe(category_after)
        await expect.soft(technology_before, "Technology is not changed").not.toBe(technology_after)
        await expect.soft(brand_before, "Brand is not changed").not.toBe(brand_after)
        await expect.soft(unit_of_measure_before, "Unit Of Measure is not changed").not.toBe(unit_of_measure_after)
        await expect.soft(unit_before, "Unit is not changed").not.toBe(unit_after)
    }
}



