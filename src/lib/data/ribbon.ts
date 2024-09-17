import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';
import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import type { RibbonItem } from '$lib/types/ribbon/ribbon';
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
import BarChart3 from 'lucide-svelte/icons/bar-chart-3';
import Save from 'lucide-svelte/icons/save';
import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';

type RibbonItems = RibbonItem[] | RibbonItem;

export const ribbonItems: RibbonItems[] = [
	{
		name: "Nový",
		type: RibbonTypeEnum.ITEM,
		icon: FilePlus,
		action: RibbonActionEnum.NEW,
	},
	{
		name: "Editovat",
		type: RibbonTypeEnum.ITEM,
		icon: Pencil,
		action: RibbonActionEnum.EDIT,
	},
	{
		name: "Smazat",
		type: RibbonTypeEnum.ITEM,
		icon: FileX2,
		action: RibbonActionEnum.DELETE,
	},

	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		name: "Vyplň dolů",
		type: RibbonTypeEnum.ITEM,
		icon: ArrowDownWideNarrow,
		action: RibbonActionEnum.FILL_DOWN,
	},
	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		name: "Uložit",
		type: RibbonTypeEnum.ITEM,
		icon: Save,
		action: RibbonActionEnum.SAVE,
	},
	{
		name: "Načíst",
		type: RibbonTypeEnum.ITEM,
		icon: RefreshCcw,
		action: RibbonActionEnum.LOAD,
	},
	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		name: "Tisk",
		type: RibbonTypeEnum.ITEM,
		icon: Printer,
		action: RibbonActionEnum.PRINT,
	},
	{
		name: "Export jako",
		type: RibbonTypeEnum.DROPDOWN,
		icon: FileUp,
		action: RibbonActionEnum.EXPORT_CHOICE,
		children: [
			{
				name: "Excel",
				action: RibbonActionEnum.EXPORT_EXCEL
			},
			{
				name: "PDF",
				action: RibbonActionEnum.EXPORT_PDF
			},
			{
				name: "CSV",
				action: RibbonActionEnum.EXPORT_CSV
			},
		]
	},


	{
		name: "Import",
		type: RibbonTypeEnum.ITEM,
		icon: FileDown,
		action: RibbonActionEnum.IMPORT,
	},

	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		name: "Statistika",
		type: RibbonTypeEnum.ITEM,
		icon: BarChart3,
		action: RibbonActionEnum.STATISTICS,
	},
	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		name: "Rychlý filtr",
		type: RibbonTypeEnum.ITEM,
		icon: ListFilter,
		action: RibbonActionEnum.FILTER_QUICK,
	},
	
	{
		name: "Filtr ve výběru",
		type: RibbonTypeEnum.ITEM,
		icon: Scan,
		action: RibbonActionEnum.FILTER_IN_RANGE,
	},
	{
		name: "Mimo výběr",
		type: RibbonTypeEnum.ITEM,
		icon: Filter,
		action: RibbonActionEnum.FILTER_OUT_OF_RANGE,
	},
	{
		name: "Filtr krok zpět",
		type: RibbonTypeEnum.ITEM,
		icon: Undo2,
		action: RibbonActionEnum.FILTER_UNDO,
	},
	{
		name: "Zrušit filtry",
		type: RibbonTypeEnum.ITEM,
		icon: FilterX,
		action: RibbonActionEnum.FILTER_REMOVE,
	},
	{
		name: "Moje filtry",
		type: RibbonTypeEnum.DROPDOWN,
		icon: ListPlus,
		action: RibbonActionEnum.UNKNOWN,
		children: [
			{
				name: "Uložit aktuální filtry",
				action: RibbonActionEnum.SAVE_FILTERS
			},
			{
				name: "Vybrat z uložených filtrů",
				action: RibbonActionEnum.MY_FILTERS
			},
		]
	},
	{
		type: RibbonTypeEnum.SEPARATOR,
	},

	{
		name: "Moje šablony",
		type: RibbonTypeEnum.DROPDOWN,
		icon: Columns3,
		action: RibbonActionEnum.UNKNOWN,
		children: [
			{
				name: "Vytvořit novou šablonu",
				action: RibbonActionEnum.SAVE_PRESET
			},
			{
				name: "Vybrat šablonu",
				action: RibbonActionEnum.MY_PRESETS
			},
		]
	},
];
