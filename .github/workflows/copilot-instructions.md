# SP Digital Test Automation - Copilot Instructions

Playwright + TypeScript test automation framework.

- Web specs live in 'e2e/tests", page objects in 'e2e/pages/", fixtures in 'e2e/fixtures/, API clients in 'e2e/api/", shared utilities in 'e2e/utils/'.
- In spec files, import 'test' and 'expect' from the project fixtures, never from @playwright/test' directly.
- Wrap every user action and assertion in 'test.step()' with a clear human-readable step name.
- Web tests use page object fixtures, not raw '{ page }'.
- Do not hardcode URLs, credentials, tokens, or environment data; use 'testData', environment variables, or page object navigation methods.
- Page objects extend 'BasePage', prefer semantic locators, and implement 'waitForReady()'.
- API tests follow 'BaseApiClient' patterns and register custom matchers from 'e2e/utils/
assertions'.
- Prefer existing project examples over inventing new structure.
- Before creating or modifying page objects or web specs, always call 'tool_search' with the query "playwright MCP browser navigate snapshot screenshot" to load the Playwright MCP browser
tools, then use them to verify real locators on the live staging site ('https://wwwd.scottishpower.co.uk') before writing any selector.