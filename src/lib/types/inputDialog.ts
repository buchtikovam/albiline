import type { DateValue } from '@internationalized/date';

export type InputDialogItem = {
	type: "string" | "date" | "number";
	label: string;
	id: string;
	value?: string;
	date?: DateValue;
}
