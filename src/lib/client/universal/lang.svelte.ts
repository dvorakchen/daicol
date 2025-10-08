import { locales, setLocale } from '$lib/paraglide/runtime.js';

const LANG_KEY = 'LANG_KEY';

class LangMan {
	constructor() {
		this.lang = localStorage.getItem(LANG_KEY) ?? navigator.language.split('-')[0];

		this.changeLang(this.lang);
	}

	private lang = '';

	private changeLang(newLang: string): void {
		if (locales.some((loc) => loc === newLang)) {
			this.lang = newLang;
			localStorage.setItem(LANG_KEY, this.lang);

			setLocale(newLang as (typeof locales)[number]);
		}
	}
}

export function initLangMan() {
	themeMan = new LangMan();
}

export let themeMan: LangMan;
