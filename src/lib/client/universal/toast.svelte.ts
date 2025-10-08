import { SvelteMap } from 'svelte/reactivity';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

type Toast = {
	toastType: ToastType;
	msg: string;
};

class ToastMan {
	private _list = new SvelteMap<number, Toast>();

	public get list(): SvelteMap<number, Toast> {
		return this._list;
	}

	public add(type: ToastType, msg: string, duration: number = 5000) {
		const id = Math.random();

		this._list.set(id, {
			toastType: type,
			msg
		});

		setTimeout(() => {
			this._list.delete(id);
		}, duration);
	}
}

export const toastMan = new ToastMan();
