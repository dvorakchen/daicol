import { page } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

beforeEach(() => {
	localStorage.clear();
});
afterEach(() => {
	localStorage.clear();
});

describe('/+page.svelte', () => {
	it('should render sign-in box', async () => {
		render(Page);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();

		const phone = page.getByRole('textbox', {
			name: 'phone'
		});

		await expect.element(phone).toBeVisible();

		const code = page.getByRole('textbox', {
			name: 'code'
		});
		await expect.element(code).toBeVisible();

		const sendCaptcha = page.getByRole('button', {
			name: 'send captcha'
		});
		await expect.element(sendCaptcha).toBeVisible();

		const signIn = page.getByRole('button', {
			name: 'sign in'
		});
		await expect.element(signIn).toBeVisible();
	});

	it('send captcha button enabled after fill phone', async () => {
		render(Page);

		const sendCaptcha = page.getByRole('button', {
			name: 'send captcha'
		});

		// button disabled by default
		await expect.element(sendCaptcha).toBeDisabled();

		const phone = page.getByRole('textbox', {
			name: 'phone'
		});

		// button enabled after fill phone number
		await phone.fill('00000000000');
		await expect.element(sendCaptcha).not.toBeDisabled();

		// button disabled after click button
		await sendCaptcha.click();
		await expect.element(sendCaptcha).toBeDisabled();
	});
});
