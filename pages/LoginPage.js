require('dotenv').config({ path: 'D:\\ProSpace JS Playwright\\.env' });
const dev_url = process.env.DEV_1;
const superadmin_login = process.env.ADMIN_LOGIN;
const superadmin_password = process.env.ADMIN_PASSWORD;


exports.LoginPage = class LoginPage {

    constructor(page) {
        // Locators
        this.page = page;
        this.button_login = "(//button[contains(@aria-label,'ProSpace')])";   // Button ProSpace
        this.input_login_field = "//input[@type='text']";  // Input Login
        this.input_password_field = "//input[@type='password']";   // Input Password
        this.button_signin = "//span[text()='Sign In']";   // Button Sign in

    }

    async authorization() {
        await this.page.goto(dev_url);
        await this.page.locator(this.button_login).click();
        await this.page.fill(this.input_login_field, superadmin_login);
        await this.page.fill(this.input_password_field, superadmin_password);
        await this.page.locator(this.button_signin).click();


    }


}

