const { test, expect, beforeEach, describe } = require("@playwright/test");

const TEST_USER_DATA = [
  {
    username: "testuser",
    password: "supersecretpassword",
    name: "Test User",
  },
  {
    username: "secondary_user",
    password: "anothersecretpassword",
    name: "Jane Doe",
  },
];

const TEST_BLOG_DATA = [
  {
    title: "A blog",
    author: "Blog Writter",
    url: "https://blog.dev",
  },
  {
    title: "Second blog",
    author: "Blog Writter",
    url: "https://blog.dev",
  },
  {
    title: "Three blog",
    author: "Blog Writter",
    url: "https://blog.dev",
  },
  {
    title: "Four blog",
    author: "Blog Writter",
    url: "https://blog.dev",
  },
  {
    title: "Five blog",
    author: "Blog Writter",
    url: "https://blog.dev",
  },
];

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: TEST_USER_DATA[0],
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

  test("blogs are sorted descending by number of likes", async ({
    page,
    request,
  }) => {
    await page
      .locator('input[name="Username"]')
      .fill(TEST_USER_DATA[0].username);
    await page
      .locator('input[name="Password"]')
      .fill(TEST_USER_DATA[0].password);
    await page.getByRole("button", { name: "login" }).click();
    await expect(
      page.getByText(`${TEST_USER_DATA[0].name} logged in`),
    ).toBeVisible();

    const createFormButton = page.getByRole("button", { name: "new blog" });

    if (await createFormButton.isVisible()) {
      await createFormButton.click();
    }
    await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA[0].title);
    await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA[0].author);
    await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA[0].url);
    await page.getByRole("button", { name: "create" }).click();

    await expect(
      page.getByText(`${TEST_BLOG_DATA[0].title} ${TEST_BLOG_DATA[0].author}`),
    ).toBeVisible();

    if (await createFormButton.isVisible()) {
      await createFormButton.click();
    }
    await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA[1].title);
    await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA[1].author);
    await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA[1].url);
    await page.getByRole("button", { name: "create" }).click();

    await expect(
      page.getByText(`${TEST_BLOG_DATA[1].title} ${TEST_BLOG_DATA[1].author}`),
    ).toBeVisible();

    if (await createFormButton.isVisible()) {
      await createFormButton.click();
    }
    await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA[2].title);
    await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA[2].author);
    await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA[2].url);
    await page.getByRole("button", { name: "create" }).click();

    await expect(
      page.getByText(`${TEST_BLOG_DATA[2].title} ${TEST_BLOG_DATA[2].author}`),
    ).toBeVisible();

    const blogA = page
      .locator(".blog")
      .filter({ hasText: TEST_BLOG_DATA[0].title });
    await blogA.getByRole("button", { name: "view" }).click();
    await blogA.getByRole("button", { name: "like" }).click();
    await expect(blogA).toContainText("likes 1");

    const blogC = page
      .locator(".blog")
      .filter({ hasText: TEST_BLOG_DATA[1].title });
    await blogC.getByRole("button", { name: "view" }).click();
    await blogC.getByRole("button", { name: "like" }).click();
    await expect(blogC).toContainText("likes 1");
    await blogC.getByRole("button", { name: "like" }).click();
    await expect(blogC).toContainText("likes 2");
    await blogC.getByRole("button", { name: "like" }).click();
    await expect(blogC).toContainText("likes 3");
    await blogC.getByRole("button", { name: "like" }).click();
    await expect(blogC).toContainText("likes 3");

    const blogB = page
      .locator(".blog")
      .filter({ hasText: TEST_BLOG_DATA[2].title });
    await blogB.getByRole("button", { name: "view" }).click();
    await blogB.getByRole("button", { name: "like" }).click();
    await expect(blogB).toContainText("likes 1");
    await blogB.getByRole("button", { name: "like" }).click();
    await expect(blogB).toContainText("likes 2");
    await blogB.getByRole("button", { name: "like" }).click();
    await expect(blogB).toContainText("likes 3");
    await blogB.getByRole("button", { name: "like" }).click();
    await expect(blogB).toContainText("likes 4");
    await blogB.getByRole("button", { name: "like" }).click();
    await expect(blogB).toContainText("likes 5");
    await blogB.getByRole("button", { name: "like" }).click();
    await expect(blogB).toContainText("likes 6");

    const blogElements = page.locator(".blog");

    await expect(blogElements.nth(0)).toContainText(TEST_BLOG_DATA[2].title);
    await expect(blogElements.nth(1)).toContainText(TEST_BLOG_DATA[1].title);
    await expect(blogElements.nth(2)).toContainText(TEST_BLOG_DATA[0].title);
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page
        .locator('input[name="Username"]')
        .fill(TEST_USER_DATA[0].username);
      await page
        .locator('input[name="Password"]')
        .fill(TEST_USER_DATA[0].password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText(`${TEST_USER_DATA[0].name} logged in`),
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page
        .locator('input[name="Username"]')
        .fill(TEST_USER_DATA[0].username);
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
        .fill(TEST_USER_DATA[0].username);
      await page
        .locator('input[name="Password"]')
        .fill(TEST_USER_DATA[0].password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText(`${TEST_USER_DATA[0].name} logged in`),
      ).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      const createFormButton = page.getByRole("button", { name: "new blog" });
      if (await createFormButton.isVisible()) {
        await createFormButton.click();
      }

      await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA[0].title);
      await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA[0].author);
      await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA[0].url);

      await page.getByRole("button", { name: "create" }).click();

      await expect(page.locator(".success")).toContainText(
        `a new blog ${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author} added`,
      );
      await expect(
        page.getByText(
          `${TEST_BLOG_DATA[0].title} ${TEST_BLOG_DATA[0].author}`,
        ),
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      const createFormButton = page.getByRole("button", { name: "new blog" });
      if (await createFormButton.isVisible()) {
        await createFormButton.click();
      }

      await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA[0].title);
      await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA[0].author);
      await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA[0].url);
      await page.getByRole("button", { name: "create" }).click();

      const blogElement = page.getByText(
        `${TEST_BLOG_DATA[0].title} ${TEST_BLOG_DATA[0].author}`,
      );
      await expect(blogElement).toBeVisible();

      const blogContainer = page
        .locator(".blog")
        .filter({ hasText: TEST_BLOG_DATA[0].title });
      await blogContainer.getByRole("button", { name: "view" }).click();
      await expect(blogContainer.locator(".blog__details")).toBeVisible();
      await blogContainer.getByRole("button", { name: "like" }).click();
      await expect(blogContainer).toContainText("likes 1");
    });

    test("a blog can be deleted by the user who created it", async ({
      page,
    }) => {
      const createFormButton = page.getByRole("button", { name: "new blog" });
      if (await createFormButton.isVisible()) {
        await createFormButton.click();
      }

      await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA[0].title);
      await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA[0].author);
      await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA[0].url);
      await page.getByRole("button", { name: "create" }).click();

      const blogContainer = page
        .locator(".blog")
        .filter({ hasText: TEST_BLOG_DATA[0].title });

      await blogContainer.getByRole("button", { name: "view" }).click();

      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
          `Remove blog "${TEST_BLOG_DATA[0].title}" by ${TEST_BLOG_DATA[0].author}`,
        );
        await dialog.accept();
      });

      await blogContainer.getByRole("button", { name: "remove" }).click();

      await expect(blogContainer).not.toBeVisible();
      await expect(
        page.getByText(
          `${TEST_BLOG_DATA[0].title} ${TEST_BLOG_DATA[0].author}`,
        ),
      ).not.toBeVisible();
    });
  });

  describe("Blog visibility permissions", () => {
    beforeEach(async ({ request }) => {
      await request.post("http://localhost:3001/api/users", {
        data: TEST_USER_DATA[1],
      });
    });

    test("only the user who created the blog sees its delete button", async ({
      page,
    }) => {
      await page
        .locator('input[name="Username"]')
        .fill(TEST_USER_DATA[0].username);
      await page
        .locator('input[name="Password"]')
        .fill(TEST_USER_DATA[0].password);

      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText(`${TEST_USER_DATA[0].name} logged in`),
      ).toBeVisible();

      const createFormButton = page.getByRole("button", { name: "new blog" });
      if (await createFormButton.isVisible()) {
        await createFormButton.click();
      }
      await page.locator('input[name="Title"]').fill(TEST_BLOG_DATA[0].title);
      await page.locator('input[name="Author"]').fill(TEST_BLOG_DATA[0].author);
      await page.locator('input[name="Url"]').fill(TEST_BLOG_DATA[0].url);
      await page.getByRole("button", { name: "create" }).click();

      let blogContainer = page
        .locator(".blog")
        .filter({ hasText: TEST_BLOG_DATA[0].title });
      await blogContainer.getByRole("button", { name: "view" }).click();
      await expect(
        blogContainer.getByRole("button", { name: "remove" }),
      ).toBeVisible();

      await page.getByRole("button", { name: "logout" }).click();

      await page
        .locator('input[name="Username"]')
        .fill(TEST_USER_DATA[1].username);
      await page
        .locator('input[name="Password"]')
        .fill(TEST_USER_DATA[1].password);
      await page.getByRole("button", { name: "login" }).click();
      await expect(
        page.getByText(`${TEST_USER_DATA[1].name} logged in`),
      ).toBeVisible();

      blogContainer = page
        .locator(".blog")
        .filter({ hasText: TEST_BLOG_DATA[0].title });
      await blogContainer.getByRole("button", { name: "view" }).click();

      await expect(
        blogContainer.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });
  });
});
