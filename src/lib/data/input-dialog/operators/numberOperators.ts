import Equal from "lucide-svelte/icons/equal";
import EqualNot from "lucide-svelte/icons/equal-not";
import ArrowRightToLine from "lucide-svelte/icons/arrow-right-to-line";
import type { InputDialogOperator } from "$lib/types/components/dialog/inputDialog";
import { faGreaterThanEqual } from "@fortawesome/free-solid-svg-icons/faGreaterThanEqual";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons/faGreaterThan";
import { faLessThan } from "@fortawesome/free-solid-svg-icons/faLessThan";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons/faLessThanEqual";
import * as m from '$lib/paraglide/messages.js'
import Brackets from "lucide-svelte/icons/brackets";


export const numberOperators: InputDialogOperator[] = [
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
		field: "more-than",
		label: m.components_operators_more,
		faIcon: faGreaterThan,
	},
	{
		field: "more-or-equal",
		label: m.components_operators_more_or_equal,
		faIcon: faGreaterThanEqual,
	},
	{
		field: "less-than",
		label: m.components_operators_less,
		faIcon: faLessThan,
	},
	{
		field: "less-or-equal",
		label: m.components_operators_less_or_equal,
		faIcon: faLessThanEqual,
	},
	{
		field: "between",
		label: m.components_operators_between,
		icon: Brackets,
	},
]
