import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';
import { z } from 'zod';


export type AutoFormNew = {
	[key: string]: AutoFormNewSection[],
}

export type AutoFormNewSection = {
	id: string,
	field: string,
	hasDialog?: boolean,
	dialogId?: string,
	dialogTitle?: string,
	dialogIcon?: ComponentType<Icon>,
	isOpen: boolean,
	rows: AutoFormNewRow[],
}

export type AutoFormNewRow = {
	rowType: "full" | "checkbox",
	inputs: {
		[key: string]: AutoFormNewInput
	}
}

export type AutoFormNewInput = {
	type: "text" | "number" | "checkbox" | "date" | "dropdown" | "empty",
	dropdownOptions?: string[],
	schema: z.ZodType
}

export type AutoFormSimple = {
	rowType: "full" | "checkbox",
	rowInputs: {
		[key: string]: {
			inputType: "text" | "number" | "checkbox" | "empty",
			schema: z.ZodType
		}
	}
}[]
