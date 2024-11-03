import { z } from 'zod';
import type { AutoFormSimpleType } from '$lib/types/components/form/autoform/autoform';

export const newCustomerFormDef: AutoFormSimpleType = [
	{
		rowType: "full",
		rowInputs: {
			"name": {
				inputType: "text",
				schema: z.string(),
			},

			"last_name": {
				inputType: "text",
				schema: z.string(),
			},
		}
	},
	{
		rowType: "full",
		rowInputs: {
			"phone": {
				inputType: "text",
				schema: z.string(),
			},

			"landline": {
				inputType: "text",
				schema: z.string(),
			},
		}
	},
	{
		rowType: "full",
		rowInputs: {
			"email": {
				inputType: "text",
				schema: z.string(),
			},

			"note": {
				inputType: "text",
				schema: z.string(),
			},

		}
	},
	{
		rowType: "checkbox",
		rowInputs: {
			"is_default": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"is_active": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"send_invoice_in_pdf": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"send_dl_in_pdf": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"send_invoice_in_csv": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"send_dl_in_csv": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"az_svoz": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"az_expedice": {
				inputType: "checkbox",
				schema: z.boolean(),
			},
		}
	},
]


