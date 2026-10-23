applyTo: 'e2e/fixtures/ *. fixture.ts'

# Fixture Standards

- Keep one concern per fixture file, such as pages, auth, test data, or reporting.
- Export a typed fixture interface and extend 'base.extend<T>()' from @playwright/test'.
- Use descriptive camelCase fixture names such as 'loginPage', 'authClient', and 'testData'.
- Register new fixture types in 'e2e/fixtures/index.ts'.
- Page fixtures should instantiate page objects and hand them to 'use()' without extra test logic.
- Auto-fixtures use a leading '_' and should be marked with '{ auto: true }' when they must run for every test.

Reference examples: 'e2e/fixtures/pages.fixture.ts'.