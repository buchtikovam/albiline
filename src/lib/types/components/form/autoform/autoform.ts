import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';
import { z } from 'zod';
import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';


export type AutoFormType = {
	[key: string]: AutoFormSection[],
}

export type AutoFormSection = {
	id: string,
	field: string,
	hasDialog?: boolean,
	dialogId?: GlobalDialogOptions,
	dialogTitle?: string,
	dialogIcon?: ComponentType<Icon>,
	isOpen: boolean,
	rows: AutoFormRow[],
}

export type AutoFormRow = {
	rowType: "full" | "checkbox",
	inputs: {
		[key: string]: AutoFormInput
	}
}

export type AutoFormInput = {
	type: "text" | "number" | "checkbox" | "date" | "dropdown" | "empty",
	dropdownOptions?: string[],
	schema?: z.ZodType
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
