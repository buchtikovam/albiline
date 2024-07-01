import type { Writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export const myFiltersOrderStore: Writable<string[]> = persisted('myFiltersOrder', []);
