import {BasePage, getRandomInt} from '../pages/BasePage';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';

// Fake Data
const random_prod_name = faker.food.ethnicCategory() + faker.food.dish()
const random_eanc = faker.string.numeric({length: { min: 7, max: 10}})
const random_eanp = faker.string.numeric({length: { min: 7, max: 10}})
const random_category= faker.food.ethnicCategory()
const random_technology= faker.food.fruit()
const random_brand= faker.company.name()
const random_unit = String(getRandomInt(1, 15))

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
        this.units_of_measure_selector_card = `(//li[contains(@role,'option')])[${[getRandomInt(1, 8)]}]`           // List of Unit of Measure
        this.input_unit_card = "//input[contains(@data-pc-name,'pcinput')]"                            // Unit input

        // Grid
        this.last_prod_name_in_grid = "(//div[contains(@class,'border-b-purple-400')])[1]"               // Grid last Item
        this.last_eanc_in_grid = "(//span[text()='EAN Case']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                    // Grid last EAN Case
        this.last_eanp_in_grid = "(//span[text()='EAN Pc']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                    // Grid last EAN Pc
        this.last_category_in_grid = "(//span[text()='Category']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                // Grid last Category
        this.last_technology_in_grid = "(//span[text()='Technology']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                              // Grid last Technology
        this.last_brand_in_grid = "(//span[text()='Brand']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                   // Grid last Brand
        this.last_unit_in_grid = "(//span[text()='Unit']/following-sibling::div[contains(@class,'relative inline-block')])[1]"                                    // Grid last Unit
        this.last_unit_of_measure_in_grid = "(//span[text()='Unit Of Measure']/following-sibling::div[contains(@class,'relative inline-block')])[1]"      // Grid last Unit of Measure
        this.any_category_in_grid = `(//span[text()='Category']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(1, 10)]}]`     //Grid any Category
        this.any_brand_in_grid = `(//span[text()='Brand']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(1, 10)]}]`           // Grid any Brand
        this.any_unit_of_measure_in_grid = `(//span[text()='Unit Of Measure']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(1, 10)]}]`  // Grid any Unit of Measure
        this.any_unit_in_grid = `(//span[text()='Unit']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(1, 10)]}]`             // Grid any Unit
        this.any_technology_in_grid = `(//span[text()='Technology']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(1, 10)]}]`     // Grid any Technology

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
    }

    async open_products_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_products).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Products")
    }

    async create_product(){
        // Creating Product
        const bp = new BasePage();
        await this.page.locator(bp.button_create_new_card).click();
        await this.page.fill(this.input_name_card, random_prod_name);
        await this.page.fill(this.input_EANC_card, random_eanc);
        await this.page.fill(this.input_EANP_card, random_eanp);
        await this.page.fill(this.input_category_card, random_category);
        await this.page.fill(this.input_technology_card, random_technology);
        await this.page.fill(this.input_brand_card, random_brand);
        await this.page.locator(this.unit_of_measure_card).click();
        await this.page.locator(this.units_of_measure_selector_card).click();
        await this.page.fill(this.input_unit_card, random_unit);
        await this.page.locator(bp.button_create_card).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // Get Info From Card
        await this.page.locator(bp.last_item_name).click();
        const card_name = await this.page.locator(this.input_name_card).inputValue();
        const card_eanc = await this.page.locator(this.input_EANC_card).inputValue();
        const card_eanp = await this.page.locator(this.input_EANP_card).inputValue();
        const card_category = await this.page.locator(this.input_category_card).inputValue();
        const card_technology = await this.page.locator(this.input_technology_card).inputValue();
        const card_brand = await this.page.locator(this.input_brand_card).inputValue();
        const card_unit_of_measure = await this.page.locator(this.unit_of_measure_card).getAttribute("model-value-prop");
        const card_unit = await this.page.locator(this.input_unit_card).inputValue();
        console.log(card_name);
        console.log(card_eanc);
        console.log(card_eanp);
        console.log(card_category);
        console.log(card_technology);
        console.log(card_brand);
        console.log(card_unit_of_measure);
        console.log(card_unit);
        // await this.page.waitForTimeout(10000);

    }
}