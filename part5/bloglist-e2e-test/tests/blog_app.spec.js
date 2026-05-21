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
  }
];

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: TEST_USER_DATA[0],
    });

    await page.goto("http://localhost:5173");
  });

  test("login view can be accessed and form is visible", async ({ page }) => {
    await page.getByRole("link", { name: "login" }).click();
    await expect(page).toHaveURL(/.*login/);

    const loginHeader = page.getByText("log in to application");
    await expect(loginHeader).toBeVisible();

    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.getByRole("button", { name: "login" });

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  describe("Login validation paths", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();

      await page
        .locator('input[name="username"]')
        .fill(TEST_USER_DATA[0].username);
      await page
        .locator('input[name="password"]')
        .fill(TEST_USER_DATA[0].password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText(`${TEST_USER_DATA[0].name} logged in`),
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();

      await page
        .locator('input[name="username"]')
        .fill(TEST_USER_DATA[0].username);
      await page.locator('input[name="password"]').fill("wrongpassword");
      await page.getByRole("button", { name: "login" }).click();

      const errorNotification = page.locator(".error");
      await expect(errorNotification).toContainText(
        "wrong username or password",
      );

      await expect(page.getByText("Log in to application")).toBeVisible();
      await expect(
        page.getByText(`${TEST_USER_DATA[0].name} logged in`),
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();
      await page
        .locator('input[name="username"]')
        .fill(TEST_USER_DATA[0].username);
      await page
        .locator('input[name="password"]')
        .fill(TEST_USER_DATA[0].password);
      await page.getByRole("button", { name: "login" }).click();
      await expect(
        page.getByText(`${TEST_USER_DATA[0].name} logged in`),
      ).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("link", { name: "create new" }).click();

      await page.locator('input[name="title"]').fill(TEST_BLOG_DATA[0].title);
      await page.locator('input[name="author"]').fill(TEST_BLOG_DATA[0].author);
      await page.locator('input[name="url"]').fill(TEST_BLOG_DATA[0].url);

      await page.getByRole("button", { name: "create" }).click();

      await expect(page).toHaveURL("http://localhost:5173/");
      await expect(page.locator(".success")).toContainText(
        `a new blog "${TEST_BLOG_DATA[0].title}" by ${TEST_BLOG_DATA[0].author} added`,
      );

      await expect(
        page.getByRole("link", {
          name: `${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author}`,
        }),
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("link", { name: "create new" }).click();
      await page.locator('input[name="title"]').fill(TEST_BLOG_DATA[0].title);
      await page.locator('input[name="author"]').fill(TEST_BLOG_DATA[0].author);
      await page.locator('input[name="url"]').fill(TEST_BLOG_DATA[0].url);
      await page.getByRole("button", { name: "create" }).click();

      await page
        .getByRole("link", {
          name: `${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author}`,
        })
        .click();

      const detailsContainer = page.locator(".blog__details");
      await expect(detailsContainer).toBeVisible();
      await expect(detailsContainer).toContainText("likes: 0");

      await page.getByRole("button", { name: "like" }).click();
      await expect(detailsContainer).toContainText("likes: 1");
    });

    test("a blog can be deleted by the user who created it", async ({
      page,
    }) => {
      await page.getByRole("link", { name: "create new" }).click();
      await page.locator('input[name="title"]').fill(TEST_BLOG_DATA[0].title);
      await page.locator('input[name="author"]').fill(TEST_BLOG_DATA[0].author);
      await page.locator('input[name="url"]').fill(TEST_BLOG_DATA[0].url);
      await page.getByRole("button", { name: "create" }).click();

      await page
        .getByRole("link", {
          name: `${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author}`,
        })
        .click();

      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
          `Remove blog "${TEST_BLOG_DATA[0].title}" by ${TEST_BLOG_DATA[0].author}?`,
        );
        await dialog.accept();
      });

      await page.getByRole("button", { name: "remove" }).click();

      await expect(page).toHaveURL("http://localhost:5173/");
      await expect(
        page.getByRole("link", {
          name: `${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author}`,
        }),
      ).not.toBeVisible();
    });
  });

  describe("Blog visibility permissions and cross-account restriction profiles", () => {
    beforeEach(async ({ request }) => {
      await request.post("http://localhost:3001/api/users", {
        data: TEST_USER_DATA[1],
      });
    });

    test("only the user who created the blog sees its delete button", async ({
      page,
    }) => {
      await page.getByRole("link", { name: "login" }).click();
      await page
        .locator('input[name="username"]')
        .fill(TEST_USER_DATA[0].username);
      await page
        .locator('input[name="password"]')
        .fill(TEST_USER_DATA[0].password);
      await page.getByRole("button", { name: "login" }).click();

      await page.getByRole("link", { name: "create new" }).click();
      await page.locator('input[name="title"]').fill(TEST_BLOG_DATA[0].title);
      await page.locator('input[name="author"]').fill(TEST_BLOG_DATA[0].author);
      await page.locator('input[name="url"]').fill(TEST_BLOG_DATA[0].url);
      await page.getByRole("button", { name: "create" }).click();

      await page
        .getByRole("link", {
          name: `${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author}`,
        })
        .click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await page.getByRole("button", { name: "logout" }).click();
      await page.getByRole("link", { name: "login" }).click();
      await page
        .locator('input[name="username"]')
        .fill(TEST_USER_DATA[1].username);
      await page
        .locator('input[name="password"]')
        .fill(TEST_USER_DATA[1].password);
      await page.getByRole("button", { name: "login" }).click();

      await page
        .getByRole("link", {
          name: `${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author}`,
        })
        .click();

      await expect(page.getByRole("button", { name: "like" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });
  });

  test("blogs are sorted descending by number of likes", async ({ page }) => {
    await page.getByRole("link", { name: "login" }).click();
    await page
      .locator('input[name="username"]')
      .fill(TEST_USER_DATA[0].username);
    await page
      .locator('input[name="password"]')
      .fill(TEST_USER_DATA[0].password);
    await page.getByRole("button", { name: "login" }).click();

    await page.getByRole("link", { name: "create new" }).click();
    await page.locator('input[name="title"]').fill(TEST_BLOG_DATA[0].title);
    await page.locator('input[name="author"]').fill(TEST_BLOG_DATA[0].author);
    await page.locator('input[name="url"]').fill(TEST_BLOG_DATA[0].url);
    await page.getByRole("button", { name: "create" }).click();

    await expect(
      page.getByText(
        `${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author}`,
      ),
    ).toBeVisible();

    await page.getByRole("link", { name: "create new" }).click();
    await page.locator('input[name="title"]').fill(TEST_BLOG_DATA[1].title);
    await page.locator('input[name="author"]').fill(TEST_BLOG_DATA[1].author);
    await page.locator('input[name="url"]').fill(TEST_BLOG_DATA[1].url);
    await page.getByRole("button", { name: "create" }).click();

    await expect(
      page.getByText(
        `${TEST_BLOG_DATA[1].title} by ${TEST_BLOG_DATA[1].author}`,
      ),
    ).toBeVisible();

    await page.getByRole("link", { name: "create new" }).click();
    await page.locator('input[name="title"]').fill(TEST_BLOG_DATA[2].title);
    await page.locator('input[name="author"]').fill(TEST_BLOG_DATA[2].author);
    await page.locator('input[name="url"]').fill(TEST_BLOG_DATA[2].url);
    await page.getByRole("button", { name: "create" }).click();

    await expect(
      page.getByText(
        `${TEST_BLOG_DATA[2].title} by ${TEST_BLOG_DATA[2].author}`,
      ),
    ).toBeVisible();

    await page
      .getByRole("link", {
        name: `${TEST_BLOG_DATA[0].title} by ${TEST_BLOG_DATA[0].author}`,
      })
      .click();
    await page.getByRole("button", { name: "like" }).click();
    await page.locator('.blog__details:has-text("likes: 1")').waitFor();
    await page.getByRole("button", { name: "like" }).click();
    await page.locator('.blog__details:has-text("likes: 2")').waitFor();
    await page.getByRole("link", { name: "blogs" }).click();

    await page
      .getByRole("link", {
        name: `${TEST_BLOG_DATA[1].title} by ${TEST_BLOG_DATA[1].author}`,
      })
      .click();
    await page.getByRole("button", { name: "like" }).click();
    await page.locator('.blog__details:has-text("likes: 1")').waitFor();
    await page.getByRole("button", { name: "like" }).click();
    await page.locator('.blog__details:has-text("likes: 2")').waitFor();
    await page.getByRole("button", { name: "like" }).click();
    await page.locator('.blog__details:has-text("likes: 3")').waitFor();
    await page.getByRole("link", { name: "blogs" }).click();

    const blogLinks = page.locator('a[href^="/blogs/"]');

    await expect(blogLinks.nth(0)).toContainText(TEST_BLOG_DATA[1].title);
    await expect(blogLinks.nth(1)).toContainText(TEST_BLOG_DATA[0].title);
    await expect(blogLinks.nth(2)).toContainText(TEST_BLOG_DATA[2].title);
  });
});
