import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

export type AutoForm = {
	[key: string]: AutoFormSection[];
};

export type AutoFormSection = {
	id: number,
	label: string,
	hasDialog?: boolean,
	dialogId?: string,
	dialogIcon?: ComponentType<Icon>,
	isOpen: boolean,
	sectionDef: AutoFormRow[]
}

type AutoFormRow = {
	id: number,
	rowType: "full" | "checkbox",
	rowInputs: AutoFormInput[]
}

type AutoFormInput = {
	label?: string,
	type: "text" | "number" | "checkbox" | "empty",
	variableName?: string
}
