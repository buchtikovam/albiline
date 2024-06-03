import { persisted } from 'svelte-persisted-store';

export const ribbonStateStore = persisted('ribbonState', true);
