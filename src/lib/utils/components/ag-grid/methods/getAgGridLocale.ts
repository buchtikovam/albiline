import {
	AG_GRID_LOCALE_CZ,
	AG_GRID_LOCALE_EN,
	AG_GRID_LOCALE_PL,
	AG_GRID_LOCALE_SK
} from "@ag-grid-community/locale";
import { getLocale } from "$lib/paraglide/runtime";


export function getAgGridLocale() {
	if (getLocale() === "cz") return AG_GRID_LOCALE_CZ;
	if (getLocale() === "pl") return AG_GRID_LOCALE_PL;
	if (getLocale() === "sk") return AG_GRID_LOCALE_SK;
	return AG_GRID_LOCALE_EN;
}
