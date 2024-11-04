import type { AutoFormNew } from '$lib/types/components/form/autoform/autoformNew';
import { v4 as uuidv4 } from 'uuid';

import { z } from 'zod';


export const testFormDef: AutoFormNew = {
	"col1": [
		{
			field: "section1",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{
					rowType: "full",
					inputs: {
						"input_text": {
							type: "text",
							schema: z.string().min(3).max(9),
						},

						"input_number": {
							type: "number",
							schema: z.number().min(1).max(3),
						},
					}
				},
				{
					rowType: "full",
					inputs: {
						"input_email": {
							type: "text",
							schema: z.string().email()
						},

						"input_checkbox": {
							type: "checkbox",
							schema: z.boolean()
						},
					}
				},
			]
		},
		{
			id: uuidv4(),
			field: "section2",
			isOpen: true,
			rows: [
				{
					rowType: "full",
					inputs: {
						"input_date": {
							type: "date",
							schema: z.string().min(3).max(9),
						},

						"input_dropdown" : {
							type: "dropdown",
							dropdownOptions: ["A", "B", "C"],
							schema: z.enum(["A", "B", "C"]),
						}
					}
				}
			]
		}
	],

	"col2" : []
}
