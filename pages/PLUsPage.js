import {BasePage, getRandomInt} from './BasePage.js';
import {expect} from "@playwright/test";
import {ClientsPage} from "./ClientsPage";


exports.PLUsPage = class PLUsPage {

    constructor(page) {
        this.page = page
        // Creation form
        this.selector_client_card = "(//div[contains(@data-pc-name,'select')])[1]"  // Selector Client
        this.list_client_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of Client
        this.selector_eanpc_card = "(//div[contains(@data-pc-name,'select')])[2]"  // Selector EAN Pc
        this.list_eanpc_card = `//li[@aria-posinset='${[getRandomInt(1, 5)]}']`  // List of EAN Pc
        this.input_plu_card = "(//input[contains(@data-pc-name,'inputtext')])[3]"  // PLU input

        // Grid
        this.last_product_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[3]" // Grid last Product ID
        this.last_eanpc_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[4]"  // Grid last EAN Pc
        this.last_client_id_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[5]"  // Grid last Client ID
        this.last_name_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[6]"  // Grid last Name
        this.last_plu_in_grid = "(//tr[1]/td[@data-pc-section='bodycell']/div)[7]"  // Grid last PLU
        this.any_product_id_in_grid = `(//span[text()='Product ID']/following-sibling::div[contains(@class,'relative inline-block')])[${[getRandomInt(2, 20)]}]`  // Grid any Product ID

    }


    async open_dict() {
        const bp = new BasePage()
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_plus).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("PLUs")
    }

    async create_element(client_dropdown, eanpc_dropdown, plu) {
        // Create New PLU
        const bp = new BasePage();
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()
        const count_of_items_before = await this.page.locator(bp.count_items_in_footer_grid).textContent()
        await this.page.locator(bp.button_create_new).click()
        await this.page.locator(this.selector_client_card).click()
        await this.page.locator(client_dropdown).click()
        await this.page.locator(this.selector_eanpc_card).click()
        await this.page.locator(eanpc_dropdown).click()
        await this.page.fill(this.input_plu_card, plu)

        // Get Info From Card
        // const card_client_name = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        // const card_eanpc = await this.page.locator(this.selector_eanpc_card).getAttribute("model-value-prop");
        // const card_plu = await this.page.locator(this.input_plu_card).inputValue()

        await this.page.locator(bp.button_create_card).click()

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.reload()
        await this.page.locator(bp.count_items_in_footer_grid).waitFor()

        // Get Info From Grid
        // const grid_client_name = await this.page.locator(this.last_name_in_grid).textContent();
        // const grid_eanpc = await this.page.locator(this.last_eanpc_in_grid).textContent();
        // const grid_plu = await this.page.locator(this.last_plu_in_grid).textContent();
        const count_of_items_after = await this.page.locator(bp.count_items_in_footer_grid).textContent()

        // Check Matching of Grid and Card Info
        await bp.create_el_assertion(count_of_items_after, count_of_items_before);
    }

    async read_element(){
        const bp = new BasePage()
        const cp = new ClientsPage()

        // Get Info From Grid
        const grid_id = await this.page.locator(bp.first_item_name).textContent();
        const grid_eanpc = await this.page.locator(this.last_eanpc_in_grid).textContent();
        const grid_client_id = await this.page.locator(this.last_client_id_in_grid).textContent();
        const grid_client_name = await this.page.locator(this.last_name_in_grid).textContent();
        const grid_plu = await this.page.locator(this.last_plu_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click()

        // Get Info From Card
        const card_id = await this.page.locator(bp.item_id).textContent()
        const card_client_name = await this.page.locator(this.selector_client_card).getAttribute("model-value-prop");
        const card_eanpc = await this.page.locator(this.selector_eanpc_card).getAttribute("model-value-prop");
        const card_plu = await this.page.locator(this.input_plu_card).inputValue()

        // Find Chosen Client
        await this.page.locator(bp.side_button_modules).click()
        await this.page.locator(bp.link_clients).click()
        await expect(this.page.locator(bp.head_of_page)).toHaveText("Clients")
        await this.page.fill(bp.input_search_grid, grid_client_id);
        await this.page.keyboard.press("Enter");

        let count_1 = 0;
        while (await this.page.locator(bp.count_items_in_footer_grid).textContent() !== "1") {
            await this.page.waitForTimeout(1000)
            count_1++;
            if (count_1 === 50){
                let res = undefined;
                await expect.soft(res, "Element is not find").not.toBeUndefined()
                await browserContext.close();
            }
        }

        // Get Info About Client From Grid
        const client_name = await this.page.locator(bp.first_item_name).textContent();
        const client_id = await this.page.locator(cp.last_id_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(grid_id, "PLU ID [Grid and Card] is not match").toBe(card_id)
        await expect.soft(grid_eanpc, "EAN Pc [Grid and Card] is not match").toBe(card_eanpc)
        await expect.soft(grid_client_id, "Client ID [Grid and Client Dictionary] is not match").toBe(client_id)
        await expect.soft(grid_client_name, "Client Name [Grid and Card] is not match").toBe(card_client_name)
        await expect.soft(grid_plu, "PLU [Grid and Card] is not match").toBe(card_plu)
        await expect.soft(grid_client_name, "Client Name [Grid and Client Dictionary] is not match").toBe(client_name)
    }

    async update_element(plu){
        // Get Last PLU Info from Grid Before Update
        const bp = new BasePage()
        // const id_before = await this.page.locator(bp.first_item_name).textContent();
        // const eanpc_before = await this.page.locator(this.last_eanpc_in_grid).textContent();
        // const client_id_before = await this.page.locator(this.last_client_id_in_grid).textContent();
        // const client_name_before = await this.page.locator(this.last_name_in_grid).textContent();
        const plu_before = await this.page.locator(this.last_plu_in_grid).textContent();

        await this.page.locator(bp.first_item_name).click();

        // Update Last Client Product Prices
        await this.page.locator(bp.first_item_name).click();
        await this.page.locator(bp.mode_switcher).click();
        await this.page.locator(this.input_plu_card).clear();
        await this.page.fill(this.input_plu_card, plu);
        await this.page.locator(bp.button_save).click();

        // Check Success Toast Message
        await expect.soft(this.page.locator(bp.toast_message_success), "Success message is not appeared").toBeVisible();

        await this.page.locator(bp.x_icon).click();

        // Get Last PLU Info from Grid After Update
        // const id_after = await this.page.locator(bp.first_item_name).textContent();
        // const eanpc_after = await this.page.locator(this.last_eanpc_in_grid).textContent();
        // const client_id_after = await this.page.locator(this.last_client_id_in_grid).textContent();
        // const client_name_after = await this.page.locator(this.last_name_in_grid).textContent();
        const plu_after = await this.page.locator(this.last_plu_in_grid).textContent();

        // Check Matching of Grid and Card Info
        await expect.soft(plu_before, "PLU is not changed").not.toBe(plu_after)

    }


}