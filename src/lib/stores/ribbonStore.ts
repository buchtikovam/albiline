import { persisted } from 'svelte-persisted-store';
import { type Writable, writable } from 'svelte/store';
import type { Action } from '$lib/enums/action';

export const ribbonStateStore: Writable<boolean> = persisted('ribbonState', true);

export const ribbonActionStore: Writable<Action> = writable()
