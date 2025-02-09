import Search from "lucide-svelte/icons/search.svelte";
import SearchX from "lucide-svelte/icons/search-x.svelte";
import Equal from "lucide-svelte/icons/equal.svelte";
import EqualNot from "lucide-svelte/icons/equal-not.svelte";
import ArrowRightFromLine from "lucide-svelte/icons/arrow-right-from-line.svelte";
import ArrowRightToLine from "lucide-svelte/icons/arrow-right-to-line.svelte";
import type {InputDialogOperator} from "$lib/types/components/dialog/inputDialog";



export const stringOperators: InputDialogOperator[] = [
	{
		field: "contains",
		label: "Obsahuje", // search
		icon: Search,
	},
	{
		field: "not-contains",
		label: "Neobsahuje", // search-x
		icon: SearchX,
	},
	{
		field: "equals",
		label: "Rovná se", // equal
		icon: Equal,
	},
	{
		field: "not-equals",
		label: "Nerovná se", // equal-not
		icon: EqualNot,
	},
	{
		field: "starts-with",
		label: "Začíná na", // arrow-right-from-line
		icon: ArrowRightFromLine,
	},
	{
		field: "ends-with",
		label: "Končí na", // arrow-right-to-line
		icon: ArrowRightToLine,
	},
]
