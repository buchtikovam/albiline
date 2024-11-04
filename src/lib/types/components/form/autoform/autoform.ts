import { z } from 'zod';

export type AutoForm = {
	[key: string]: AutoFormSection[];
};

export type AutoFormSection = {
	id: number,
	label: string,
	hasDialog?: boolean,

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
	variableName?: string,
	schema?: z.ZodType
}




export type AutoFormSimpleType = AutoFormRowSimple[];

type AutoFormRowSimple = {
	rowType: "full" | "checkbox",
	rowInputs: {
		[key: string]: AutoFormInputSimple
	}
}

type AutoFormInputSimple = {
	inputType: "text" | "number" | "checkbox" | "empty",
	schema: z.ZodType
}










// const addressSchema = z.object({
//   street: z.string(),
//   city: z.string(),
//   state: z.string(),
//   zip: z.string(),
// });
//
// const addressDetailFormDef: AutoForm = {
//   col1: [
//     {
//       label: 'Street',
//       type: 'text',
//       variableName: 'street',
//       schema: addressSchema.shape.street,
//     },
//     // ...
//   ],
//   // ...
// };
// * */
