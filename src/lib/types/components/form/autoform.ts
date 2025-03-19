import type { Icon as IconType } from 'lucide-svelte';
import { z } from 'zod';
import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';


export type AutoFormType = {
	[key: string]: AutoFormSection[]
};

export type AutoFormSimpleType = AutoFormRow[];


export type AutoFormSection = {
	id: string,
	field: string,
	translation: () => string,
	hasDialog?: boolean,
	dialogId?: GlobalDialogOptions,
	dialogTitle?: string,
	icon?: typeof IconType,
	isOpen: boolean,
	rows: AutoFormRow[],
}


export type AutoFormRow = {
	rowType: "row" | "checkbox",
	rowInputs: (AutoFormInput | AutoFormInputEmpty)[]
}


export type AutoFormInput = {
	field: string,
	translation: () => string;
	type: "text" | "number" | "checkbox" | "date" | "dropdown",
	dropdownOptions?: string[],
	asyncDropdownOptions?: () => Promise<string[]>,
	schema: z.ZodType
}

type AutoFormInputEmpty = {
	type: "empty"
}
