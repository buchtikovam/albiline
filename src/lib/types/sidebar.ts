import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';


export type Item = {
	name: string;
	value: string
	href: string;
	parentValue?: string;
	grandParentValue?: string;
	icon?: ComponentType<Icon>;
	children?: Item[],
}
