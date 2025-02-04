import {
	AG_GRID_LOCALE_CZ,
	AG_GRID_LOCALE_EN,
	AG_GRID_LOCALE_PL,
	AG_GRID_LOCALE_SK
} from "@ag-grid-community/locale";
import { languageTag } from "$lib/paraglide/runtime";


export function getAgGridLocale() {
	if (languageTag() === "cz") return AG_GRID_LOCALE_CZ;
	if (languageTag() === "pl") return AG_GRID_LOCALE_PL;
	if (languageTag() === "sk") return AG_GRID_LOCALE_SK;
	return AG_GRID_LOCALE_EN;
}
