const { test, expect, beforeEach, describe } = require("@playwright/test");

const TEST_USER_DATA = {
  username: "testuser",
  password: "supersecretpassword",
  name: "Test User",
};

const TEST_BLOG_DATA = {
  title: "End-2-end Testing with Playwright is a must have",
  author: "Le Paul Official",
  url: "https://paulserban.eu",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: TEST_USER_DATA,
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const loginHeader = page.getByText("log in to application");
    await expect(loginHeader).toBeVisible();

    const usernameInput = page.locator('input[name="Username"]');
    const passwordInput = page.locator('input[name="Password"]');
    const loginButton = page.getByRole("button", { name: "login" });

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page
        .locator('input[name="Username"]')
        .fill(TEST_USER_DATA.username);
      await page
        .locator('input[name="Password"]')
        .fill(TEST_USER_DATA.password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText(`${TEST_USER_DATA.name} logged in`),
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page
        .locator('input[name="Username"]')
        .fill(TEST_USER_DATA.username);
      await page.locator('input[name="Password"]').fill("wrongpassword");

      await page.getByRole("button", { name: "login" }).click();

      const errorNotification = page.locator(".error");

      await expect(errorNotification).toContainText(
        "wrong username or password",
      );
      await expect(page.getByText("log in to application")).toBeVisible();
      await expect(
        page.getByText(`${TEST_USER_DATA.name} logged in`),
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page
        .locator('input[name="Username"]')
        .fill(TEST_USER_DATA.username);
      await page
        .locator('input[name="Password"]')
        .fill(TEST_USER_DATA.password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText(`${TEST_USER_DATA.name} logged in`),
      ).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      const createFormButton = page.getByRole("button", { name: "new blog" });
      if (await createFormButton.isVisible()) {
        await createFormButton.click();
      }

      await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA.title);
      await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA.author);
      await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA.url);

      await page.getByRole("button", { name: "create" }).click();

      await expect(page.locator(".success")).toContainText(
        "a new blog End-2-end Testing with Playwright is a must have by Le Paul Official added",
      );
      await expect(
        page.getByText(
          "End-2-end Testing with Playwright is a must have Le Paul Official",
        ),
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      const createFormButton = page.getByRole("button", { name: "new blog" });
      if (await createFormButton.isVisible()) {
        await createFormButton.click();
      }

      await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA.title);
      await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA.author);
      await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA.url);
      await page.getByRole("button", { name: "create" }).click();

      const blogElement = page.getByText(
        `${TEST_BLOG_DATA.title} ${TEST_BLOG_DATA.author}`,
      );
      await expect(blogElement).toBeVisible();

      const blogContainer = page
        .locator(".blog")
        .filter({ hasText: TEST_BLOG_DATA.title });
      await blogContainer.getByRole("button", { name: "view" }).click();
      await expect(blogContainer.locator(".blog__details")).toBeVisible();
      await blogContainer.getByRole("button", { name: "like" }).click();
      await expect(blogContainer).toContainText("likes 1");
    });
  });
});
