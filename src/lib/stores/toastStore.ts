import { type Writable, writable } from 'svelte/store';
import type { ToastType } from '$lib/types/toast';

export const toastStore: Writable<ToastType[]> = writable([]);
