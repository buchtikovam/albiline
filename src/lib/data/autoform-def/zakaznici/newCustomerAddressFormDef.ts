import { z } from 'zod';
import type { AutoFormSimpleType } from '$lib/types/components/form/autoform/autoform';

export const newCustomerAddressFormDef: AutoFormSimpleType = [
	{
		rowType: "full",
		inputs: {
			"name": {
				type: "text",
				schema: z.string().max(255),
			},
		}
	},
	{
		rowType: "full",
		inputs: {
			"companyName": {
				type: "text",
				schema: z.string().max(255),
			},
		}
	},
	{
		rowType: "full",
		inputs: {
			"street": {
				type: "text",
				schema: z.string().max(255),
			},

			"city": {
				type: "text",
				schema: z.string().max(255),
			},
		}
	},
	{
		rowType: "full",
		inputs: {
			"postalCode": {
				type: "text",
				schema: z.string().email().max(255),
			},

			"countryCode": {
				type: "text",
				schema: z.string().max(255),
			},

		}
	},
]


