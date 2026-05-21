const { test, expect, beforeEach, describe } = require('@playwright/test')

const TEST_USER_DATA = {
        username: 'testuser',
        password: 'supersecretpassword',
        name: 'Test User'
      }

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: TEST_USER_DATA
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginHeader = page.getByText('log in to application')
    await expect(loginHeader).toBeVisible()

    const usernameInput = page.locator('input[name="Username"]')
    const passwordInput = page.locator('input[name="Password"]')
    const loginButton = page.getByRole('button', { name: 'login' })

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill(TEST_USER_DATA.username)
      await page.locator('input[name="Password"]').fill(TEST_USER_DATA.password)
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill(TEST_USER_DATA.username)
      await page.locator('input[name="Password"]').fill('wrongpassword')
      
      await page.getByRole('button', { name: 'login' }).click()

      const errorNotification = page.locator('.error')
      
      await expect(errorNotification).toContainText('wrong username or password')
      await expect(page.getByText('log in to application')).toBeVisible()
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })
})