import { type Writable, writable } from 'svelte/store';

export const selectedInputStore: Writable<string|null> = writable(null);

export const editedFormValuesStore: Writable<Record<string, any>> = writable({});
