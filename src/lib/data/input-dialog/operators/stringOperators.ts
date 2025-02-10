import Search from "lucide-svelte/icons/search";
import SearchX from "lucide-svelte/icons/search-x";
import Equal from "lucide-svelte/icons/equal";
import EqualNot from "lucide-svelte/icons/equal-not";
import ArrowRightFromLine from "lucide-svelte/icons/arrow-right-from-line";
import ArrowRightToLine from "lucide-svelte/icons/arrow-right-to-line";
import type { InputDialogOperator } from "$lib/types/components/dialog/inputDialog";
import * as m from '$lib/paraglide/messages.js'


export const stringOperators: InputDialogOperator[] = [
	{
		field: "contains",
		label: m.components_operators_contains,
		icon: Search,
	},
	{
		field: "not-contains",
		label: m.components_operators_not_contains,
		icon: SearchX,
	},
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
		field: "starts-with",
		label: m.components_operators_starts_with,
		icon: ArrowRightFromLine,
	},
	{
		field: "ends-with",
		label: m.components_operators_ends_with,
		icon: ArrowRightToLine,
	},
]
