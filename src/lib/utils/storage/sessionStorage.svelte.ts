import { browser } from '$app/environment';

export class SessionStore<T> {
	value = $state<T>() as T;
	key = '';

	constructor(key: string, value: T) {
		this.key = key;
		this.value = value;

		if (browser) {
			const item = sessionStorage.getItem(key);
			if (item) this.value = this.deserialize(item);
		}

		$effect.root(() => {
			$effect(() => {
				sessionStorage.setItem(this.key, this.serialize(this.value));
			});
		})

	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T {
		return JSON.parse(item);
	}
}

export function sessionStore<T>(key: string, value: T) {
	return new SessionStore(key, value);
}
