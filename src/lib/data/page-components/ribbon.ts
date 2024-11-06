import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';
import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import type { RibbonItem, RibbonSeparator } from '$lib/types/components/ribbon/ribbon';
import FilePlus from 'lucide-svelte/icons/file-plus';
import FileX2 from 'lucide-svelte/icons/file-x-2';
import Pencil from 'lucide-svelte/icons/pencil';
import ArrowDownWideNarrow from 'lucide-svelte/icons/arrow-down-wide-narrow';
import Filter from 'lucide-svelte/icons/filter';
import FilterX from 'lucide-svelte/icons/filter-x';
import ListFilter from 'lucide-svelte/icons/list-filter';
import Printer from 'lucide-svelte/icons/printer';
import FileUp from 'lucide-svelte/icons/file-up';
import FileDown from 'lucide-svelte/icons/file-down';
import Scan from 'lucide-svelte/icons/scan';
import Undo2 from 'lucide-svelte/icons/undo-2';
import ListPlus from 'lucide-svelte/icons/list-plus';
import Columns3 from 'lucide-svelte/icons/columns-3';
import Save from 'lucide-svelte/icons/save';
import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';

type RibbonItems = RibbonItem[] | RibbonItem | RibbonSeparator;

export const ribbonItems: RibbonItems[] = [
	{
		field: "new",
		type: RibbonTypeEnum.ITEM,
		icon: FilePlus,
		action: RibbonActionEnum.NEW,
		hide: false,
	},
	{
		field: "edit",
		type: RibbonTypeEnum.ITEM,
		icon: Pencil,
		hide: false,
		action: RibbonActionEnum.EDIT,
	},
	{
		field: "delete",
		type: RibbonTypeEnum.ITEM,
		icon: FileX2,
		hide: false,
		action: RibbonActionEnum.DELETE,
	},

	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		field: "fill_down",
		type: RibbonTypeEnum.ITEM,
		icon: ArrowDownWideNarrow,
		hide: false,
		action: RibbonActionEnum.FILL_DOWN,
	},
	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		field: "save",
		type: RibbonTypeEnum.ITEM,
		icon: Save,
		hide: false,
		action: RibbonActionEnum.SAVE,
	},
	{
		field: "reload",
		type: RibbonTypeEnum.ITEM,
		icon: RefreshCcw,
		hide: false,
		action: RibbonActionEnum.LOAD,
	},
	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		field: "print",
		type: RibbonTypeEnum.ITEM,
		icon: Printer,
		hide: false,
		action: RibbonActionEnum.PRINT,
	},
	{
		field: "export_choice",
		type: RibbonTypeEnum.DROPDOWN,
		icon: FileUp,
		hide: false,
		action: RibbonActionEnum.EXPORT_CHOICE,
		children: [
			{
				field: "export_excel",
				action: RibbonActionEnum.EXPORT_EXCEL
			},
			{
				field: "export_csv",
				action: RibbonActionEnum.EXPORT_CSV
			},
		]
	},


	{
		field: "import",
		type: RibbonTypeEnum.ITEM,
		icon: FileDown,
		hide: false,
		action: RibbonActionEnum.IMPORT,
	},

	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		field: "filter_quick",
		type: RibbonTypeEnum.ITEM,
		icon: ListFilter,
		hide: false,
		action: RibbonActionEnum.FILTER_QUICK,
	},
	
	{
		field: "filter_in_range",
		type: RibbonTypeEnum.ITEM,
		icon: Scan,
		hide: false,
		action: RibbonActionEnum.FILTER_IN_RANGE,
	},
	{
		field: "filter_out_of_range",
		type: RibbonTypeEnum.ITEM,
		icon: Filter,
		hide: false,
		action: RibbonActionEnum.FILTER_OUT_OF_RANGE,
	},
	{
		field: "filter_undo",
		type: RibbonTypeEnum.ITEM,
		icon: Undo2,
		hide: false,
		action: RibbonActionEnum.FILTER_UNDO,
	},
	{
		field: "filter_remove",
		type: RibbonTypeEnum.ITEM,
		icon: FilterX,
		hide: false,
		action: RibbonActionEnum.FILTER_REMOVE,
	},
	{
		field: "filters",
		type: RibbonTypeEnum.DROPDOWN,
		icon: ListPlus,
		hide: false,
		action: RibbonActionEnum.UNKNOWN,
		children: [
			{
				field: "save_filters",
				action: RibbonActionEnum.SAVE_FILTERS
			},
			{
				field: "my_filters",
				action: RibbonActionEnum.MY_FILTERS
			},
		]
	},
	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		field: "presets",
		type: RibbonTypeEnum.DROPDOWN,
		icon: Columns3,
		hide: false,
		action: RibbonActionEnum.UNKNOWN,
		children: [
			{
				field: "save_preset",
				action: RibbonActionEnum.SAVE_PRESET
			},
			{
				field: "my_presets",
				action: RibbonActionEnum.MY_PRESETS
			},
		]
	},
];
