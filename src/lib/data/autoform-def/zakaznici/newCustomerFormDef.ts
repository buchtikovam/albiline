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

			"surname": {
				inputType: "text",
				schema: z.string(),
			},
		}
	},
	{
		rowType: "full",
		rowInputs: {
			"mobile": {
				inputType: "text",
				schema: z.string(),
			},

			"phone": {
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
			"isDefault": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"enabled": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"pdfInvoice": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"pdfDeliveryNote": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"csvInvoice": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"csvDeliveryNote": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"consignmentReturnInfo": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"consignmentInfo": {
				inputType: "checkbox",
				schema: z.boolean(),
			},

			"carrierInfo": {
				inputType: "checkbox",
				schema: z.boolean(),
			}
		}
	},
]


