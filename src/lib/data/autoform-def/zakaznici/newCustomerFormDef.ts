import { z } from 'zod';
import type { AutoFormSimpleType } from '$lib/types/components/form/autoform/autoform';

export const newCustomerFormDef: AutoFormSimpleType = [
	{
		rowType: "full",
		inputs: {
			"name": {
				type: "text",
				schema: z.string(),
			},

			"surname": {
				type: "text",
				schema: z.string(),
			},
		}
	},
	{
		rowType: "full",
		inputs: {
			"mobile": {
				type: "text",
				schema: z.string(),
			},

			"phone": {
				type: "text",
				schema: z.string(),
			},
		}
	},
	{
		rowType: "full",
		inputs: {
			"email": {
				type: "text",
				schema: z.string(),
			},

			"note": {
				type: "text",
				schema: z.string(),
			},

		}
	},
	{
		rowType: "checkbox",
		inputs: {
			"isDefault": {
				type: "checkbox",
				schema: z.boolean(),
			},

			"enabled": {
				type: "checkbox",
				schema: z.boolean(),
			},

			"pdfInvoice": {
				type: "checkbox",
				schema: z.boolean(),
			},

			"pdfDeliveryNote": {
				type: "checkbox",
				schema: z.boolean(),
			},

			"csvInvoice": {
				type: "checkbox",
				schema: z.boolean(),
			},

			"csvDeliveryNote": {
				type: "checkbox",
				schema: z.boolean(),
			},

			"consignmentReturnInfo": {
				type: "checkbox",
				schema: z.boolean(),
			},

			"consignmentInfo": {
				type: "checkbox",
				schema: z.boolean(),
			},

			"carrierInfo": {
				type: "checkbox",
				schema: z.boolean(),
			}
		}
	},
]


