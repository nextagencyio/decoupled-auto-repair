import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('displays hero title and subtitle from Drupal', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('Honest Auto Repair')
    await expect(page.locator('body')).toContainText('ASE Certified Since 1994')
  })

  test('displays statistics section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('30+')
    await expect(page.locator('body')).toContainText('Years in Business')
  })

  test('has header navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
  })
})

test.describe('Services listing', () => {
  test('shows services page with real content', async ({ page }) => {
    await page.goto('/services')
    await expect(page).toHaveTitle(/Services/)
    await expect(page.locator('body')).toContainText('Oil Change')
    await expect(page.locator('body')).toContainText('Brake Repair')
    await expect(page.locator('body')).toContainText('Engine Diagnostics')
  })

  test('has header on services page', async ({ page }) => {
    await page.goto('/services')
    await expect(page.locator('header')).toBeVisible()
  })
})

test.describe('Service detail', () => {
  test('oil change detail page loads', async ({ page }) => {
    await page.goto('/services/oil-change')
    await expect(page.locator('body')).toContainText('Oil Change')
    await expect(page.locator('body')).toContainText('$39.99')
    await expect(page.locator('body')).toContainText('30-45 minutes')
  })
})

test.describe('Team listing', () => {
  test('shows team members with real content', async ({ page }) => {
    await page.goto('/team')
    await expect(page.locator('body')).toContainText('Mike Sullivan')
    await expect(page.locator('body')).toContainText('Rachel Torres')
    await expect(page.locator('body')).toContainText('James Wright')
  })

  test('has header on team page', async ({ page }) => {
    await page.goto('/team')
    await expect(page.locator('header')).toBeVisible()
  })
})

test.describe('Team member detail', () => {
  test('Mike Sullivan detail page loads', async ({ page }) => {
    await page.goto('/team/mike-sullivan')
    await expect(page.locator('body')).toContainText('Mike Sullivan')
    await expect(page.locator('body')).toContainText('Owner & Master Technician')
  })
})

test.describe('Coupons listing', () => {
  test('shows coupons with real content', async ({ page }) => {
    await page.goto('/coupons')
    await expect(page.locator('body')).toContainText('Synthetic Oil Change Special')
    await expect(page.locator('body')).toContainText('Brake Service Package')
    await expect(page.locator('body')).toContainText('New Customer Welcome Discount')
  })

  test('has header on coupons page', async ({ page }) => {
    await page.goto('/coupons')
    await expect(page.locator('header')).toBeVisible()
  })
})

test.describe('Coupon detail', () => {
  test('oil change coupon detail page loads', async ({ page }) => {
    await page.goto('/coupons/oil-change-special')
    await expect(page.locator('body')).toContainText('Synthetic Oil Change Special')
    await expect(page.locator('body')).toContainText('$20 Off')
    await expect(page.locator('body')).toContainText('SYNTH20')
  })
})

test.describe('Static pages', () => {
  test('about page loads with real content', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('body')).toContainText('About Summit Auto Care')
    await expect(page.locator('body')).toContainText('family-owned business')
  })

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('body')).toContainText('Contact Us')
  })
})

test.describe('Navigation', () => {
  test('can navigate from homepage to services', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/services"]')
    await expect(page).toHaveURL('/services')
    await expect(page.locator('body')).toContainText('Oil Change')
  })
})
