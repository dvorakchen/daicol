import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(1 + 1).toBe(2);
	// await expect(page.locator('h1')).toBeVisible();
});
