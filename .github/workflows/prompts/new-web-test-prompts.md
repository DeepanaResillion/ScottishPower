description: 'Generate a new Playwright web UI test spec file. Use when creating a new test
file for a web page feature.'
agent: 'agent'
argument-hint: 'Feature name and test scenarios to cover'
---

# Generate a New Web Test Spec

Create a new web UI spec in 'e2e/tests' using the existing project pattern.

1. Read 'e2e/testsLoginTest.spec.ts' the web test instructions before generating code.
2. Get the login credentials from .env files.
3. Use Playwright MCP to verify the flow and locators when it is available; otherwise inspect
the relevant page objects.
4. Build the spec with fixture-based imports, and page object
fixtures instead of raw 'page', 'waitForReady()' after navigation, and 'test. step()' around
actions and assertions.
5. If the required page object does not exist, tell the user to create it first or generate it as part of the task.
