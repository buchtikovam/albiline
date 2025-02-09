import Search from "lucide-svelte/icons/search.svelte";
import SearchX from "lucide-svelte/icons/search-x.svelte";
import Equal from "lucide-svelte/icons/equal.svelte";
import EqualNot from "lucide-svelte/icons/equal-not.svelte";
import ArrowRightFromLine from "lucide-svelte/icons/arrow-right-from-line.svelte";
import ArrowRightToLine from "lucide-svelte/icons/arrow-right-to-line.svelte";
import type {InputDialogOperator} from "$lib/types/components/dialog/inputDialog";



export const numberOperators: InputDialogOperator[] = [
	{
		field: "equals",
		label: "Rovná se",
		icon: Equal,
	},
	{
		field: "not-equals",
		label: "Nerovná se",
		icon: EqualNot,
	},
	{
		field: "more",
		label: "Více než",
		icon: Equal,
	},
	{
		field: "more-or-equal",
		label: "Více nebo rovno",
		icon: EqualNot,
	},
	{
		field: "less",
		label: "Méně než",
		icon: ArrowRightFromLine,
	},
	{
		field: "less-or-equal",
		label: "Méně nebo rovno",
		icon: ArrowRightToLine,
	},
	{
		field: "between",
		label: "Mezi",
		icon: ArrowRightToLine,
	},
]
