# Playwright Autotests for Sauce Demo

![Playwright Tests](https://github.com/Aimeerimaimi/my-autotests/actions/workflows/playwright.yml/badge.svg)

End-to-end UI tests for the demo online store [saucedemo.com](https://www.saucedemo.com/), written with Playwright and JavaScript.

## Tech stack

- Playwright Test
- JavaScript (Node.js)
- Page Object Model
- CI: GitHub Actions and GitLab CI

## Test coverage

**Login**
- Successful login with valid credentials
- Locked out user cannot log in
- Login with wrong password shows an error

**Inventory**
- Add product to cart (cart badge shows 1, button changes to Remove)
- Logout returns user to the login page

## Project structure

```
pages/            Page Objects (LoginPage, InventoryPage)
tests/            Test files
.github/workflows GitHub Actions pipeline
.gitlab-ci.yml    GitLab CI pipeline
```

## How to run

```bash
npm install
npx playwright install
npx playwright test
```

Run in one browser with a visible window:

```bash
npx playwright test --project=chromium --headed
```

Open the HTML report:

```bash
npx playwright show-report
```