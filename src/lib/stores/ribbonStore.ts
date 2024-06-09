import { persisted } from 'svelte-persisted-store';
import { type Writable, writable } from 'svelte/store';

export const ribbonStateStore: Writable<boolean> = persisted('ribbonState', true);

export const ribbonActionStore = writable()
