import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('SWS Companies');
});

test('has header', async ({ page }) => {
  await page.goto('/');

  // Expect an element to be visible
  await expect(page.getByText('Companies')).toBeVisible();
});

test('has search filter', async ({ page }) => {
  await page.goto('/');

  // Expect an element to be visible
  await expect(page.getByText('Sort By').first()).toBeVisible();
  await expect(page.getByText('Sort Direction').first()).toBeVisible();
  await expect(page.getByText('Exchange Symbols').first()).toBeVisible();
  await expect(page.getByText('Score Filter').first()).toBeVisible();
});

test('has table', async ({ page }) => {
  await page.goto('/');

  // Expect an element to be visible
  await expect(page.getByText('Company Name').first()).toBeVisible();
  await expect(page.getByText('Unique Symbol').first()).toBeVisible();
  await expect(page.getByText('Last Share Price').first()).toBeVisible();
  await expect(page.getByText('Score').first()).toBeVisible();
  await expect(page.getByText('Total Score').first()).toBeVisible();
});
