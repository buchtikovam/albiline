import { RibbonType } from '$lib/enums/ribbonType';
import { RibbonAction } from '$lib/enums/ribbonAction';
import type { RibbonItem } from '$lib/types/ribbon/ribbon';
import FilePlus from 'lucide-svelte/icons/file-plus';
import FileX2 from 'lucide-svelte/icons/file-x-2';
import Pencil from 'lucide-svelte/icons/pencil';
import ArrowDownWideNarrow from 'lucide-svelte/icons/arrow-down-wide-narrow';
import Filter from 'lucide-svelte/icons/filter';
import FilterX from 'lucide-svelte/icons/filter-x';
import FolderUp from 'lucide-svelte/icons/folder-up';
import ListFilter from 'lucide-svelte/icons/list-filter';
import Printer from 'lucide-svelte/icons/printer';
import FileUp from 'lucide-svelte/icons/file-up';
import FileDown from 'lucide-svelte/icons/file-down';
import FolderDown from 'lucide-svelte/icons/folder-down';
import Scan from 'lucide-svelte/icons/scan';
import Undo2 from 'lucide-svelte/icons/undo-2';
import ListPlus from 'lucide-svelte/icons/list-plus';
import Columns3 from 'lucide-svelte/icons/columns-3';
import BarChart3 from 'lucide-svelte/icons/bar-chart-3';
import Save from 'lucide-svelte/icons/save';
import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';

type Items = RibbonItem[] | RibbonItem;

export const ribbonItems: Items[] = [
	{
		name: "Nový",
		type: RibbonType.ITEM,
		icon: FilePlus,
		action: RibbonAction.NEW,
	},
	{
		name: "Editovat",
		type: RibbonType.ITEM,
		icon: Pencil,
		action: RibbonAction.EDIT,
	},
	{
		name: "Smazat",
		type: RibbonType.ITEM,
		icon: FileX2,
		action: RibbonAction.DELETE,
	},

	{
		type: RibbonType.SEPARATOR,
	},

	{
		name: "Vyplň dolů",
		type: RibbonType.ITEM,
		icon: ArrowDownWideNarrow,
		action: RibbonAction.FILL_DOWN,
	},
	{
		type: RibbonType.SEPARATOR,
	},

	{
		name: "Uložit",
		type: RibbonType.ITEM,
		icon: Save,
		action: RibbonAction.SAVE,
	},
	{
		name: "Načíst",
		type: RibbonType.ITEM,
		icon: RefreshCcw,
		action: RibbonAction.LOAD,
	},
	{
		type: RibbonType.SEPARATOR,
	},

	{
		name: "Tisk sestav",
		type: RibbonType.DROPDOWN,
		icon: Printer,
		action: RibbonAction.PRINT_CHOICE,
		children: [
			{
				name: "Volba 1",
				action: RibbonAction.UNKNOWN
			},
			{
				name: "Volba 2",
				action: RibbonAction.UNKNOWN
			},
			{
				name: "Volba 3",
				action: RibbonAction.UNKNOWN
			},
		]
	},
	{
		name: "Export jako",
		type: RibbonType.DROPDOWN,
		icon: FileUp,
		action: RibbonAction.EXPORT_CHOICE,
		children: [
			{
				name: "Excel",
				action: RibbonAction.EXPORT_EXCEL
			},
			{
				name: "PDF",
				action: RibbonAction.EXPORT_PDF
			},
			{
				name: "CSV",
				action: RibbonAction.EXPORT_CSV
			},
		]
	},
	{
		name: "Hromadný export",
		type: RibbonType.ITEM,
		icon: FolderUp,
		action: RibbonAction.GROUP_EXPORT,
	},
	{
		type: RibbonType.SEPARATOR,
	},

	{
		name: "Import",
		type: RibbonType.ITEM,
		icon: FileDown,
		action: RibbonAction.IMPORT,
	},
	{
		name: "Import šablony",
		type: RibbonType.DROPDOWN,
		icon: FolderDown,
		action: RibbonAction.IMPORT,
		children: [
			{
				name: "Volba 1",
				action: RibbonAction.UNKNOWN
			},
			{
				name: "Volba 2",
				action: RibbonAction.UNKNOWN
			},
			{
				name: "Volba 3",
				action: RibbonAction.UNKNOWN
			},
		]
	},
	{
		type: RibbonType.SEPARATOR,
	},

	{
		name: "Statistika",
		type: RibbonType.ITEM,
		icon: BarChart3,
		action: RibbonAction.STATISTICS,
	},
	{
		type: RibbonType.SEPARATOR,
	},

	{
		name: "Rychlý filtr",
		type: RibbonType.ITEM,
		icon: ListFilter,
		action: RibbonAction.FILTER_QUICK,
	},
	{
		name: "Mimo výběr",
		type: RibbonType.ITEM,
		icon: Filter,
		action: RibbonAction.FILTER_OUT_OF_RANGE,
	},
	{
		name: "Filtr v rozmezí",
		type: RibbonType.ITEM,
		icon: Scan,
		action: RibbonAction.FILTER_IN_RANGE,
	},
	{
		name: "Filtr krok zpět",
		type: RibbonType.ITEM,
		icon: Undo2,
		action: RibbonAction.FILTER_UNDO,
	},
	{
		name: "Zrušit filtry",
		type: RibbonType.ITEM,
		icon: FilterX,
		action: RibbonAction.FILTER_REMOVE,
	},
	{
		name: "Moje filtry",
		type: RibbonType.DROPDOWN,
		icon: ListPlus,
		action: RibbonAction.UNKNOWN,
		children: [
			{
				name: "Uložit aktuální filtry",
				action: RibbonAction.SAVE_FILTERS
			},
			{
				name: "Vybrat z uložených filtrů",
				action: RibbonAction.MY_FILTERS
			},
		]
	},
	{
		type: RibbonType.SEPARATOR,
	},

	{
		name: "Moje šablony",
		type: RibbonType.ITEM,
		icon: Columns3,
		action: RibbonAction.MY_PRESETS,
	},
	{
		type: RibbonType.SEPARATOR,
	},
];
