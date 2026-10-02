
// Подключаем test (чтобы писать тесты) и expect (чтобы делать проверки)
const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {InventoryPage} = require('../pages/InventoryPage');


test.describe('Логин', () => {

    let loginPage;
    let inventoryPage;
    // Arrange: открываем страницу логина
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
    })

    test('Успешный вход в магазин', async ({ page }) => {


        // Act: вводим логин и пароль и нажимаем кнопку
        await loginPage.login('standard_user', 'secret_sauce');

        // Assert: проверяем, что попали на страницу товаров
        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.pageTitle).toHaveText('Товары');
       
    });


    test('Заблокированный пользователь не может войти', async ({ page }) => {


        await loginPage.login('locked_out_user', 'secret_sauce');

        // Проверяем, что появилась ошибка
        await expect(loginPage.errorMessage).toContainText('locked out');
    });

    test("Вход в магазин с неправильным паролем", async ({ page }) => {



        await loginPage.login('standard_user' , 'wrong_password');

        await expect(loginPage.errorMessage).toContainText('do not match');
        await expect(page).not.toHaveURL(/inventory/);

    })

})



test.describe('Магазин', () => {

    let loginPage;
    let inventoryPage;





    // Arrange: логинимся 
    test.beforeEach(async ({ page }) => {

        inventoryPage = new InventoryPage(page);
        loginPage = new LoginPage(page);


        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');
       
    })



    test('Добавление товара в корзину', async ({ page }) => {

       

        // Act: добавляем первый элемент в корзинку 
   
        await inventoryPage.addBackpackToCart();



        // Assert: проверяем, что на корзинке загоралось 1
        
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

        // Assert: проверяем, что кнопка Add to cart поменялась на кнопку Remove
        await expect(inventoryPage.removeFromCartButton).toBeVisible();

    });

    test('Checking the Logout function', async ({ page }) => {


        await inventoryPage.logout();


        // Assert: проверяем, что мы вышли из акк и на странице Логина
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();
        

    });


});