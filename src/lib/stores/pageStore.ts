import { writable, type Writable } from "svelte/store";


export const isMobileLayoutExpandedStore: Writable<boolean> = writable(false);