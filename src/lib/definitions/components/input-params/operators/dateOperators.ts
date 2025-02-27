import ArrowRightFromLine from "lucide-svelte/icons/arrow-right-from-line";
import ArrowRightToLine from "lucide-svelte/icons/arrow-right-to-line";
import EqualNot from "lucide-svelte/icons/equal-not";
import Brackets from "lucide-svelte/icons/brackets";
import Equal from "lucide-svelte/icons/equal";
import type { InputParamsOperator } from "$lib/types/components/input-params/inputParams";
import * as m from '$lib/paraglide/messages.js'


export const dateOperators: InputParamsOperator[] = [
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
	{
		field: "before",
		label: m.components_operators_before,
		icon: ArrowRightToLine,
	},
	{
		field: "after",
		label: m.components_operators_after,
		icon: ArrowRightFromLine,
	},
	{
		field: "between",
		label: m.components_operators_between,
		icon: Brackets,
	},
]
