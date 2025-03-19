import type {InputParamsOperator} from "$lib/types/components/input-params/inputParams";
import * as m from "$lib/paraglide/messages";
import Equal from "lucide-svelte/icons/equal";
import EqualNot from "lucide-svelte/icons/equal-not";


export const enumOperators: InputParamsOperator[] = [
	{
		field: "equals",
		label: m.components_operators_equals,
		icon: Equal,
	},
	{
		field: "not-equals",
		label: m.components_operators_not_equals,
		icon: EqualNot,
	},
]
