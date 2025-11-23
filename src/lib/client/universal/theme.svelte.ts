import { themePrefer } from '$lib/share/index.ts';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

const IS_DARK_KEY = 'isdark';

class ThemeMan {
	private themeChangeNotifier = new Subject<boolean>();

	constructor() {
		this._isDark = JSON.parse(localStorage.getItem(IS_DARK_KEY) ?? 'false');

		this.themeChangeNotifier
			.pipe(
				debounceTime(5000),
				switchMap((isDarkValue) => {
					const body = {
						theme: isDarkValue ? themePrefer.dark : themePrefer.light
					};

					return fetch(`/api/users/theme`, {
						method: 'post',
						body: JSON.stringify(body),
						headers: {
							'Content-Type': 'application/json'
						}
					});
				})
			)
			.subscribe(() => {});

		this.changeTheme();
	}

	private _isDark = false;

	public toggle(): void {
		this._isDark = !this._isDark;
		localStorage.setItem(IS_DARK_KEY, JSON.stringify(this._isDark));
		this.changeTheme();
		this.notifyThemeChange();
	}

	private changeTheme(): void {
		document.documentElement.dataset.theme = this._isDark ? themePrefer.dark : themePrefer.light;
	}

	private notifyThemeChange(): void {
		this.themeChangeNotifier.next(this._isDark);
	}
}

export function initThemeMan() {
	themeMan = new ThemeMan();
}

export let themeMan: ThemeMan;
