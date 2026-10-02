
class InventoryPage {

    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.removeFromCartButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
    }

    async addBackpackToCart() {
        await this.addToCartButton.click();
    }

    async logout(){
        await this.menuButton.click();
        await this.logoutButton.click();}
}

module.exports = { InventoryPage };