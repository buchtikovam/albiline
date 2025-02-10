import Check from "lucide-svelte/icons/check";
import X from "lucide-svelte/icons/x";
import type { InputDialogOperator } from "$lib/types/components/dialog/inputDialog";
import * as m from '$lib/paraglide/messages.js'


export const booleanOperators: InputDialogOperator[] = [
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
