applyTo: 'se2erc/pages/ ** /*Page.ts'

# Page Object Standards

- Page objects extend 'BasePage' from 'e2e/pages/BasePage'.
- Keep locators as 'readonly' fields initialized in the constructor.
- Prefer semantic selectors in this order: 'getByRole', 'getByLabel', 'getByText', 'getByTestId', then
locator' only as a last resort.
- Do not use 'page.$()', 'page.$$()', or querySelector()' patterns.
- Implement 'navigate(path?)' with a page-specific default path and 'waitForReady()' using a key visible element.
- Add concise JSDoc for the class, constructor, locators, and public methods; mark multi-match locators.
- File names use 'FeatureNamePage.ts', classes use 'FeatureNamePage', and locator names stay descriptive in camelCase.
-Prefer Playwright MCP page exploration before creating or changing locators. If MCP is unavailable, inspect existing page objects and only infer structure when necessary.

Reference examples: 'e2e/pages/HomePage.ts', 'e2e/pages/BasePage.ts'.