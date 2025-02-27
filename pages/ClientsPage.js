import {BasePage, getRandomInt} from '../pages/BasePage';
import {expect} from "@playwright/test";
import { faker } from '@faker-js/faker';


exports.ClientsPage = class ClientsPage {
    constructor(page) {
        this.page = page;
        // Creation form
        this.input_name_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // Name input
        this.input_external_id_card = "(//input[contains(@data-pc-name,'inputtext')])[4]"  // External ID input
        this.input_parent_card = "(//input[contains(@data-pc-name,'inputtext')])[5]"  // Parent input
        this.input_type_card = "(//input[contains(@data-pc-name,'inputtext')])[6]"   // Type input
        this.selector_invoice_type_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Invoice Type input
        this.selector_affiliation_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Affiliation input
        this.input_dispatch_start_before_day = "(//input[contains(@data-pc-name,'pcinput')])[1]"  // Dispatch Start Before Day input
        this.input_dispatch_end_before_day = "(//input[contains(@data-pc-name,'pcinput')])[2]"  // Dispatch End Before Day input
        this.list_of_invoice_types_card = `//li[@aria-posinset='${[getRandomInt(1, 2)]}']`  // Invoice Types input
        this.on_invoice_type_selector = "//li[@aria-posinset='1']"  // Invoice Types - On invoice
        this.off_invoice_type_selector = "//li[@aria-posinset='2']"  // Invoice Types - Off invoice
        this.list_of_affiliations_card = `//li[@aria-posinset='${[getRandomInt(1, 2)]}']`  // Affiliations list
        this.international_affiliation_selector = "//li[@aria-posinset='1']"  // Affiliation Type - International
        this.local_affiliation_selector = "//li[@aria-posinset='2']"  // Affiliation Type - Local

        // Grid
        this.last_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[2]"  // Grid last ID
        this.last_external_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[4]"  // Grid last External ID
        this.last_parent_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[5]"  // Grid last Parent
        this.last_type_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[6]"  // Grid last Type
        this.last_affiliation_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[7]"  // Grid last Affiliation
        this.last_invoice_type_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[8]"  // Grid last Invoice Type
        this.any_id_in_grid = `(//span[text()='ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any ID
        this.any_external_id_in_grid = `(//span[text()='External ID']/following-sibling::div[contains(@class,'relative inline-block')[${[getRandomInt(2, 10)]}]`  // Grid any External ID
        this.any_parent_in_grid = `(//span[text()='Parent']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any Parent
        this.any_type_in_grid = `(//span[text()='Type']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  //Grid any Type
        this.any_affiliation_in_grid = `(//span[text()='Affiliation']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any Affiliation
        this.any_invoice_type_in_grid = `(//span[text()='Invoice Type']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 10)]}]`  // Grid any Invoice Type

        // Created form
        this.x_icon_upload_file = "(//div/div/button[@type='icon-secondary'])[6]"  // X icon in the Upload File window
        // this.value_of_invoice_type_card = "(//span[contains(@class,'p-dropdown-label')]/span)[1]"   // Значение поля Invoice Type
        // this.value_of_affiliation_card = "(//span[contains(@class,'p-dropdown-label')]/span)[2]"   // Значение поля Affiliation

        // All Filters
        // this.input_name_filters = "(//input[contains(@data-pc-name,'inputtext')])[2]"  # Поле Name
        // this.input_type_filters = "(//input[contains(@data-pc-name,'inputtext')])[3]"  # Поле Type
        // this.selector_invoice_type_filters = "(//span[contains(@class,'p-dropdown-label')])[1]"  # Селектор Invoice Type
        // this.selector_affiliation_filters = "(//span[contains(@class,'p-dropdown-label')])[2]"  # Селектор Affiliation
        // this.list_of_invoice_types_filters = f"//li[@aria-posinset='{random.randint(1, 2)}']"  # Список Invoice Types
        // this.list_of_affiliations_filters = f"//li[@aria-posinset='{random.randint(1, 2)}']"  # Список Affiliations
        // this.input_dispatch_start_before_day_from_filters = "(//input[@data-pc-name='pcinput'])[1]"  # Поле Dispatch Start Before Day(From)
        // this.input_dispatch_start_before_day_to_filters = "(//input[@data-pc-name='pcinput'])[2]"  # Поле Dispatch Start Before Day(To)
        // this.input_dispatch_end_before_day_from_filters = "(//input[@data-pc-name='pcinput'])[3]"  # Поле Dispatch End Before Day(From)
        // this.input_dispatch_end_before_day_to_filters = "(//input[@data-pc-name='pcinput'])[4]"  # Поле Dispatch End Before Day(To)
    }

    async open_dict(){
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_clients).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Clients")
    }

    async create_element(name, external_id, parent, type, dispatch_start, dispatch_end){
        // Create New Client
        const bp = new BasePage()
        let count_of_items_before
        if (await this.page.locator(bp.count_items_in_footer_grid).isVisible()){
            count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
            await this.page.locator(bp.button_create_new).click()
        }
        if (await this.page.locator(bp.nothing_to_show_icon).isVisible()){
            await this.page.locator(bp.button_create_new).click()
            count_of_items_before = "0"
        }
        await this.page.fill(this.input_name_card, name)
        await this.page.fill(this.input_external_id_card, external_id)
        await this.page.fill(this.input_parent_card, parent)
        await this.page.fill(this.input_type_card, type)
        await this.page.locator(this.selector_invoice_type_card).click()
        await this.page.locator(this.list_of_invoice_types_card).click()
        await this.page.locator(this.selector_affiliation_card).click()
        await this.page.locator(this.list_of_affiliations_card).click()
        await this.page.fill(this.input_dispatch_start_before_day, dispatch_start)
        await this.page.fill(this.input_dispatch_end_before_day, dispatch_end)
        await this.page.locator(bp.button_upload_file).setInputFiles('./uploadFiles/магнит.jpg')
        await this.page.locator(bp.button_create_card).click()


        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // // Get Info From Card
        // await this.page.locator(bp.first_item_name).click();
        // const card_id = await this.page.locator(bp.item_id).textContent()
        // const card_name = await this.page.locator(this.input_name_card).inputValue();
        // const card_external_id = await this.page.locator(this.input_external_id_card).inputValue();
        // const card_parent = await this.page.locator(this.input_parent_card).inputValue();
        // const card_type = await this.page.locator(this.input_type_card).inputValue();
        // // TODO: Inconsistent Data
        // // const card_invoice_type = await this.page.locator(this.selector_invoice_type_card).getAttribute("model-value-prop");
        // const card_affiliation = await this.page.locator(this.selector_affiliation_card).getAttribute("model-value-prop");
        // const card_dispatch_start_day = await this.page.locator(this.input_dispatch_start_before_day).inputValue();
        // const card_dispatch_end_day = await this.page.locator(this.input_dispatch_end_before_day).inputValue()
        // const card_file_name = await this.page.locator(bp.name_of_added_file).textContent()
        // await this.page.locator(bp.x_icon).click();


        // Get Info From Grid
        // const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        // const grid_name = await this.page.locator(bp.first_item_name).textContent();
        // const grid_external_id = await this.page.locator(this.last_external_id_in_grid).textContent();
        // const grid_parent = await this.page.locator(this.last_parent_in_grid).textContent();
        // const grid_type = await this.page.locator(this.last_type_in_grid).textContent();
        // const grid_affiliation = await this.page.locator(this.last_affiliation_in_grid).textContent();
        // // TODO: Inconsistent Data
        // // const grid_invoice_type = await this.page.locator(this.last_invoice_type_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()


        // Check Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        // Find Any Client
        const bp = new BasePage()

        // Get Info From Grid
        const grid_id = await this.page.locator(this.last_id_in_grid).textContent();
        const grid_name = await this.page.locator(bp.first_item_name).textContent();
        const grid_external_id = await this.page.locator(this.last_external_id_in_grid).textContent();
        const grid_parent = await this.page.locator(this.last_parent_in_grid).textContent();
        const grid_type = await this.page.locator(this.last_type_in_grid).textContent();
        const grid_affiliation = await this.page.locator(this.last_affiliation_in_grid).textContent();
        // TODO: Inconsistent Data
        // const grid_invoice_type = await this.page.locator(this.last_invoice_type_in_grid).textContent();


        // Get Info From Card
        await this.page.locator(bp.first_item_name).click();
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_name = await this.page.locator(this.input_name_card).inputValue();
        const card_external_id = await this.page.locator(this.input_external_id_card).inputValue();
        const card_parent = await this.page.locator(this.input_parent_card).inputValue();
        const card_type = await this.page.locator(this.input_type_card).inputValue();
        // TODO: Inconsistent Data
        // const card_invoice_type = await this.page.locator(this.selector_invoice_type_card).getAttribute("model-value-prop");
        const card_affiliation = await this.page.locator(this.selector_affiliation_card).getAttribute("model-value-prop");


        // Check the Matching of Grid and Card Info
        await expect.soft(card_id, "ID is not match").toEqual(grid_id)
        await expect.soft(card_name, "Name is not match").toEqual(grid_name)
        await expect.soft(card_external_id, "External ID is not match").toEqual(grid_external_id)
        await expect.soft(card_parent, "Parent is not match").toEqual(grid_parent)
        await expect.soft(card_type, "Type is not match").toEqual(grid_type)
        await expect.soft(card_affiliation, "Affiliation is not match").toEqual(grid_affiliation)
        // TODO: Inconsistent Data
        // await expect.soft(card_invoice_type, "Invoice Type is not match").toEqual(grid_invoice_type)

    }

    async update_element(name, parent, type, dispatch_start, dispatch_end){
        // Get Last Client Info from Grid Before Update
        const bp = new BasePage()
        // const id_before = await this.page.locator(this.last_id_in_grid).textContent();
        const name_before = await this.page.locator(bp.first_item_name).textContent();
        // const external_id_before = await this.page.locator(this.last_external_id_in_grid).textContent();
        // const parent_before = await this.page.locator(this.last_parent_in_grid).textContent();
        // const type_before = await this.page.locator(this.last_type_in_grid).textContent();
        // const affiliation_before = await this.page.locator(this.last_affiliation_in_grid).textContent();
        // const invoice_type_before = await this.page.locator(this.last_invoice_type_in_grid).textContent();

        // Update Last Client
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_name_card).clear();
        await this.page.fill(this.input_name_card, name);
        await this.page.locator(this.input_parent_card).clear();
        await this.page.fill(this.input_parent_card, parent);
        await this.page.locator(this.input_type_card).clear();
        await this.page.fill(this.input_type_card, type);

        if (await this.page.locator(this.selector_invoice_type_card).getAttribute("model-value-prop") === "On Invoice") {
            await this.page.locator(this.selector_invoice_type_card).click();
            await this.page.locator(this.off_invoice_type_selector).click();
        }
        else {
            await this.page.locator(this.selector_invoice_type_card).click();
            await this.page.locator(this.on_invoice_type_selector).click();
        }

        if (await this.page.locator(this.selector_affiliation_card).getAttribute("model-value-prop") === "Local") {
            await this.page.locator(this.selector_affiliation_card).click();
            await this.page.locator(this.international_affiliation_selector).click();
        }
        else {
            await this.page.locator(this.selector_affiliation_card).click();
            await this.page.locator(this.local_affiliation_selector).click();
        }
        await this.page.locator(this.input_dispatch_start_before_day).clear();
        await this.page.fill(this.input_dispatch_start_before_day, dispatch_start);
        await this.page.locator(this.input_dispatch_end_before_day).clear();
        await this.page.fill(this.input_dispatch_end_before_day, dispatch_end);
        await this.page.locator(bp.button_save).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        // Get Last Client Info from Grid After Update
        await this.page.locator(bp.x_icon).click()
        await this.page.reload()
        // const id_after = await this.page.locator(this.last_id_in_grid).textContent();
        const name_after = await this.page.locator(bp.first_item_name).textContent();
        // const external_id_after = await this.page.locator(this.last_external_id_in_grid).textContent();
        // const parent_after = await this.page.locator(this.last_parent_in_grid).textContent();
        // const type_after = await this.page.locator(this.last_type_in_grid).textContent();
        // const affiliation_after = await this.page.locator(this.last_affiliation_in_grid).textContent();
        // const invoice_type_after = await this.page.locator(this.last_invoice_type_in_grid).textContent();

        // Check Update
        await expect.soft(name_before, "Name is not changed").not.toBe(name_after)
    }


    async update_element_logo(){
        // Upload first file
        const bp = new BasePage()
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();

        if (await this.page.locator(this.x_icon_upload_file).isVisible() === true) {
            await this.page.locator(this.x_icon_upload_file).click();
            await this.page.locator(bp.button_upload_file).setInputFiles('./uploadFiles/магнит.jpg')
        }
        else {
            await this.page.locator(bp.button_upload_file).setInputFiles('./uploadFiles/магнит.jpg')
        }
        const file_name_before = await this.page.locator(bp.name_of_added_file).first().textContent()
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();
        await this.page.reload()

        // Check visibility of the first file
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await expect.soft(file_name_before, "File Name is not match").toEqual("магнит.jpg")

        // Upload second file
        await this.page.locator(this.x_icon_upload_file).click();
        await this.page.locator(bp.button_upload_file).setInputFiles('./uploadFiles/unnamed.png')
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();
        await this.page.reload()
        await this.page.locator(bp.first_item_name).click();

        // Check visibility of the second file
        const file_name_after = await this.page.locator(bp.name_of_added_file).textContent()
        await expect.soft(file_name_after, "File Name is not match").toEqual("unnamed.png")

    }

}
