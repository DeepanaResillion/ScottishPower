description: 'Generate a new Page Object Model class. Use when creating a page object for a new web page.'
agent: 'agent'
argument-hint: 'Page name, URL path, and key elements on the page'

# Generate a New Page Object

Create a new page object in 'e2e/pages/' using the existing project pattern.

1. Read 'e2e/pages/LoginPage.ts', 'e2e/pages/BasePage.ts', and the page-object instructions before generating code.
2. Prefer Playwright MCP page exploration to confirm real locators and user flows when it is available.
3. Generate a 'FeatureNamePage' class with constructor-based 'readonly' locators, a page-specific 'navigate
(path?)', 'waitForReady()', concise JSDoc, and 'test.step()' in public interaction methods.
4. After generating the page object, wire it into 'e2e/fixtures/pages.fixture.ts'