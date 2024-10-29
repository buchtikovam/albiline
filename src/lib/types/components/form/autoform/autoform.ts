import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';
import { z } from 'zod';

export type AutoForm = {
	[key: string]: AutoFormSection[];
};

export type AutoFormSection = {
	id: number,
	label: string,
	hasDialog?: boolean,
	dialogId?: string,
	dialogIcon?: ComponentType<Icon>,
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


/*
* import { z } from 'zod';

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

const addressDetailFormDef: AutoForm = {
  col1: [
    {
      label: 'Street',
      type: 'text',
      variableName: 'street',
      schema: addressSchema.shape.street,
    },
    // ...
  ],
  // ...
};
* */
