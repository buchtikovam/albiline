import { writable, type Writable } from "svelte/store";


export const isMobileLayoutExpandedStore: Writable<boolean> = writable(false);

export const isMobileStore: Writable<boolean> = writable(false);