applyTo: 'e2e/tests/web/ ** / *. spec.ts'

# Web Test File Standards

- Import 'test' and 'expect' from the project fixtures adjust relative path depth to the file location.
- Destructure page object fixtures such as '{ homePage }' or { loginPage }'; do not use raw '{ page }' in web
- After navigation, call 'waitForReady()' before assertions when the page object provides it.
- Use page object methods for navigation and interactions; do not put ad hoc locators or 'page.goto()' calls in the spec.ts
- Test titles start with 'should ... ', and file names use 'feature-name. spec. ts'.
- Use generateRandomEmailId()' for random emails and 'testData' for environment-dependent values.

Reference examples: 'e2e/tests/login.spec.ts'.