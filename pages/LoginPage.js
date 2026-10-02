class LoginPage {
  // constructor выполняется при создании объекта страницы.
  // Здесь описываем все элементы страницы (локаторы).
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Действие: открыть страницу логина
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Действие: залогиниться с любыми логином и паролем
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

// Делаем класс доступным для других файлов
module.exports = { LoginPage };