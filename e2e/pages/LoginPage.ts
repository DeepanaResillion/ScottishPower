import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    loginButton = this.page.getByText('Login');
    usernameTxt = this.page.locator('#username');
    passwordTxt = this.page.locator('#password');
    loginBtn = this.page.locator('#login');

    async login(username: string, password: string) {

        await this.click(this.loginButton);
        
        await this.usernameTxt.fill(username);

        await this.passwordTxt.fill(password);

        await this.click(this.loginBtn);
    }
}