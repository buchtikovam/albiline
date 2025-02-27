import Check from "lucide-svelte/icons/check";
import X from "lucide-svelte/icons/x";
import type { InputParamsOperator } from "$lib/types/components/input-params/inputParams";
import * as m from '$lib/paraglide/messages.js'


export const booleanOperators: InputParamsOperator[] = [
	{
		field: "true",
		label: m.components_operators_true,
		icon: Check,
	},
	{
		field: "false",
		label: m.components_operators_false,
		icon: X,
	},
]
